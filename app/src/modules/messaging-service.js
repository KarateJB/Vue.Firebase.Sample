
export default class MessagingService {

    constructor() {

        this.messaging = window.firebaseMessaging;
        // Add the public key generated from the console
        this.messaging.usePublicVapidKey(
            "BHtEpd1DaSJwKYZwvd-MpXIu37Egpj_EJh9yWyJBjOqgMXr5wVazK5NZzZh-ImwuFkJJPObgYmbiQlzAiXjCHPw"
        );

    }

    /* Request user's permission */
    async requestPermissionAsync() {
        var vm = this;
        vm.messaging.requestPermission().then(function () {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
        }).catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
    }

    /* Get messaging token */
    async getTokenAsync() {

        var vm = this;
        return new Promise((resolve, reject) => {

            vm.messaging.getToken().then(function (currentToken) {
                if (currentToken) {
                    console.log("Token1", currentToken);
                    vm.sendTokenToServerAsync(currentToken);
                    resolve(currentToken);
                }
                else {
                    // Show permission request.
                    console.log('No Instance ID token available. Request permission to generate one.');
                    // Show permission UI.
                    vm.setTokenSentToServerAsync(false);
                    resolve(false);
                }
            }).catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);
                vm.setTokenSentToServer(false);
                reject(false);
            });
        })

    }

    /* Delete Instance ID token */
    async deleteTokenAsync() {
        console.log('class', this.messaging);

        var vm = this;

        vm.messaging.getToken().then(function (currentToken) {
            vm.messaging.deleteToken(currentToken).then(function () {
                console.log('Token deleted.');
                vm.setTokenSentToServer(false);
            }).catch(function (err) {
                console.log('Unable to delete token. ', err);
            });
        }).catch(function (err) {
            console.log('Error retrieving Instance ID token. ', err);
        });
    }

    /* Token changed callback */
    async watchTokenChangesAsync() {

        var vm = this;

        // START refresh_token
        vm.messaging.onTokenRefresh(function () {
            vm.messaging
                .getToken()
                .then(function (refreshedToken) {
                    console.log("Token refreshed.");
                    // Indicate that the new Instance ID token has not yet been sent to the
                    // app server.
                    vm.setTokenSentToServer(false);
                    // Send Instance ID token to app server.
                    vm.sendTokenToServerAsync(refreshedToken);
                })
                .catch(function (err) {
                    console.log("Unable to retrieve refreshed token ", err);
                });
        });

    }


    // Send the Instance ID token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    sendTokenToServerAsync(currentToken) {
        var vm = this;
        if (!vm.isTokenSentToServer()) {
            console.log('Sending token to server...');
            // TODO(developer): Send the current token to your server.
            vm.setTokenSentToServer(true);
        }
        else {
            console.log('Token already sent to server so won\'t send it again ' +
                'unless it changes');

        }
    }

    isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
    }

    setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }




}