import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC79FbUb2jCEr53TVfKKcFMH6KJNPlAER4",
    authDomain: "nofomodao-6a703.firebaseapp.com",
    projectId: "nofomodao-6a703",
    storageBucket: "nofomodao-6a703.appspot.com",
    messagingSenderId: "309531714680",
    appId: "1:309531714680:web:2737dfcb6a03b1954e798d",
    measurementId: "G-S33WJCQX0G"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);