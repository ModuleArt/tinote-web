import {Wrapper} from "@core/Wrappper";
import NoteItems from "./NoteItems/NoteItems"

class NotesExplorer extends Wrapper {
  static className = "note-explorer"
  constructor($root, options) {
    super($root, {...options,
      components: [
        NoteItems
      ]
    })
  }
}

export default NotesExplorer
