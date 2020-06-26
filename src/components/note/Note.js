import {TinoteComponent} from "@core/TinoteComponent";
import {$} from "../../core/dom";
import {changeText} from "../../redux/actions";

export class Note extends TinoteComponent {
  static className = "note-note"

  constructor($root, options) {
    super($root, {
      name: "Note",
      listeners: ["input"],
      subscribe: ["currentNote"],
      ...options}
    )
    this.$root = $root
  }

  init() {
    super.init()
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentNote") {
      this.$root.html(this.toHTML())
    }
  }

  onInput(event) {
    const $target = $(event.target)
    if ($target.data) {
      if ($target.data.type === "note-content") {
        this.$dispatch(changeText({
          id: this.store.getState().currentNote,
          content: $target.html()
        }))
      }
    }
  }

  toHTML() {
    const state = this.store.getState()
    const note = state.notes.filter(n => n.id === state.currentNote)[0]
    return `
    <div data-type="note-content" contenteditable>
      ${note.content}
    </div>
    `
  }
}
