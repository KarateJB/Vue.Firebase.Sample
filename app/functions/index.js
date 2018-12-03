const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendBookingMsg = functions.https.onRequest((request, response) => {

    const userToken = request.get('token');

    // Notification details.
    let payload = {
        notification: {
            title: "Advertisements",
            body: "We have special discount for you, visit here for more details!",
            icon: null
        }
    };

    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(token, payload);
})

