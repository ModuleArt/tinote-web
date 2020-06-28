import {isDifferenceBetweenArrays} from "../core/utils"

const DB_VERSION = 3

export class IndexedDBClient {
  constructor() {
    this.db = null
    this.version = DB_VERSION

    this.folders = []
    this.notes = []
  }

  deleteAllObjectStores(db) {
    db.objectStoreNames.forEach(name => {
      if (typeof name === "string") {
        db.deleteObjectStore(name)
      }
    })
    return true
  }

  initObjectStores(db) {
    db.createObjectStore("notes", {keyPath: "id"})
    db.createObjectStore("folders", {keyPath: "id"})
  }

  init() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("store", this.version)

      openRequest.onupgradeneeded = event => {
        const db = event.target.result

        switch (event.target.result.version) {
        case 0:
          console.log("No IndexedDB was found.")
          console.log("Initialization new IndexedDB...")
          this.initObjectStores(db)
          console.log("Initialization was successful...")

          break
        case this.version:
          console.log("IndexedDB was found but it needs updating.")
          this.deleteAllObjectStores(db)
          console.log("Initialization new IndexedDB...")
          this.initObjectStores(db)
          console.log("Initialization was successful...")

          break
        default:
          console.error("Catch error during initialization of IndexedDB")
          console.error("Version of index db = ", db.version)
        }
      };

      openRequest.onerror = () => {
        console.error("Error", openRequest.error)
        reject(openRequest.error)
      };

      openRequest.onsuccess = () => {
        this.db = openRequest.result
        console.log("IndexedDB is running...")
        resolve(true)
      }
    })
  }

  save(state) {
    const notesDiff = isDifferenceBetweenArrays(this.notes, state.notes)
    const foldersDiff = isDifferenceBetweenArrays(this.folders, state.folders)

    if (!notesDiff.isDiffer && !foldersDiff.isDiffer) {
      return true
    }

    const prom = new Promise(resolve => {
      console.log("Start transaction to update data...")
      const tx = this.db.transaction(["folders", "notes"], "readwrite")

      foldersDiff.deleted.forEach(folder => {
        tx.objectStore("folders").delete(folder.id);
      })

      notesDiff.deleted.forEach(note => {
        tx.objectStore("notes").delete(note.id);
      })

      foldersDiff.updated.forEach(folder => {
        tx.objectStore("folders").put(folder);
      })

      notesDiff.updated.forEach(note => {
        tx.objectStore("notes").put(note);
      })

      tx.oncomplete = function(event) {
        console.log("Transaction is successful...")
        resolve(true)
      }
    })
    return prom
  }

  get() {
    return new Promise(resolve => {
      const tx = this.db.transaction(["folders", "notes"], "readonly")

      const folders = tx.objectStore("folders").getAll()
      const notes = tx.objectStore("notes").getAll()

      tx.oncomplete = event => {
        this.folders = folders.result
        this.notes = notes.result

        resolve({folders: folders.result, notes: notes.result})
      }
    })
  }
}
