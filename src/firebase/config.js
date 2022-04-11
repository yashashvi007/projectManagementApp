import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB7tFfQIZc2l2Zkv6EKyZk7qviiTvpRrig",
    authDomain: "project-management-923ca.firebaseapp.com",
    projectId: "project-management-923ca",
    storageBucket: "project-management-923ca.appspot.com",
    messagingSenderId: "958143842061",
    appId: "1:958143842061:web:aaa362181c01f07ee3d244"
  };

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp
const projectStorage = firebase.storage()

export {projectAuth , projectFirestore , timestamp , projectStorage}

