importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDIffJd1bHcorSXkUr9KGhupYp2rYEqUF0",
  authDomain: "pwa-push-test1.firebaseapp.com",
  projectId: "pwa-push-test1",
  storageBucket: "pwa-push-test1.firebasestorage.app",
  messagingSenderId: "333066203235",
  appId: "1:333066203235:web:5974b18f7ca3bd99ef4856"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || '通知';
  const options = {
    body: payload?.notification?.body || 'メッセージを受信しました',
    icon: './icon-192.png',
    data: payload?.data || {}
  };

  self.registration.showNotification(title, options);
});
