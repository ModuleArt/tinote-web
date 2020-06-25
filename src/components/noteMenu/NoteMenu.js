import {TinoteComponent} from "@core/TinoteComponent";
import {createNoteMenu} from "./noteMenu.template";
import {renameNote} from "../../redux/actions";

export class NoteMenu extends TinoteComponent {
  static className = "note-menu"

  constructor($root, options) {
    super($root, {
      name: "NoteMenu",
      listeners: [],
      subscribe: ["currentNote"],
      ...options}
    )
    this.$root = $root
    this.store = options.store
  }

  init() {
    super.init()

    this.$on("note-item:rename", data => {
      this.rename(data)
      console.log("note-item:rename = ", data)
    })
  }

  rename(id) {
    const noteTitle = this.$root.find("[data-type='note-title']")
    noteTitle.attr("contenteditable", "true")

    noteTitle.focus()
    window.getSelection().selectAllChildren(noteTitle.$el)

    const fn = e => {
      noteTitle.$el.onblur = null
      noteTitle.$el.onkeydown = null
      noteTitle.attr("contenteditable", "false")
      this.$dispatch(renameNote({
        id: parseInt(id),
        title: noteTitle.html()
      }))
    }

    noteTitle.$el.onkeydown = e => {
      // 13 = ENTER
      if (e.keyCode == 13) fn(e)
    }
    noteTitle.$el.onblur = fn
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentNote") {
      this.$root.html(this.toHTML())
    }
  }

  toHTML() {
    return createNoteMenu(this.store.getState())
  }
}
