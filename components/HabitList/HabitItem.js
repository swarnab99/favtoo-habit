import React, { useContext } from 'react';

import { HabitContext } from '../../contexts/HabitContext';

const HabitItem = ({ habit }) => {
	// GLOBAL HABIT CONTEXT
	const { updateHabit, deleteHabit } = useContext(HabitContext);
	const { name, description } = habit;

	const changeStatus = () => {};

	return (
		<div onClick={changeStatus}>
			{name}

			<style jsx>{`
				color: var(--main-color);
				background: var(--main-bg-secondary);
				padding: 0.8rem 1rem;
				border-radius: 6px;
				overflow: hidden;
				margin-bottom: 0.8rem;
				border-left: 6px solid #6d3c6d;
			`}</style>
		</div>
	);
};

export default HabitItem;
