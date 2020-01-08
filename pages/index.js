import React from 'react';

import Layout from '../components/Layout';
import CreateHabit from '../components/CreateHabit/CreateHabit';
import HabitList from '../components/HabitList/HabitList';
import HeroSection from '../components/HeroSection/HeroSection';

const IndexPage = () => (
	<Layout>
		<HeroSection />
		<HabitList />
		<CreateHabit />
	</Layout>
);

export default IndexPage;
