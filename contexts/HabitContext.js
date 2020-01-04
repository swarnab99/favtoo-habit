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

	const getUserHabits = async () => {
		try {
			const habits = await firestore
				.collection('habits')
				.where('creator', '==', user.uid)
				.get();

			// ARRAY AND ALSO STORING ID FOR EACH OBJECT (HABIT)
			const newHabits = habits.docs.map(doc => {
				// check current date ======================================================
				const habit = doc.data();
				habit.id = doc.id;
				return habit;
			});

			setHabits(newHabits);
		} catch (error) {
			console.log(error);
		}
	};

	const addHabit = async (name, description) => {
		if (!user) {
			alert('Please Login first');
			return;
		}
		let newHabit = {
			name,
			description,
			createdAt: new Date(),
			creator: user.uid
		};

		try {
			const newCreatedDoc = await firestore.collection('habits').add(newHabit);
			console.log(newCreatedDoc.id, newCreatedDoc);

			newHabit.id = newCreatedDoc.id;

			console.log(newHabit);

			setHabits([...habits, newHabit]);
		} catch (error) {
			console.log(error);
		}

		return true;
	};

	const updateHabit = async id => {};

	const deleteHabit = async id => {
		setHabits(habits.filter(habit => habit.id !== id));
	};

	const habitComplete = async id => {
		// CHECK FOR DUPLICATE ACTION
		var needUpdate = false;
		// UPDATE THE HABIT AND STORE IT IN NEW ARRAY
		const newHabits = habits.map(habit => {
			if (habit.id === id) {
				if (!(habit.todayStatus === undefined || habit.todayStatus !== true)) {
					return habit;
				}
				habit.todayStatus = true;
				needUpdate = true;
				return habit;
			}
			return habit;
		});

		console.log('needUpdate: ', needUpdate);

		// RETURN IF DUPLICATE ACTION OCCURED
		if (!needUpdate) {
			return;
		}

		// ELSE UPDATE HABIT ON LOCAL STATE AND DATABASE

		try {
			// LOCAL STATE
			setHabits(newHabits);
			// FIRESTORE DATABASE
			await firestore
				.collection('habits')
				.doc(id)
				.update({
					todayStatus: true
				});
		} catch (error) {
			console.log(error);
		}
	};

	const habitIncomplete = async id => {
		// CHECK FOR DUPLICATE ACTION
		var needUpdate = false;
		// UPDATE THE HABIT AND STORE IT IN NEW ARRAY
		const newHabits = habits.map(habit => {
			if (habit.id === id) {
				if (!(habit.todayStatus === undefined || habit.todayStatus !== false)) {
					return habit;
				}
				habit.todayStatus = false;
				needUpdate = true;
				return habit;
			}
			return habit;
		});

		console.log('needUpdate: ', needUpdate);

		// RETURN IF DUPLICATE ACTION OCCURED
		if (!needUpdate) {
			return;
		}

		// ELSE UPDATE HABIT ON LOCAL STATE AND DATABASE

		try {
			// LOCAL STATE
			setHabits(newHabits);
			// FIRESTORE DATABASE
			await firestore
				.collection('habits')
				.doc(id)
				.update({
					todayStatus: false
				});
		} catch (error) {
			console.log(error);
		}
	};

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
