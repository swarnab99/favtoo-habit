import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import AuthBtn from './AuthBtn';
import AuthModal from './AuthModal';

const HandleUserAuth = () => {
	const { user } = useContext(AuthContext);
	return (
		<div>
			{!user && (
				<div>
					<AuthModal />
					<AuthBtn />
				</div>
			)}
		</div>
	);
};

export default HandleUserAuth;
