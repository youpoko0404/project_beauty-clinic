import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAtObhF0L6gG_XD3JAWiDeu5Eze23C3YZo',
    authDomain: 'project-lab10.firebaseapp.com',
    databaseURL: 'https://project-lab10.firebaseio.com',
    projectId: 'project-lab10',
    storageBucket: 'project-lab10.appspot.com',
    messagingSenderId: '231203868001',
    appId: '1:231203868001:web:a48f8d05a255bb7ffc0920',
    measurementId: 'G-39DRJ21GE1'
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
