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

			// habits.forEach(function (doc) {
			//   // doc.data() is never undefined for query doc snapshots
			//   console.log(doc.id, " => ", doc.data());

			//   setHabits([habits])
			// });

			const newHabits = habits.docs.map(doc => doc.data());
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

	const deleteAllHabits = async id => {
		console.log(id);
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
				deleteAllHabits,
				removeHabitsFromState
			}}>
			{props.children}
		</HabitContext.Provider>
	);
};

export default HabitContextProvider;
