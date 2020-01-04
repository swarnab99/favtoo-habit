import React, { useContext } from 'react';
import uuid from 'uuid/v1';

import { HabitContext } from '../../contexts/HabitContext';
import { AuthContext } from '../../contexts/AuthContext';

import HabitItem from './HabitItem';

const HabitList = () => {
	const { habits } = useContext(HabitContext);
	const { user } = useContext(AuthContext);
	console.log(habits);
	return (
		<>
			{user ? (
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
				</div>
			) : (
				<div>Please Sign In to Create Habits</div>
			)}

			<style jsx>{`
				font-family: 'Poppins', sans-serif;

				.container {
					margin-top: 4rem;
					display: flex;
					flex-direction: column;
				}
			`}</style>
		</>
	);
};

export default HabitList;
