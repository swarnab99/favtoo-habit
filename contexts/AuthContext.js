import React, { createContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.utils';

export const AuthContext = createContext();

const AuthContextProvider = props => {
	const [user, setUser] = useState(null);

	// LOAD USER ON INITIAL STAGE
	useEffect(() => {
		auth.onAuthStateChanged(function(userAuth) {
			if (userAuth) {
				// User is signed in.
				console.log('Already sign in');
				// Redirect to home page

				setUser(userAuth);
			} else {
				console.log('user signed out');
				setUser(null);
			}
		});

		return () => {
			setUser(null);
		};
	}, []);

	// LOGIN FUNCTION USES GOOGLE AUTH 2.0
	const login = async () => {
		signInWithGoogle()
			.then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log(result, 'Result');
				// ...
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				console.log('Error', error);
				// ...
			});
	};

	// LOGOUT FUNCTION
	const logout = async id => {
		auth
			.signOut()
			.then(function() {
				// Sign-out successful.
				setUser(null);
			})
			.catch(function(error) {
				// An error happened.
				console.error(error);
			});
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
