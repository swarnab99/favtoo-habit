import React, { useContext } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
	SwipeableList,
	SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
// import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import { HabitContext } from '../../contexts/HabitContext';

const HabitItem = ({ habit }) => {
	// GLOBAL HABIT CONTEXT
	const {
		updateHabit,
		deleteHabit,
		habitComplete,
		habitIncomplete
	} = useContext(HabitContext);
	const { id, name, description, todayStatus } = habit;
	console.log(todayStatus);

	const changeStatus = () => {
		console.log('object');
	};

	return (
		// <div onClick={changeStatus}>
		// 	{name}

		// 	<style jsx>{`
		// 		color: var(--main-color);
		// 		background: var(--main-bg-secondary);
		// 		padding: 0.8rem 1rem;
		// 		border-radius: 6px;
		// 		overflow: hidden;
		// 		margin-bottom: 0.8rem;
		// 		border-left: 6px solid #6d3c6d;
		// 	`}</style>
		// </div>
		<div className='swipeableListWrap'>
			<SwipeableList threshold={0.3}>
				<SwipeableListItem
					swipeLeft={{
						content: (
							<div className='content contentLeft'>
								Habit Incompleted <FaTimes />
							</div>
						),
						action: () => habitIncomplete(id)
					}}
					swipeRight={{
						content: (
							<div className='content contentRight'>
								<FaCheck /> Habit Completed
							</div>
						),
						action: () => habitComplete(id)
					}}>
					<div className='habitItem'>{name}</div>
				</SwipeableListItem>
			</SwipeableList>

			<style jsx>{`
				.swipeableListWrap {
					position: relative;
					max-width: 99.99%;
					overflow: hidden;
				}

				.habitItem {
					color: var(--main-color);
					background: var(--main-bg-secondary);
					padding: 0.8rem 1rem;
					border-radius: 6px;
					overflow: hidden;
					margin-bottom: 0.8rem;
					border-left: 6px solid #6d3c6d;
					border-left-color: ${todayStatus !== undefined &&
						(todayStatus ? 'green' : 'red')};
					z-index: 9999;
					opacity: 10;
					cursor: pointer;
				}

				.content {
					position: absolute;
					color: #fff;
					width: 100%;
					padding: 0.8rem 1rem;
					border-radius: 6px;
					overflow: hidden;
					margin-bottom: 0.8rem;
					z-index: 99;
				}

				.contentRight {
					background: green;
				}

				.contentLeft {
					text-align: right;
					float: right;
					background: red;
				}
			`}</style>
		</div>
	);
};

export default HabitItem;
