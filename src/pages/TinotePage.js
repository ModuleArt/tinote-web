import {Page} from "../core/route/Page"
import {defaultState} from "../redux/initialState"
import {IndexedDBClient} from "../clients/IndexedDBClient"
import {StateProcessor} from "../core/StateProcessor"
import {createStore} from "../core/createStore"
import {rootReducer} from "../redux/rootReducer"
import {Tinote} from "../components/tinote/Tinote"
import {Menu} from "../components/tinote/menu/Menu"
import {ListOfNotes} from "../components/tinote/listOfNotes/ListOfNotes"
import {Note} from "../components/tinote/note/Note"
import {NoteMenu} from "../components/tinote/noteMenu/NoteMenu"
import {Toolbar} from "../components/tinote/toolbar/Toolbar"
import {ContextMenu} from "../components/tinote/contextMenu/ContextMenu"

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
    const processor = new StateProcessor(db, 5000)

    const result = await processor.get()
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
      {...state, notes: notes, folders: folders})

    store.subscribe(processor.listen)
    // const store = createStore(rootReducer, defaultState)

    this.tinote = new Tinote({
      components: [
        Menu,
        ListOfNotes,
        NoteMenu,
        Toolbar,
        Note,
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
