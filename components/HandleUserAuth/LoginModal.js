import React, { useState, useContext } from 'react';
import { FaAngleDoubleRight, FaCog } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthContext';

const LoginModal = ({ setShow }) => {
	// GLOBAL HABIT CONTEXT
	const { login } = useContext(AuthContext);
	// console.log(habits)
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (loading) {
			return;
		}

		// START LOADING
		setLoading(true);
		// END
		console.log(formData);
		const feedback = await login(formData.email, formData.password);
		console.log(feedback);
		if (feedback.code === 'success') {
			// LOADING COMPLETE
			setLoading(false);
			// END
			// CLEAR INPUTS
			setFormData({
				email: '',
				password: ''
			});
			// END

			// CLEAR ERROR MSG
			setErrorMsg(null);
			// END

			// HIDE AUTH MODAL
			// var triggerAuth = document.querySelector('.trigger-auth');
			// triggerAuth.click();
			// END
		} else {
			// LOADING COMPLETE
			setLoading(false);
			// END
			setErrorMsg(feedback.message);
		}
	};
	return (
		<>
			<div className='modal-content'>
				{/* <span className="close-button">&times;</span> */}
				<h1 className='title'>Login to Habit </h1>
				<div className='input-group'>
					<form onSubmit={handleSubmit}>
						<input
							value={formData.email}
							onChange={handleChange}
							name='email'
							type='email'
							placeholder='Email'
							required
							autoComplete='off'
						/>
						<input
							value={formData.password}
							onChange={handleChange}
							name='password'
							type='password'
							placeholder='Password'
							required
							autoComplete='off'
						/>
						<p className='error-msg'>{errorMsg && errorMsg}</p>
						<button type='submit' disabled={loading}>
							{loading ? (
								<span className='icon spinner'>
									<FaCog />
								</span>
							) : (
								<span className='icon'>
									<FaAngleDoubleRight />
								</span>
							)}
						</button>
					</form>
					<div onClick={() => setShow('signup')} className='link'>
						Don't have Account? <span> Create Account</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginModal;
