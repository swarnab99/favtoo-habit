import React, { useContext } from 'react';
// import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from '../contexts/AuthContext';
import HandleUserAuth from './HandleUserAuth/HandleUserAuth';

const Header = ({ siteTitle }) => {
	// const {} = useContext(ThemeContext)
	const { user, logout, googleSignIn } = useContext(AuthContext);
	console.log(user);
	return (
		<header>
			<div className='title-container'>
				<h1 className='title'>fav habit</h1>
			</div>

			<HandleUserAuth />
			<div>
				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={googleSignIn}>Login</button>
				)}
			</div>

			<style jsx>{`
				header {
					font-family: 'Poppins', sans-serif;
					background: #6d3d6d;
					margin-bottom: 1.45rem;
				}
				header .title-container {
					margin: 0 auto;
					max-width: 960px;
					padding: 1.45rem 1.0875rem;
				}
				.title {
					margin: 0;
				}
				.title a {
					color: white;
					text-decoration: none;
				}
				button {
					background: none;
    box-shadow: none;
    border: none;
    outline: none;
}
				}
			`}</style>
		</header>
	);
};

export default Header;
