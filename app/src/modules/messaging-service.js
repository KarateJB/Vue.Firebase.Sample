
export default class MessagingService {

    constructor() {

        this.messaging = window.firebaseMessaging;
        this.messaging.usePublicVapidKey(
            "BHtEpd1DaSJwKYZwvd-MpXIu37Egpj_EJh9yWyJBjOqgMXr5wVazK5NZzZh-ImwuFkJJPObgYmbiQlzAiXjCHPw"
        );

        // Token refresh event
        this.messaging.onTokenRefresh(function () {
            console.log('Token refreshed.');
            this.messaging.getToken().then(function (refreshedToken) {
                this.setTokenSentToServerFlg(false);
                this.sendTokenToServer(refreshedToken);
            }).catch(function (err) {
                console.log('Unable to retrieve refreshed token ', err);
            });
        });

        // Receiving message event
        //   this.messaging.onMessage(function(payload) {
        //     console.log('Message received. ', payload);
        //   });
    }

    /* Request user's permission */
    async requestPermissionAsync() {

        try {
            await this.messaging.requestPermission();
            console.log('Notification permission granted.');
        } catch (err) {
            console.log('Unable to get permission to notify.', err);
        }

        // this.messaging.requestPermission().then(function () {
        //     console.log('Notification permission granted.');
        //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // }).catch(function (err) {
        //     console.log('Unable to get permission to notify.', err);
        // });
    }

    /* Get messaging token */
    async getTokenAsync() {

        try {
            let currentToken = await this.messaging.getToken();
            if (currentToken) {
                await this.sendTokenToServerAsync(currentToken);
                return currentToken;
            }
            else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                this.setTokenSentToServerFlg(false);
                return false;
            }
        } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
            this.setTokenSentToServerFlg(false);
            return false;
        }
    }

    /* Delete Instance ID token */
    async deleteTokenAsync() {
        try {
            let currentToken = await this.messaging.getToken();
            await this.messaging.deleteToken(currentToken);
            this.setTokenSentToServerFlg(false);
            console.log('Token deleted: ' + currentToken);
        } catch (err) {
            console.log('Unable to delete token. ', err);
        }
    }

    // Send the Instance ID token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    async sendTokenToServerAsync(currentToken) {

        try {
            if (!this.isTokenSentToServer()) {
                console.log('Sending token to server...');
                // TODO: Send the current token to your server.
                this.setTokenSentToServerFlg(true);
            }
            else {
                console.log('Token already sent to server so won\'t send it again unless it changes');
            }
        } catch (err) {
            console.log('Unable to send token to server', err);
        }
    }

    isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
    }

    setTokenSentToServerFlg(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }
}