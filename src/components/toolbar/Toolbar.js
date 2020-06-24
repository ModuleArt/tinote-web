import {TinoteComponent} from "@core/TinoteComponent";

export class Toolbar extends TinoteComponent {
  static className = "--"

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
    <div class="menu">
      <div class="name-of-note">Note 1</div>
      <div class="note-buttons">
        <div class="button">
          <span class="material-icons">
            info
          </span>
        </div>
        <div class="button">
          <span class="material-icons">
            info
          </span>
        </div>

        <div class="vertical-separator">

        </div>

        <div class="button">
          <span class="material-icons">
            delete
          </span>
        </div>
      </div>
    </div>

    <div class="toolbar">
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
