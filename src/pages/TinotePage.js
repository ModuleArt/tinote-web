import {Page} from "../core/route/Page"
import {defaultState} from "../redux/initialState"
import {IndexedDBClient} from "../clients/IndexedDBClient"
import {StateProcessor} from "../core/StateProcessor"
import {createStore} from "../core/createStore"
import {rootReducer} from "../redux/rootReducer"
import {Tinote} from "../components/Tinote/Tinote"
import Menu from "../components/Tinote/Menu/Menu"

import {ContextMenu} from "../components/UI/ContextMenu/ContextMenu"
import {FirebaseDBClient} from "../clients/FirebaseDBClient"
import NoteEditor from "../components/Tinote/NoteEditor/NoteEditor"
import NotesExplorer from "../components/Tinote/NotesExplorer/NotesExplorer"

export class TinotePage extends Page {
  static route = "tinote"

  constructor(options) {
    super()

    this.firebase = options.firebase
    this.tinote = null
  }

  async getRoot() {
    const state = defaultState
    const db = new IndexedDBClient()
    await db.init()
    const IDBProcessor = new StateProcessor(db, 5000)

    const firedb = new FirebaseDBClient(this.firebase)
    await firedb.init()
    const FireProcessor = new StateProcessor(firedb, 5000)

    const result = await FireProcessor.get()
    // const result = await IDBProcessor.get()

    let notes = []
    let folders = []

    if (result) {
      if (result.notes.length === 0) {
        notes = defaultState.notes
      } else {
        notes = result.notes
      }
      if (result.folders.length === 0) {
        folders = defaultState.folders
      } else {
        folders = result.folders
      }
    }

    const store = createStore(rootReducer,
      {...state,
        notes: notes,
        folders: folders,
        currentFolder: folders[0].id,
        currentNote: notes[0].id})

    store.subscribe(IDBProcessor.listen)
    store.subscribe(FireProcessor.listen)
    // const store = createStore(rootReducer, defaultState)

    this.tinote = new Tinote({
      components: [
        Menu,
        NotesExplorer,
        NoteEditor,
        ContextMenu
      ],
      store,
      firebase: this.firebase
    })

    return this.tinote.render()
  }

  destroy() {
    this.tinote.destroy()
  }
}
