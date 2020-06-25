import {TinoteComponent} from "@core/TinoteComponent";
import {$} from "../../core/dom";
import {resize} from "../../core/utils";
import {createlistOfNotes} from "./listOfNotes.template";
import {selectNote,
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
      subscribe: ["currentFolder", "notes"],
      ...options}
    )
    this.store = options.store
    this.$root = $root
  }

  init() {
    super.init()

    this.$on("note-item:delete", data => {
      console.log("note-item:delete = ", data)
      this.$dispatch(deleteNote(parseInt(data)))
    })
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentFolder") {
      this.$root.html(this.toHTML())
    } else if (Object.keys(changes)[0] === "notes") {
      this.$root.html(this.toHTML())
    }
  }

  // Bug $target is not always a folder
  onClick(event) {
    const $target = $(event.target)
    const $wrap = $target.closest("[data-type]")
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
