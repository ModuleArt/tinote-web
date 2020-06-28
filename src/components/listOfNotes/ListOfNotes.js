import {TinoteComponent} from "@core/TinoteComponent";
import {$} from "../../core/dom";
import {resize, changeSelectionOfItem} from "../../core/utils";
import {createlistOfNotes} from "./listOfNotes.template";
import {
  selectNote,
  changeListSize,
  deleteNote,
  addNote
} from "../../redux/actions";
import {initialNote} from "../../../constants";

export class ListOfNotes extends TinoteComponent {
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
  }

  init() {
    super.init()
    this.prevCurrentNote = this.store.getState().currentNote

    this.$on("note-item:delete", data => {
      this.$dispatch(deleteNote(parseInt(data)))
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
        this.$dispatch(selectNote(parseInt($wrap.data.id)))
      } else if ($wrap.data.type === "add-note") {
        const id = Math.max(...this.store.getState().notes.map(n => n.id)) + 1

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
