import "./scss/index.scss"
import {Tinote} from "./components/tinote/Tinote"
import {Menu} from "./components/menu/Menu"
import {Toolbar} from "./components/toolbar/Toolbar"
import {Note} from "./components/note/Note";
import {ListOfNotes} from "./components/listOfNotes/ListOfNotes";
import {NoteMenu} from "./components/noteMenu/NoteMenu";
import {rootReducer} from "./redux/rootReducer";
import {createStore} from "./core/createStore";
import {ContextMenu} from "./components/contextMenu/ContextMenu";
import {defaultState} from "./redux/initialState";

import {StateProcessor} from "./core/StateProcessor";
import {IndexedDBClient} from "./clients/IndexedDBClient";

async function init() {
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

  const tinote = new Tinote({
    selector: "#app",
    components: [
      Menu,
      ListOfNotes,
      NoteMenu,
      Toolbar,
      Note,
      ContextMenu
    ],
    store
  })

  tinote.render()
}

init()
