import React, { useState, useContext } from 'react';
import { FaAngleDoubleRight, FaCog } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthContext';

const SignupModal = ({ setShow }) => {
	// GLOBAL HABIT CONTEXT
	const { signup } = useContext(AuthContext);
	// console.log(habits)
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
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
		const feedback = await signup(
			formData.name,
			formData.email,
			formData.password
		);
		console.log(feedback);
		if (feedback.code === 'success') {
			// CLEAR INPUTS
			setFormData({
				name: '',
				email: '',
				password: ''
			});
			// END
			// CLEAR ERROR MSG
			setErrorMsg(null);
			// END
			// LOADING COMPLETE
			setLoading(false);
			// END
			// HIDE AUTH MODAL
			// var triggerAuth = document.querySelector('.trigger-auth');
			// triggerAuth.click();
			// END

			// ========================= temporary
			window.location = '/';
			// =========================
		} else {
			setErrorMsg(feedback.message);

			// LOADING COMPLETE
			setLoading(false);
			// END
		}
	};
	return (
		<>
			<div className='modal-content'>
				{/* <span className="close-button">&times;</span> */}
				<div>
					<h1 className='title'>Signup to Habit </h1>
				</div>
				<div className='input-group'>
					<form onSubmit={handleSubmit}>
						<input
							value={formData.name}
							onChange={handleChange}
							name='name'
							type='text'
							placeholder='Full Name'
							required
						/>
						<input
							value={formData.email}
							onChange={handleChange}
							name='email'
							type='email'
							placeholder='Email'
						/>
						<input
							value={formData.password}
							onChange={handleChange}
							name='password'
							type='password'
							placeholder='Password'
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
					<div onClick={() => setShow('login')} className='link'>
						Already have Account? <span>Login</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupModal;
