import React, { useContext } from 'react';
// import { HabitContext } from "../../contexts/HabitContext"

import AuthBtn from './AuthBtn';
import AuthModal from './AuthModal';

const HandleUserAuth = () => {
	return (
		<div>
			<AuthModal />
			<AuthBtn />
		</div>
	);
};

export default HandleUserAuth;
