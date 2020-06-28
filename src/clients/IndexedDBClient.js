export class IndexedDBClient {
  constructor() {}

  init() {
    return new Promise(resolve => {
      const openRequest = indexedDB.open("store", 1);
      this.db = null
      openRequest.onupgradeneeded = () => {
        this.db = openRequest.result
        let a
        let b
        switch (this.db.version) { // существующая (старая) версия базы данных
        case 0:
          console.log("dolbaeb")
          a = this.db.createObjectStore("notes", {keyPath: "id"})
          b = this.db.createObjectStore("folders", {keyPath: "id"})
          console.log(a)
          console.log(b)
          break
          // версия 0 означает, что на клиенте нет базы данных
          // выполнить инициализацию
        case 1:
          a = this.db.createObjectStore("notes", {keyPath: "id"})
          b = this.db.createObjectStore("folders", {keyPath: "id"})
          break
        default:
          console.error("version of index db = ", this.db.version)
            // на клиенте версия базы данных 1
            // обновить
        }
      };

      openRequest.onerror = () => {
        console.error("Error", openRequest.error)
      };

      openRequest.onsuccess = () => {
        this.db = openRequest.result
        console.log("INDEXDB IS RUNNING")
        resolve("yep")
        // продолжить работу с базой данных, используя объект db
      }
    })
  }

  save(state) {
    const prom = new Promise(resolve => {
      console.log(this.db)
      const tx = this.db.transaction(["folders", "notes"], "readwrite")

      state.folders.forEach(folder => {
        // let request = tx.objectStore("folders").put(folder);
        tx.objectStore("folders").put(folder);
      })

      state.notes.forEach(note => {
        // let request = tx.objectStore("folders").put(folder);
        tx.objectStore("notes").put(note);
      })

      tx.oncomplete = function(event) {
        resolve("yep")
      }
    })
    console.log(prom)
    return prom
  }
  get() {
    return new Promise(resolve => {
      const tx = this.db.transaction(["folders", "notes"], "readonly")


      const folders = tx.objectStore("folders").getAll()
      const notes = tx.objectStore("notes").getAll()

      tx.oncomplete = function(event) {
        resolve({folders: folders.result, notes: notes.result})
      }
    })
  }
}
