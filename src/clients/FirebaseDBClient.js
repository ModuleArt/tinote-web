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


export class FirebaseDBClient {
  constructor() {}

  init() {
    return new Promise(resolve => {
      firebase.initializeApp(firebaseConfig);

      this.db = firebase.firestore();
      resolve()
    })
  }

  save(state) {
    return new Promise(resolve => {
    })
  }
  get() {
    return new Promise(resolve => {
      let folders
      this.db.collection("folders").get().then(querySnapshot => {
        folders = querySnapshot.map(doc => {
          return doc.data()
        });
      })
      let notes
      this.db.collection("notes").get().then(querySnapshot => {
        notes = querySnapshot.map(doc => {
          return doc.data()
        });
      })

      resolve({folders: folders, notes: notes})
    })
  }
}
