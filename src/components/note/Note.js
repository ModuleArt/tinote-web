import {TinoteComponent} from "@core/TinoteComponent";

export class Note extends TinoteComponent {
  static className = "note-note"

  constructor($root, options) {
    super($root, {
      name: "Note",
      listeners: [],
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

  toHTML() {
    const state = this.store.getState()
    const note = state.notes.filter(n => n.id === state.currentNote)[0]
    return `
    <div contenteditable>
      ${note.content}
    </div>
    `
  }
}
