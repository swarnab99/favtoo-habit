import React from 'react';

import Layout from '../components/Layout';
import CreateHabit from '../components/CreateHabit/CreateHabit';
import HabitList from '../components/HabitList/HabitList';
import GreetUser from '../components/HeroSection/GreetUser';

const IndexPage = () => (
	<Layout>
		<GreetUser />
		<HabitList />
		<CreateHabit />
	</Layout>
);

export default IndexPage;
