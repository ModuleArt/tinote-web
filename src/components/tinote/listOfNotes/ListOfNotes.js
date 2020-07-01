import {Component} from "@core/Component";
import {$} from "@core/dom";
import {resize, changeSelectionOfItem} from "@core/utils";
import {createlistOfNotes} from "./listOfNotes.template";
import {
  selectNote,
  changeListSize,
  addNote,
  moveNoteToTrash
} from "../../../redux/actions";
import {initialNote, TRASH_ID} from "../../../constants";
import {modal, MODAL_YES} from "../../modal/Modal";

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
    this.prevCurrentNote = null
    this.firebase = options.firebase
    this.db = this.firebase.firestore()
  }

  init() {
    super.init()
    this.prevCurrentNote = this.store.getState().notes[0].id
    console.log(this.prevCurrentNote)
    this.$on("note-item:delete", data => {
      modal("Are you sure?",
        answer => {
          if (answer === MODAL_YES) {
            this.$dispatch(moveNoteToTrash(data))
          }
        }
      )
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

    case "notes":
      this.$root.html(this.toHTML())
      if (!this.store.getState().notes.length) {
        if (!this.store.getState().currentFolder === TRASH_ID) {
          this.addNote()
        }
      }
      break
    case "currentFolder":
    default:
      this.$root.html(this.toHTML())
    }
  }

  addNote() {
    const id = this.db.collection("notes").doc().id

    this.$dispatch(addNote({
      ...initialNote,
      id: id,
      folder: this.store.getState().currentFolder
    }))

    this.$dispatch(selectNote(id))
    this.$emit("note-item:rename", id)
  }

  onClick(event) {
    const $wrap = $(event.target).closest("[data-type]")

    if ($wrap) {
      if ($wrap.data.type === "note-item") {
        this.$dispatch(selectNote($wrap.data.id))
      } else if ($wrap.data.type === "add-note") {
        this.addNote()
      } else if ($wrap.data.type === "clear-trash") {
        this.$emit("trash:clear")
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
