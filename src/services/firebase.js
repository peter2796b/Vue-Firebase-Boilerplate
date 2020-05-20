import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FCM_API_KEY,
  authDomain: process.env.VUE_APP_FCM_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FCM_DATABASE_URL,
  projectId: process.env.VUE_APP_FCM_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET_ID,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_APP_ID,
  measurementId: process.env.VUE_APP_FIRE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
