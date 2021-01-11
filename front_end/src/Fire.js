import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCw1pRYGsH-ls0l3N8aFqR2o-HH69840Yo",
  authDomain: "wandel-d24c4.firebaseapp.com",
  databaseURL: "https://wandel-d24c4.firebaseio.com",
  projectId: "wandel-d24c4",
  storageBucket: "wandel-d24c4.appspot.com",
  messagingSenderId: "653112356731",
  appId: "1:653112356731:web:3c7099f7c5a757a82017de",
  measurementId: "G-76PW0WBC2V"
}

const fire = firebase.initializeApp(firebaseConfig)
firebase.analytics()
export default fire
