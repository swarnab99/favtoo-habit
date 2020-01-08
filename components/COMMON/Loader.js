import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import HandleUserAuth from '../HandleUserAuth/HandleUserAuth';

const Loader = () => {
	const { user } = useContext(AuthContext);
	// const user = null;
	console.log(user);
	return (
		<div className='loader-wraper'>
			<div className='logo'>Habit</div>

			{user === false ? (
				<HandleUserAuth />
			) : (
				<div className='loader'>Loading...</div>
			)}

			<style jsx>{`
				.loader-wraper {
					position: fixed;
					height: 100%;
					width: 100%;
					color: #6d3c6d;
					background: #4c2a4c;
					z-index: 9999;
					transition: all 0.3s;
          visibility: ${user ? 'hidden' : 'visible'};
          // opacity: ${user ? '0' : '1'};
          
				}
				.logo {
				    text-align: center;
    font-family: 'Poppins',sans-serif;
    font-size: 4rem;
    transform: translateY(0);
    bottom: 0;
    width: 100%;
    margin-top: 1rem;
}
				}
				.loader,
				.loader:before,
				.loader:after {
					border-radius: 50%;
					width: 2.5em;
					height: 2.5em;
					-webkit-animation-fill-mode: both;
					animation-fill-mode: both;
					-webkit-animation: load7 1.8s infinite ease-in-out;
					animation: load7 1.8s infinite ease-in-out;
				}
				.loader {
					color: inherit;
					font-size: 10px;
					margin: 80px auto;
					position: absolute;
					left: 50%;
					bottom: 5vh;
					transform: translate(-50%, -50%);
					text-indent: -9999em;
					// -webkit-transform: translateZ(0);
					// -ms-transform: translateZ(0);
					// transform: translateZ(0);
					-webkit-animation-delay: -0.16s;
					animation-delay: -0.16s;
				}
				.loader:before,
				.loader:after {
					content: '';
					position: absolute;
					top: 0;
				}
				.loader:before {
					left: -3.5em;
					-webkit-animation-delay: -0.32s;
					animation-delay: -0.32s;
				}
				.loader:after {
					left: 3.5em;
				}
				@-webkit-keyframes load7 {
					0%,
					80%,
					100% {
						box-shadow: 0 2.5em 0 -1.3em;
					}
					40% {
						box-shadow: 0 2.5em 0 0;
					}
				}
				@keyframes load7 {
					0%,
					80%,
					100% {
						box-shadow: 0 2.5em 0 -1.3em;
					}
					40% {
						box-shadow: 0 2.5em 0 0;
					}
				}
			`}</style>
		</div>
	);
};

export default Loader;
