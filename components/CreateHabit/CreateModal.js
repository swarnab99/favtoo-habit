import React, { useState, useContext } from 'react';
import { FaCheck } from 'react-icons/fa';
import { HabitContext } from '../../contexts/HabitContext';

const CreateModal = () => {
	// GLOBAL HABIT CONTEXT
	const { addHabit } = useContext(HabitContext);
	// console.log(habits)

	const [formData, setFormData] = useState({
		name: '',
		description: ''
	});

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(formData)
		const feedback = addHabit(formData.name, formData.description);
		if (feedback) {
			setFormData({
				name: '',
				description: ''
			});
			var trigger = document.querySelector('.trigger');
			trigger.click();
		}
	};

	return (
		<div>
			<div className='modal'>
				<div className='modal-content'>
					{/* <span className="close-button">&times;</span> */}
					<h1 className='title'>Add a New Habit</h1>
					<div className='input-group'>
						<form onSubmit={handleSubmit}>
							<input
								value={formData.name}
								onChange={handleChange}
								name='name'
								type='text'
								placeholder='Habit Name'
								required
							/>
							<input
								value={formData.description}
								onChange={handleChange}
								name='description'
								type='text'
								placeholder='Habit Description (Optional)'
							/>
							<button type='submit'>
								<FaCheck />
							</button>
						</form>
					</div>
				</div>
			</div>

			<style jsx>{`
				.modal {
					font-family: 'Poppins', sans-serif;
					position: fixed;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
					opacity: 0;
					visibility: hidden;
					transform: scale(1.1);
					transition: visibility 0s linear 0.25s, opacity 0.25s 0s,
						transform 0.25s;
				}

				.modal-content {
					position: absolute;
					top: 50%;
					left: 50%;
					-webkit-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);
					background-color: white;
					padding: 1rem 1.5rem;
					width: 100%;
					max-width: 345px;
					border-radius: 0.5rem;
				}

				.modal-content .close-button {
					float: right;
					width: 1.5rem;
					line-height: 1.5rem;
					text-align: center;
					cursor: pointer;
					border-radius: 0.25rem;
					background-color: lightgray;
				}
				.close-button:hover {
					background-color: darkgray;
				}
				.show-modal {
					opacity: 1;
					visibility: visible;
					transform: scale(1);
					transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
				}

				.title {
					font-size: 1.3rem;
				}

				.input-group {
					margin-top: 3rem;
				}
				input {
					box-shadow: none;
					outline: none;
					width: 100%;
					margin-bottom: 1.2rem;
					border: none;
					border-bottom: 1px solid gray;
					font-family: inherit;
				}

				button {
					margin: 0px auto;
					display: block;
					background: #6d3d6d;
					color: #fff;
					border-radius: 4px;
					border: none;
					box-shadow: none;
					padding: 4px 18px;
					margin-top: 30px;
					outline: none;
				}
			`}</style>
		</div>
	);
};

export default CreateModal;
