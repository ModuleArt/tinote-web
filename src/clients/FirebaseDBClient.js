import {isDifferenceBetweenArrays} from "../core/utils";

export class FirebaseDBClient {
  constructor(firebase) {
    this.firebase = firebase
    this.db = null

    this.notes = []
    this.folders = []
  }

  init() {
    return new Promise(resolve => {
      this.db = this.firebase.firestore()
      resolve(true)
    })
  }

  save(state) {
    const notesDiff = isDifferenceBetweenArrays(this.notes, state.notes)
    const foldersDiff = isDifferenceBetweenArrays(this.folders, state.folders)

    if (!notesDiff.isDiffer && !foldersDiff.isDiffer) {
      return true
    }


    return new Promise(resolve => {
      const batch = this.db.batch()

      foldersDiff.deleted.forEach(folder => {
        const docRef = this.db.collection("folders").doc(folder.id);
        batch.delete(docRef);
      })

      notesDiff.deleted.forEach(note => {
        const docRef = this.db.collection("notes").doc(note.id);
        batch.delete(docRef);
      })

      foldersDiff.updated.forEach(folder => {
        const docRef = this.db.collection("folders").doc(folder.id)
        batch.set(docRef, {
          name: folder.name,
        })
      })
      notesDiff.updated.forEach(note => {
        const docRef = this.db.collection("notes").doc(note.id)
        batch.set(docRef, {
          title: note.title,
          content: note.content,
          styles: note.styles,
          folder: note.folder
        })
      })

      batch.commit().then(() => {
        resolve(true)
      });
    })
  }

  getAll(collection) {
    return new Promise(resolve => {
      this.db.collection(collection).get().then(querySnapshot => {
        const docs = []
        querySnapshot.forEach(doc => {
          docs.push({id: doc.id, ...doc.data()})
        });
        resolve(docs)
      })
    })
  }

  async get() {
    return new Promise(resolve => {
      this.getAll("notes")
        .then(resolve1 => {
          const notes = resolve1
          this.getAll("folders")
            .then(resolve2 => {
              this.notes = notes
              this.folders = resolve2
              resolve({folders: resolve2, notes: notes})
            })
        }
        )
    })
  }
}
