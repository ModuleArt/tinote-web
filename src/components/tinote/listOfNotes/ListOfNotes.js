import {Component} from "@core/Component";
import {$} from "@core/dom";
import {resize, changeSelectionOfItem} from "@core/utils";
import {createlistOfNotes} from "./listOfNotes.template";
import {
  selectNote,
  changeListSize,
  deleteNote,
  addNote
} from "../../../redux/actions";
import {initialNote} from "../../../constants";

export class ListOfNotes extends Component {
  static className = "tinote__list-of-notes"

  constructor($root, options) {
    super($root, {
      name: "ListOfNotes",
      listeners: ["mousedown", "click"],
      subscribe: ["currentFolder", "notes", "currentNote"],
      ...options}
    )
    this.store = options.store
    this.$root = $root
    this.prevCurrentNote = -1
    this.firebase = options.firebase
    this.db = this.firebase.firestore()
  }

  init() {
    super.init()
    this.prevCurrentNote = this.store.getState().currentNote

    this.$on("note-item:delete", data => {
      this.$dispatch(deleteNote(data))
    })
  }

  storeChanged(changes) {
    switch (Object.keys(changes)[0]) {
    case "currentNote":
      changeSelectionOfItem(this.$root,
        this.prevCurrentNote,
        changes.currentNote
      )
      this.prevCurrentNote = changes.currentNote
      break

    case "currentFolder":
    case "notes":
    default:
      this.$root.html(this.toHTML())
    }
  }

  onClick(event) {
    const $wrap = $(event.target).closest("[data-type]")

    if ($wrap) {
      if ($wrap.data.type === "note-item") {
        this.$dispatch(selectNote($wrap.data.id))
      } else if ($wrap.data.type === "add-note") {
        const id = this.db.collection("notes").doc().id

        this.$dispatch(addNote({
          ...initialNote,
          id: id,
          folder: this.store.getState().currentFolder
        }))

        this.$dispatch(selectNote(id))
        this.$emit("note-item:rename", id)
      }
    }
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize === "listOfNotes") {
      const fn = size => {
        this.$dispatch(changeListSize(size))
      }
      resize(this.$root, "[data-resize='true']", fn)
    }
  }

  toHTML() {
    return createlistOfNotes(this.store.getState())
  }
}
