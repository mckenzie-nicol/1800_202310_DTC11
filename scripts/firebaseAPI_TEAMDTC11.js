var firebaseConfig = {
    apiKey: "AIzaSyDuvS2zfi_gouMbwLhPha37IrNzzbcIZ_o",
    authDomain: "slipsafe-24a29.firebaseapp.com",
    projectId: "slipsafe-24a29",
    storageBucket: "slipsafe-24a29.appspot.com",
    messagingSenderId: "767674881993",
    appId: "1:767674881993:web:5c84ed377c22293594fa18"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();