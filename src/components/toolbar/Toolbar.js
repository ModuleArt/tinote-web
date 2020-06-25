import {TinoteComponent} from "@core/TinoteComponent";

export class Toolbar extends TinoteComponent {
  static className = "note-toolbar"

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
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
    <div class="wrapper" data-type="wrapper">
      <div class="button button-selected">
        <span class="material-icons">
          format_bold
        </span>

      </div>
      <div class="button">
        <span class="material-icons">
          format_italic
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
          format_underlined
        </span>
      </div>
    </div>
    `
  }
}
