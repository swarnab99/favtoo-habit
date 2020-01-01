import React from 'react';
import Head from 'next/head';

import Header from './Header';
// import '../assets/layout.css';
import HabitContextProvider from '../contexts/HabitContext';
import AuthContextProvider from '../contexts/AuthContext';
// import "../assets/app"

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>fav Habit</title>
				<link
					href='/static/css/layout.css'
					rel='stylesheet'
					key='custom-style'
				/>
			</Head>
			<AuthContextProvider>
				<HabitContextProvider>
					<Header />
					<div className='container'>
						<main>{children}</main>
					</div>
				</HabitContextProvider>
			</AuthContextProvider>

			<style jsx>{`
				.container {
					margin: 0 auto;
					maxwidth: 960px;
					padding: 0px 1.0875rem 1.45rem;
					paddingtop: 0;
				}
			`}</style>
		</>
	);
};

export default Layout;
