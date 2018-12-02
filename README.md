## Introduction

Vue.js + Firebase sample (VueFire + Vuex)

* [Source code](https://github.com/KarateJB/Vue.Firebase.Sample)


## Environment

- Google Firebase
- Firebase CLI 6.1.1
- Vue CLI 3.0.5


## Implement

### Create a new Firebase project

Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
and create a new project.

![](https://1.bp.blogspot.com/-mVDXCO7JeDw/WsajV_2C1AI/AAAAAAAAF2E/FVh-Qi5VyZ4ziEJFwg6DukwG_j2hs4cegCEwYBhgL/s320/image001.jpg)



Notice that we will use the following features of Firebase.

1. Authentication
2. Real-time database
3. Cloud storage
4. Hosting

![](https://4.bp.blogspot.com/-dFroJ9YTjMs/WsajZOPlMuI/AAAAAAAAF2I/qz2oN0Dg798u5DeJ3vu9Kuchualbg5XIQCEwYBhgL/s320/image002.png)


### Enable Google login

![](https://2.bp.blogspot.com/-hzT_CCHoXXs/WsajZHjNKJI/AAAAAAAAF2s/7RPJPNtV1x0Khj3AUgFPCB94JmgfHLNoQCEwYBhgL/s640/image003.jpg)



### Set RTDB rules

Copy the following rules to [RTDB rules](https://firebase.google.com/docs/database/security/).

```
{
  "rules": {
    "Demo": {
      "products": {
        ".read": "auth != null",
        ".write": "auth != null  && auth.token.email == 'ur-email@gmail.com'"
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

![](https://1.bp.blogspot.com/-SAhraxE4Z5Q/WsajZC9fJSI/AAAAAAAAF24/toa_xIN9luoW8if3OJnBslbWizvYWNEmwCEwYBhgL/s640/image004.jpg)



### Set Storage rules

Copy the following rules to [Storage rules](https://firebase.google.com/docs/storage/security/start).

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth!=null;
      allow write: if (request.resource.size < 1 * 1024 * 1024 && request.auth.token.email == 'ur-email@gmail.com');
    }
  }
}
```

![](https://1.bp.blogspot.com/-jEslSKOv_oo/WsajZ38R-RI/AAAAAAAAF24/46jfiv3MLH8YtBwo8miWX4p0g2lthrtrwCEwYBhgL/s640/image005.jpg)
 


### Install Vue CLI

```
$ npm install -g @vue/cli
```

You can check the version by `vue --version`.


### Install Firebase CLI

```
$ npm install -g firebase-tools
```


### Clone the Github repository

```
$ git clone https://github.com/KarateJB/Vue.Firebase.Sample.git
```


### Install npm packages

```
$ cd Vue.Firebase.Sample/app
$ npm install
```


## Update FirebaseConfig.ts

Back to Firebase, and copy the Firebase api config.

![](https://1.bp.blogspot.com/-EJAHz0Pxuoc/WsajaHUqEcI/AAAAAAAAF2w/Oe5Tznmu9fYBv0znUvQHrixP-WM1LDkyQCEwYBhgL/s640/image006.jpg)

![](https://1.bp.blogspot.com/-YIO5f6Hw5yU/WsajaPY73WI/AAAAAAAAF20/cvCKjoG5JDISxMdtkZN8OWr4mAg9CnT0gCEwYBhgL/s640/image007.png)

 
Rename `app\src\modules\FirebaseConfig.ts` to `FirebaseConfig.prod.js` and paste the above configuration.


▋Build the app (To /dist)

```
$ npm run build
```

▋Deploy to Firebase

Use Firebase CLI to deploy our application. Before deploying, we need to initialize the metadata by…

```
$ firebase login
$ firebase init
```

The first command will guide you to login a Google account.
The second command will guide you to initialize your application, you can take a look at my previous article: [[Angular] Deploy to Firebase](http://karatejb.blogspot.tw/2017/01/angular2-deploy-to-firebase.html) for more detail.

![](https://3.bp.blogspot.com/-dLNqAMnKqgA/WsajajzboqI/AAAAAAAAF24/hQeBl3fc66YeIMHrqsXDq9T3wehpiP6EgCEwYBhgL/s640/image008.jpg)



Now you can deploy the application to Firebase with this command.

```
$ firebase deploy
```


### Use other firebase project (Optional)

If we are going to manage multiple Firebase project in a single application, use the following command to ADD another Firebase project’s information.

```
$ firebase use --add
```

Check all Firebase projects in this application.

```
$ firebase list
```

Or switch to the other one.

```
$ firebase use {alias name}
```


