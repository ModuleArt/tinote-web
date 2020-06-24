import "./scss/index.scss"
import {Tinote} from "./components/tinote/Tinote"
import {Menu} from "./components/menu/Menu"
import {NoteWrapper} from "./components/noteWrapper/NoteWrapper"
import {Toolbar} from "./components/toolbar/Toolbar"
import {Note} from "./components/note/Note";
import {ListOfNotes} from "./components/listOfNotes/ListOfNotes";


console.log("Working!")

const tinote = new Tinote("#app", [
  Menu,
  ListOfNotes,
  NoteWrapper
],
{
  components: [
    Toolbar,
    Note
  ]
})

tinote.render()

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDvc6lij9iMoZ8tDBfLghISPKJtqx_L54U",
  authDomain: "tinote-5fd77.firebaseapp.com",
  databaseURL: "https://tinote-5fd77.firebaseio.com",
  projectId: "tinote-5fd77",
  storageBucket: "tinote-5fd77.appspot.com",
  messagingSenderId: "207256672485",
  appId: "1:207256672485:web:94c7f77f99e19706da9c0c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection("users").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    console.table([doc.data()])
  });
})
