import "./scss/index.scss"
import {Tinote} from "./components/tinote/Tinote"
import {Menu} from "./components/menu/Menu"
import {Toolbar} from "./components/toolbar/Toolbar"
import {Note} from "./components/note/Note";
import {ListOfNotes} from "./components/listOfNotes/ListOfNotes";
import {NoteMenu} from "./components/noteMenu/NoteMenu";
import {defaultState} from "./redux/initialState";
import {rootReducer} from "./redux/rootReducer";
import {createStore} from "./core/createStore";
import {ContextMenu} from "./components/contextMenu/ContextMenu";

const state = defaultState
const store = createStore(rootReducer, state)

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
