importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCFcxRaSNr0TKg-OGkFEx6Jq7eyd39nibk",
  authDomain: "cynex-e1583.firebaseapp.com",
  projectId: "cynex-e1583",
  storageBucket: "cynex-e1583.firebasestorage.app",
  messagingSenderId: "461755187718",
  appId: "1:461755187718:web:78c60da82684bf7ef87987",
  measurementId: "G-REESGS9P91"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/banner-img.png', // sizning logong
    sound: '/sounds/notification.mp3' // ovoz
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});