import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyCh_ddCIxFPRHmFrPTIsIxfQKxoArU6aqw',
  authDomain: 'sidp-lnk.firebaseapp.com',
  databaseURL: 'https://sidp-lnk.firebaseio.com',
  projectId: 'sidp-lnk',
  storageBucket: 'sidp-lnk.appspot.com',
  messagingSenderId: '391510486952',
  appId: '1:391510486952:web:2b59d3af961f2ce9a0379d',
  measurementId: 'G-BZFY47DLZ9',
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection links
const linksCollection = db.collection('links')

// collection users
const usersCollection = db.collection('users')

// export utils/refs
export { db, auth, linksCollection, usersCollection }
