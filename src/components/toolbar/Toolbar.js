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
      subscribe: ["currentNote", "notes"],
      ...options}
    )
    this.$root = $root
  }

  prepare() {
    this.initState(defaultStyles)
  }

  init() {
    super.init()
    const stat = this.store.getState()
    const currentNote = stat.notes.find(note => note.id === stat.currentNote)
    this.setState(currentNote.styles)
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChanged(changes) {
    const stat = this.store.getState()
    const currentNote = stat.notes.find(note => note.id === stat.currentNote)
    this.setState(currentNote.styles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value)
      console.log(value)
      this.$emit("toolbar:changeStyles", value)
    }
  }

  toHTML() {
    return this.template
  }
}
