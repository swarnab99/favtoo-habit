import React, { useContext } from 'react';
import uuid from 'uuid/v1';

import { HabitContext } from '../../contexts/HabitContext';

import HabitItem from './HabitItem';

const HabitList = () => {
	const { habits } = useContext(HabitContext);
	console.log(habits);
	return (
		<div>
			<div className='container'>
				{habits.length ? (
					<div>
						{habits.map(habitItem => (
							<HabitItem key={uuid()} habit={habitItem} />
						))}
					</div>
				) : (
					<div>No Habits to cover </div>
				)}
			</div>

			<style jsx>{`
				font-family: 'Poppins', sans-serif;

				.container {
					margin-top: 4rem;
					display: flex;
					flex-direction: column;
				}
			`}</style>
		</div>
	);
};

export default HabitList;
