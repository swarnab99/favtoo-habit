import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase/firebase.utils';
import { AuthContext } from './AuthContext';

export const HabitContext = createContext();

const HabitContextProvider = props => {
	const { user } = useContext(AuthContext);
	const [habits, setHabits] = useState([]);

	useEffect(() => {
		if (!user) {
			return;
		}
		getUserHabits();
	}, [user]);

	// ==================== FOR FORMAT DATE FOR DATABSE (i.e todayDate) FUNCTION ====================
	const getFormatedDate = obj => {
		var today = obj;
		var dd = today.getDate();

		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}

		today = yyyy + '' + mm + '' + dd;
		// console.log(today);
		return today;
	};

	// ==================== FOR HABIT SUB COLLECTION URL FUNCTION ====================
	const getHabitSubRef = habitId => {
		var today = new Date();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (mm < 10) {
			mm = '0' + mm;
		}
		today = yyyy + '' + mm; // 202001 i.e 2020 / 01

		return firestore
			.collection('habits')
			.doc(habitId)
			.collection('activityLogs')
			.doc(today);
	};

	// ==================== FOR GET-HABITS FUNCTION (AT INITIAL STAGE) ====================
	const getUserHabits = async () => {
		try {
			const habits = await firestore
				.collection('habits')
				.where('creator', '==', user.uid)
				.get();

			// ARRAY AND ALSO STORING ID FOR EACH OBJECT (HABIT)
			var newHabits = habits.docs.map(doc => {
				const habit = doc.data();

				// UPDATE TODAYDATE AND HABITSTATUS IF DATA IS OLD (YESTERDAY)
				if (habit.todayDate !== getFormatedDate(new Date())) {
					console.info('todayDate got updated');
					habit.todayDate = getFormatedDate(new Date());
					habit.todayStatus = null;
				}
				// END

				habit.id = doc.id;
				return habit;
			});

			// SORTING HABITS BASED ON CREATEDAT FIELD
			newHabits = newHabits.sort(function(a, b) {
				return a.createdAt.seconds - b.createdAt.seconds;
			});
			// END

			setHabits(newHabits);
		} catch (error) {
			console.log(error);
		}
	};

	// ==================== FOR ADD HABIT FUNCTION ====================
	const addHabit = async (name, description) => {
		if (!user) {
			alert('Please Login first');
			return;
		}
		let newHabit = {
			name,
			description,
			createdAt: new Date(),
			creator: user.uid,
			todayStatus: null,
			todayDate: getFormatedDate(new Date())
		};

		try {
			const newCreatedDoc = await firestore.collection('habits').add(newHabit);
			const habitId = newCreatedDoc.id;

			newHabit.id = habitId;

			console.info('Habit at Local State: ', newHabit);

			// // UPDATE HABIT SUBCOLLECTION DATA

			// const habitSubRef = getHabitSubRef(habitId); // it is a utility function see begining

			// await habitSubRef.set(
			// 	{
			// 		[newHabit.todayDate]: newHabit.todayStatus
			// 	},
			// 	{ merge: true }
			// );
			// // END

			setHabits([...habits, newHabit]);
		} catch (error) {
			console.log(error);
		}

		return true;
	};

	// ==================== FOR UPDATE HABIT FUNCTION ====================
	const updateHabit = async id => {};

	// ==================== FOR DELETE HABIT FUNCTION ====================
	const deleteHabit = async id => {
		// setHabits(habits.filter(habit => habit.id !== id));
		try {
			const feedback = confirm('Do you realy want to delete this habit?');
			console.log(feedback);
			if (!feedback) {
				return;
			}
			await firestore
				.collection('habits')
				.doc(id)
				.delete();

			// UPDATE HABIT SUBCOLLECTION DATA
			const habitSubRef = getHabitSubRef(id); // it is a utility function see begining

			await habitSubRef.set(
				{
					deleteInfo: {
						creator: user.displayName,
						creatorId: user.uid,
						creatorEmail: user.email,
						deletedAt: new Date()
					}
				},
				{ merge: true }
			);
			// END
		} catch (error) {
			console.log(error);
		}
	};

	// ==================== FOR HABIT COMPLETE AND INCOMPLETE FUNCTION ====================
	const habitAction = async id => {};

	// ==================== FOR HABIT COMPLETE FUNCTION ====================
	const habitComplete = async id => {
		// CHECK FOR DUPLICATE ACTION
		var needUpdate = false;
		var tempHabitId = null;
		var tempTodayStatus = null;
		var tempTodayDate = null;

		// UPDATE THE HABIT AND STORE IT IN NEW ARRAY
		const newHabits = habits.map(habit => {
			if (habit.id === id) {
				if (!(habit.todayStatus === null || habit.todayStatus !== true)) {
					return habit;
				}
				habit.todayStatus = true;
				habit.todayDate = getFormatedDate(new Date());
				needUpdate = true;
				tempHabitId = habit.id;
				tempTodayStatus = true;
				tempTodayDate = getFormatedDate(new Date());

				return habit;
			}
			return habit;
		});

		console.log('needUpdate: ', needUpdate);

		// RETURN IF DUPLICATE ACTION OCCURRED
		if (!needUpdate) {
			return;
		}

		// ELSE UPDATE HABIT ON LOCAL STATE AND DATABASE

		try {
			// FIRESTORE DATABASE
			await firestore
				.collection('habits')
				.doc(id)
				.update({
					todayStatus: tempTodayStatus,
					todayDate: tempTodayDate
				});

			// UPDATE HABIT SUBCOLLECTION DATA
			const habitSubRef = getHabitSubRef(tempHabitId); // it is a utility function see begining

			await habitSubRef.set(
				{
					[tempTodayDate]: tempTodayStatus,
					lastUpdate: new Date()
				},
				{ merge: true }
			);
			// END

			// LOCAL STATE
			setHabits(newHabits);
		} catch (error) {
			console.log(error);
		}
	};

	// ==================== FOR HABIT INCOMPLETE FUNCTION ====================
	const habitIncomplete = async id => {
		// CHECK FOR DUPLICATE ACTION
		var needUpdate = false;
		var tempTodayStatus = null;
		var tempTodayDate = null;
		var tempHabitId = null;

		// UPDATE THE HABIT AND STORE IT IN NEW ARRAY
		const newHabits = habits.map(habit => {
			if (habit.id === id) {
				if (!(habit.todayStatus === null || habit.todayStatus !== false)) {
					return habit;
				}
				habit.todayStatus = false;
				habit.todayDate = getFormatedDate(new Date());
				needUpdate = true;
				tempHabitId = habit.id;
				tempTodayStatus = false;
				tempTodayDate = getFormatedDate(new Date());
				return habit;
			}
			return habit;
		});

		console.log('needUpdate: ', needUpdate);

		// RETURN IF DUPLICATE ACTION OCCURRED
		if (!needUpdate) {
			return;
		}

		// ELSE UPDATE HABIT ON LOCAL STATE AND DATABASE

		try {
			// FIRESTORE DATABASE
			await firestore
				.collection('habits')
				.doc(id)
				.update({
					todayStatus: tempTodayStatus,
					todayDate: tempTodayDate
				});

			// UPDATE HABIT SUBCOLLECTION DATA
			const habitSubRef = getHabitSubRef(tempHabitId); // it is a utility function see begining

			await habitSubRef.set(
				{
					[tempTodayDate]: tempTodayStatus,
					lastUpdate: new Date()
				},
				{ merge: true }
			);
			// END

			// LOCAL STATE
			setHabits(newHabits);
		} catch (error) {
			console.log(error);
		}
	};

	// ==================== SET HABIT STATE TO NULL FUNCTION ====================
	const removeHabitsFromState = () => {
		setHabits([]);
		alert('removed');
	};

	return (
		<HabitContext.Provider
			value={{
				habits,
				addHabit,
				updateHabit,
				deleteHabit,
				habitComplete,
				habitIncomplete,
				removeHabitsFromState // CHECK THIS ONE
			}}>
			{props.children}
		</HabitContext.Provider>
	);
};

export default HabitContextProvider;
