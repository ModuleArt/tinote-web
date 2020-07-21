import {Component} from "@core/Component";
import {$} from "@core/dom";
import {changeText, changeStyles} from "@/redux/actions";
import {createNote} from "./note.template";

class Note extends Component {
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
    return createNote(this.store.getState())
  }
}

export default Note
