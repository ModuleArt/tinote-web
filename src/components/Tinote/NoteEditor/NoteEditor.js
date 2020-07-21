import {Wrapper} from "../../../core/Wrappper";
import NoteMenu from "./noteMenu/NoteMenu"
import Toolbar from "./toolbar/Toolbar"
import Note from "./note/Note"

class NoteEditor extends Wrapper {
  static className = "note-editor"
  constructor($root, options) {
    super($root, {...options,
      components: [
        NoteMenu,
        Toolbar,
        Note
      ]
    })
  }
}

export default NoteEditor
