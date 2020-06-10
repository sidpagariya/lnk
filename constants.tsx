import * as firebase from 'firebase/app'
import 'firebase/firestore'

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export const frb = firebase.app()
export const linksRef = db.collection('links')
