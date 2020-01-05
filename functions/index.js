const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	response.send('Hello from Firebase!');
// });

//// Listen for changes in all documents in the 'habits' collection
// exports.habitUpdated = functions.firestore
// 	.document('habits/{habitId}')
// 	.onWrite((change, context) => {
// 		const habitId = context.params.habitId;
// 		const habitData = change.after.data();
// 		console.log('habitId: ', habitId);
// 		console.log(habitData);
// 		// console.log(new Date());

// 		var habitSubRef = admin
// 			.firestore()
// 			.collection('habits')
// 			.doc(habitId)
// 			.collection('monthLogs')
// 			.doc('5-2020');

// 		var setWithMerge = habitSubRef.set(
// 			{
// 				[habitData.todayDate]: habitData.todayStatus
// 			},
// 			{ merge: true }
// 		);

// 		return true;
// 	});
