import React, { useState, useContext } from 'react';

import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

const AuthModal = () => {
	const [show, setShow] = useState('signup');
	console.log(show);
	return (
		<div className='auth-modal show-modal'>
			{show && show === 'signup' ? (
				<SignupModal setShow={setShow} />
			) : (
				<LoginModal setShow={setShow} />
			)}

			<style jsx>{``}</style>
		</div>
	);
};

export default AuthModal;
