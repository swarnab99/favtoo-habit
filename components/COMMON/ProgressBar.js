import React, { useContext } from 'react';
import { HabitContext } from '../../contexts/HabitContext';

const ProgressBar = () => {
	const { habitActionLoading } = useContext(HabitContext);
	console.log('show progress: ', habitActionLoading);
	return (
		<>
			<div className='progress'>
				<div className='indeterminate'></div>
			</div>

			<style jsx>{`
				/* Progress Bar */
				.progress {
					position: relative;
					height: 4px;
					display: block;
					width: 100%;
					background-color: #553055;
					background-clip: padding-box;
					overflow: hidden;
					visibility: ${habitActionLoading ? 'visible' : 'hidden'};
				}

				.progress .indeterminate {
					background-color: #a84e74;
					// background-color: #A26DA1;
				}
				.progress .indeterminate:before {
					content: '';
					position: absolute;
					background-color: inherit;
					top: 0;
					left: 0;
					bottom: 0;
					will-change: left, right;
					-webkit-animation: indeterminate 2.1s
						cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
					animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
						infinite;
				}
				.progress .indeterminate:after {
					content: '';
					position: absolute;
					background-color: inherit;
					top: 0;
					left: 0;
					bottom: 0;
					will-change: left, right;
					-webkit-animation: indeterminate-short 2.1s
						cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
					animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
						infinite;
					-webkit-animation-delay: 1.15s;
					animation-delay: 1.15s;
				}

				@-webkit-keyframes indeterminate {
					0% {
						left: -35%;
						right: 100%;
					}
					60% {
						left: 100%;
						right: -90%;
					}
					100% {
						left: 100%;
						right: -90%;
					}
				}
				@keyframes indeterminate {
					0% {
						left: -35%;
						right: 100%;
					}
					60% {
						left: 100%;
						right: -90%;
					}
					100% {
						left: 100%;
						right: -90%;
					}
				}
				@-webkit-keyframes indeterminate-short {
					0% {
						left: -200%;
						right: 100%;
					}
					60% {
						left: 107%;
						right: -8%;
					}
					100% {
						left: 107%;
						right: -8%;
					}
				}
				@keyframes indeterminate-short {
					0% {
						left: -200%;
						right: 100%;
					}
					60% {
						left: 107%;
						right: -8%;
					}
					100% {
						left: 107%;
						right: -8%;
					}
				}
			`}</style>
		</>
	);
};

export default ProgressBar;
