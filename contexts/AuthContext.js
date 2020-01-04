import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.utils';
import { HabitContext } from '../contexts/HabitContext';

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

	// SIGNUP USING GOOGLE
	const googleSignIn = async () => {
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

	// SIGNUP FUNCTION
	const signup = async (fullName, email, password) => {
		try {
			// CREATING USER (SIGNIN)
			const userData = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			// UPDATING USER PROFILE
			const user = auth.currentUser;
			await user.updateProfile({
				displayName: fullName
			});

			// RETURN SUCCESS MESSAGE
			return {
				code: 'success'
			};
		} catch (error) {
			return error;
		}
		return null;
	};

	// LOGIN FUNCTION
	const login = async (email, password) => {
		try {
			// LOGIN USER
			const userData = await auth.signInWithEmailAndPassword(email, password);

			// RETURN SUCCESS MESSAGE
			return {
				code: 'success'
			};
		} catch (error) {
			return error;
		}
		return null;
	};

	// LOGOUT FUNCTION
	const logout = async => {
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
		<AuthContext.Provider value={{ user, signup, login, logout, googleSignIn }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
