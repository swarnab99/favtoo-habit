import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase/firebase.utils';
import { AuthContext } from './AuthContext';

export const HabitContext = createContext();

const HabitContextProvider = props => {
	const { user } = useContext(AuthContext);
	const [habits, setHabits] = useState([]);
	const [habitActionLoading, setHabitActionLoading] = useState(true);

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

	// ==================== GET HABIT SUB COLLECTION URL FUNCTION ====================
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
		setHabitActionLoading(true);
		try {
			const habitsData = await firestore
				.collection('habits')
				.where('creator', '==', user.uid)
				.get();

			console.log(habitsData);
			if (habitsData.empty) {
				// setHabitActionLoading(false);
				console.log('No habits found');
				return;
			}

			// ARRAY AND ALSO STORING ID FOR EACH OBJECT (HABIT)
			var newHabits = habitsData.docs.map(doc => {
				const habit = doc.data();

				// UPDATE TODAYDATE AND HABITSTATUS IF DATA IS OLD (ex: YESTERDAY)
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

		setHabitActionLoading(false);
	};

	// ==================== FOR ADD HABIT FUNCTION ====================
	const addHabit = async (name, description) => {
		if (!user) {
			alert('Please Login first');
			return;
		}

		// SHOW PROGRESS BAR
		setHabitActionLoading(true);

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
		// HIDE PROGRESS BAR
		setHabitActionLoading(false);
		return true;
	};

	// ==================== FOR UPDATE HABIT FUNCTION ====================
	const updateHabit = async id => {};

	// ==================== FOR DELETE HABIT FUNCTION ====================
	const deleteHabit = async id => {
		// SHOW PROGRESS BAR
		setHabitActionLoading(true);
		try {
			const feedback = confirm('Do you really want to delete this habit?');
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

			// REMOVE HABIT FORM LOCAL STATE
			setHabits(habits.filter(habit => habit.id !== id));
		} catch (error) {
			console.log(error);
		}
		// HIDE PROGRESS BAR
		setHabitActionLoading(false);
	};

	// ==================== FOR HABIT COMPLETE (isComplete == true) AND INCOMPLETE (isComplete == false) FUNCTION ====================
	const habitAction = async (id, isComplete) => {
		const habit = habits.find(habit => habit.id == id);
		if (!(habit.todayStatus === null || habit.todayStatus !== isComplete)) {
			console.log('needUpdate: ', false);
			return; // no need to update
		}

		console.log('needUpdate: ', true);
		// SHOW PROGRESS BAR
		setHabitActionLoading(true);

		habit.todayStatus = isComplete;
		habit.todayDate = getFormatedDate(new Date());

		console.log(habits);

		// ELSE UPDATE HABIT ON LOCAL STATE AND DATABASE

		try {
			// FIRESTORE DATABASE
			await firestore
				.collection('habits')
				.doc(id)
				.update({
					todayStatus: habit.todayStatus,
					todayDate: habit.todayDate,
					lastUpdate: new Date()
				});

			// UPDATE HABIT SUBCOLLECTION DATA
			const habitSubRef = getHabitSubRef(id); // it is a utility function see at begining

			await habitSubRef.set(
				{
					[habit.todayDate]: habit.todayStatus,
					lastUpdate: new Date()
				},
				{ merge: true }
			);
			// END
		} catch (error) {
			console.log(error);
		}

		setHabitActionLoading(false);
	};

	// ==================== SET HABIT STATE TO NULL FUNCTION ====================
	const removeHabitsFromState = () => {
		setHabits([]);
		alert('removed');
	};

	return (
		<HabitContext.Provider
			value={{
				habitActionLoading,
				habits,
				addHabit,
				updateHabit,
				deleteHabit,
				habitAction,
				removeHabitsFromState // CHECK THIS ONE
			}}>
			{props.children}
		</HabitContext.Provider>
	);
};

export default HabitContextProvider;
