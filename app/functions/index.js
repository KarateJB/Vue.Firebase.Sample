const functions = require("firebase-functions")
const admin = require("firebase-admin")
const cors = require("cors")({ origin: true });
const httpClient = require("request");
const firebaseConfig = require("./firebase.config.prod")


admin.initializeApp();

/* Send FCM discount message */
exports.sendDiscountMsg = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const userToken = request.get("token");
        const userName = request.get("user-name")
        //response.send(payload);
        response.end();

        /* Legacy FCM server API : https://firebase.google.com/docs/cloud-messaging/admin/legacy-fcm */
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

        /* Admin FCM API (Node.js): https://firebase.google.com/docs/cloud-messaging/admin/send-messages */
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


/* Send FCM order message to topic: "orders" */
exports.sendOrdersMsg = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // const userToken = request.get("token");
        const userName = request.get("user-name")
        const itemsCnt = request.query.itemscnt;
        //response.send(payload);
        response.end();

        let message = {
            webpush: {
                notification: {
                    title: "Orders",
                    body: `${userName} just bought ${itemsCnt} awesome product(s), don't miss the best discount!`,
                    click_action: "https://shopcart-vue.firebaseapp.com",
                    icon: "dist/firebase-logo.png"
                }
            },
            topic: "orders"
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

/* Send FCM order message to topic: "orders" by watching created new order */
// exports.sendOrdersMsgByRtdb = functions.database.ref('/Demo/orders/{pushId}')
//     .onCreate((snapshot, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         const newOrder = snapshot.val();

//         console.info("Push id", context.params.pushId);
//         console.info("newOrder", newOrder);


//         const user = newOrder.customer;
//         const itemsCnt = newOrder.items.length;

//         let message = {
//             webpush: {
//                 notification: {
//                     title: "Orders",
//                     body: `${user} just bought ${itemsCnt} awesome product(s), don't miss the best discount!`,
//                     click_action: "https://shopcart-vue.firebaseapp.com",
//                     icon: "dist/firebase-logo.png"
//                 }
//             },
//             topic: "orders"
//         };

//         return admin.messaging().send(message)
//             .then((response) => {
//                 // Response is a message ID string.
//                 console.log('Successfully sent message:', response);
//             })
//             .catch((error) => {
//                 console.log('Error sending message:', error);
//             });
//     });



functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // const userToken = request.get("token");
        const userName = request.get("user-name")
        const itemsCnt = request.query.itemscnt;
        //response.send(payload);
        response.end();

        let message = {
            webpush: {
                notification: {
                    title: "Orders",
                    body: `${userName} just bought ${itemsCnt} awesome product(s), don't miss the best discount!`,
                    click_action: "https://shopcart-vue.firebaseapp.com",
                    icon: "dist/firebase-logo.png"
                }
            },
            topic: "orders"
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

/* Subscribe topic */
exports.subscribeTopic = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        const userToken = request.get("token");
        const topic = request.query.topic;

        if (userToken) { //Subscribe ONE token to a topic

            //By Google API

            httpClient({
                url: `https://iid.googleapis.com/iid/v1/${userToken}/rel/topics/${topic}`,
                method: 'POST',
                headers: {
                    Authorization: "key=" + firebaseConfig.serverKey
                }
            }, function (err, res, body) {
                if (err) {
                    console.log(err);
                    response.send("Failed to subscribe topic: " + topic);
                } else {
                    console.log(res.statusCode, body);
                    response.send("Successfully subscribed to topic: " + topic);
                }
            });
        }
        else {  //Subscribe MULTIPLE tokens to a topic

            let userTokens = request.body.tokens; //tokens should be Array

            // 1. Google API
            // let data = '{ "to": "/topics/' + topic + '", "registration_tokens": ' + JSON.stringify(userTokens) + '}';

            // httpClient({
            //     url: "https://iid.googleapis.com/iid/v1:batchAdd",
            //     method: 'POST',
            //     headers: {
            //         Authorization: "key=" + firebaseConfig.serverKey
            //     },
            //     body: data
            // }, function (err, res, body) {
            //     if (err) {
            //         console.log(err);
            //         response.send("Failed to subscribe topic: " + topic);
            //     } else {
            //         console.log(res.statusCode, body);
            //         response.send("Successfully subscribed to topic: " + topic);
            //     }
            // });

            // 2. Firebase Admin SDK
            response.end();
            return admin.messaging().subscribeToTopic(userTokens, topic)
                .then(function (response) {
                    console.log('Successfully subscribed to topic:', response);
                })
                .catch(function (err) {
                    console.error("Failed to subscribe topic: " + topic, err);
                });

        }
    });
})


/* Unsubscribe topic */
exports.unsubscribeTopic = functions.https.onRequest((request, response) => {

    const userTokens = request.body.tokens; //tokens should be Array
    const topic = request.query.topic;


    cors(request, response, () => {

        //1. By Google API
        // let data = '{ "to": "/topics/' + topic + '", "registration_tokens": ' + JSON.stringify(userTokens) + '}';

        // httpClient({
        //     url: "https://iid.googleapis.com/iid/v1:batchRemove",
        //     method: 'POST',
        //     headers: {
        //         Authorization: "key=" + firebaseConfig.serverKey
        //     },
        //     body: data
        // }, function (err, res, body) {
        //     if (err) {
        //         console.log(err);
        //         response.send("Failed to unsubscribe topic: " + topic);
        //     } else {
        //         console.log(res.statusCode, body);
        //         response.send("Successfully unsubscribed to topic: " + topic);
        //     }
        // });

        // 2. Firebase Admin SDK
        response.end();

        return admin.messaging().unsubscribeFromTopic(userTokens, topic)
            .then(function (response) {
                console.log('Successfully subscribed to topic:', response);
            })
            .catch(function (err) {
                console.error("Failed to unsubscribe topic: " + topic, err);
            });
    });
})