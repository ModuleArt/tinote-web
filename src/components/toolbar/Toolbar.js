import {TinoteStateComponent} from "@core/TinoteStateComponent";
import {defaultStyles} from "../../../constants";
import {createToolbar} from "./toolbar.template";
import {$} from "../../core/dom";

export class Toolbar extends TinoteStateComponent {
  static className = "note-toolbar"

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentNote"],
      ...options}
    )
    this.$root = $root
  }

  prepare() {
    this.initState(defaultStyles)
  }

  init() {
    super.init()

    this.refreshState()
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentNote") {
      this.refreshState()
    }
  }

  refreshState() {
    const state = this.store.getState()
    const currentNote = state.notes.find(note => note.id === state.currentNote)
    this.setState(currentNote.styles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value)

      this.$emit("toolbar:changeStyles", value)
    }
  }

  toHTML() {
    return this.template
  }
}
