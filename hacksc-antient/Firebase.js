import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyA9-yk6n965ESvvgiN3YDIBjO9zqP7qo1o",
  authDomain: "hacksc-44d94.firebaseapp.com",
  databaseURL: "https://hacksc-44d94.firebaseio.com",
  projectId: "hacksc-44d94",
  storageBucket: "",
  messagingSenderId: "589213859485"
};

firebase.initializeApp(config);

export default firebase;