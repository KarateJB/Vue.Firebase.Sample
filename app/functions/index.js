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
        const userToken = request.get("token");
        const userName = request.get("user-name")


        //response.send(payload);
        response.end();



        /* Legacy API : https://firebase.google.com/docs/cloud-messaging/admin/legacy-fcm */
        // Notification details.
        // let payload = {
        //     notification: {
        //         title: "Advertisements",
        //         body: `Hi ${userName}, we have special discount for you, visit here for more details!`,
        //         click_action: "https://shopcart-vue.firebaseapp.com",
        //         icon: "dist/firebase-logo.png"
        //     }
        // };
        // // Send notifications to device
        // return admin.messaging().sendToDevice(userToken, payload);

        /* Node.js messaging API: https://firebase.google.com/docs/cloud-messaging/admin/send-messages */
        let message = {
            webpush: {
                notification: {
                    title: "Advertisements",
                    body: `Hi ${userName}, we have special discount for you, visit here for more details!`,
                    click_action: "https://shopcart-vue.firebaseapp.com",
                    icon: "dist/firebase-logo.png"
                }
            },
            token: userToken
        };

        return admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    });



})

