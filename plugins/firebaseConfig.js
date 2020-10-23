import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyAtObhF0L6gG_XD3JAWiDeu5Eze23C3YZo',
  //   authDomain: 'project-lab10.firebaseapp.com',
  //   databaseURL: 'https://project-lab10.firebaseio.com',
  //   projectId: 'project-lab10',
  //   storageBucket: 'project-lab10.appspot.com',
  //   messagingSenderId: '231203868001',
  //   appId: '1:231203868001:web:a48f8d05a255bb7ffc0920',
  //   measurementId: 'G-39DRJ21GE1'
  // }
  const firebaseConfig = {
    apiKey: 'AIzaSyADeqZxgp1ncqeGq_U294Wzq32t50dR6Nk',
    authDomain: 'project-beauty-clinic-42b8e.firebaseapp.com',
    databaseURL: 'https://project-beauty-clinic-42b8e.firebaseio.com',
    projectId: 'project-beauty-clinic-42b8e',
    storageBucket: 'project-beauty-clinic-42b8e.appspot.com',
    messagingSenderId: '1086883009781',
    appId: '1:1086883009781:web:7c6e1ff88a54e3344ce1bc',
    measurementId: 'G-DJQL3BRY52'
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
