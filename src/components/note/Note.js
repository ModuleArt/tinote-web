import {TinoteComponent} from "@core/TinoteComponent";

export class Note extends TinoteComponent {
  static className = "note"

  constructor($root, options) {
    super($root, {
      name: "Note",
      listeners: [],
      ...options}
    )
    this.$root = $root
  }

  init() {
    super.init()
  }

  toHTML() {
    return `
    <div class="note" contenteditable>
            Simple content
    </div>
    `
  }
}
