import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import GreetUser from './GreetUser';

const HeroSection = () => {
	const { user } = useContext(AuthContext);
	return (
		<>
			<GreetUser user={user} />
		</>
	);
};

export default HeroSection;
