const functions = require("firebase-functions")
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin")
// const express = require('express');
// const app = express();
// app.use(cors);

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendBookingMsg = functions.https.onRequest((request, response) => {


    cors(request, response, () => {
        const userToken = request.get('token');

        // Notification details.
        let payload = {
            notification: {
                title: "Advertisements",
                body: "We have special discount for you, visit here for more details!",
                token: userToken,
                icon: null
            }
        };

        //Test
        response.send(payload);

        // Send notifications to all tokens.
        //return admin.messaging().sendToDevice(userToken, payload);
    });



})

