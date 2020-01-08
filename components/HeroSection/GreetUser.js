import React from 'react';
const GreetUser = ({ user }) => {
	console.log('object', user);
	return (
		<div>
			<h1 className='greet'>Hi, {user ? user.displayName : 'Beauty'}</h1>

			<style jsx>{`
				.greet {
				    color: #000;
    font-size: 2rem;
    text-align: center;
    font-family: 'Poppins',sans-serif;
    margin: 0;
}
				}
			`}</style>
		</div>
	);
};

export default GreetUser;
