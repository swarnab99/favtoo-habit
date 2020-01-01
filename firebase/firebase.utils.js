import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyB8_q7Sb5d7BLUmCAiNTKvYXD5R13fC0RY',
	authDomain: 'favtoo-habit.firebaseapp.com',
	databaseURL: 'https://favtoo-habit.firebaseio.com',
	projectId: 'favtoo-habit',
	storageBucket: 'favtoo-habit.appspot.com',
	messagingSenderId: '552517366868',
	appId: '1:552517366868:web:13a4ec67b59017a3f2e9c1',
	measurementId: 'G-17WQEXDSMZ'
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

// firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// export const signInWithGoogle = () => auth.signInWithRedirect(provider); // this method is preferred in mobile devices than the above

const providerFB = new firebase.auth.FacebookAuthProvider();
providerFB.setCustomParameters({ display: 'popup' });
export const signInWithFacebook = () => auth.signInWithPopup(providerFB);

export default firebase;

//firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleIdToken, googleAccessToken))...`
