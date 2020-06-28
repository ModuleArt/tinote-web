import {TinoteComponent} from "@core/TinoteComponent";
import {$} from "../../core/dom";
import {changeText, changeStyles} from "../../redux/actions";
import {camelCaseToDash} from "../../core/utils";

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

    this.$on("toolbar:changeStyles", value => {
      this.$dispatch(changeStyles({styles: value,
        id: this.store.getState().currentNote}))
      this.$root.html(this.toHTML())
    })
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
    const note = state.notes.find(n => n.id === state.currentNote)

    const styles = JSON.parse(JSON.stringify(note.styles))

    const htmlStyles = Object.keys(styles).map(key => {
      return `${camelCaseToDash(key)} : ${styles[key]}`
    }).join(";")

    return `
    <div style="${htmlStyles};" data-type="note-content" contenteditable>
      ${note.content}
    </div>
    `
  }
}
