import {TinoteComponent} from "@core/TinoteComponent";

export class Menu extends TinoteComponent {
  static className = "tinote__menu"

  constructor($root, options) {
    super($root, {
      name: "Menu",
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
    <div class="profile">
      <img src="./profile-img.png" alt="" class="img">
      <div class="name">Jeka Volynko</div>
    </div>

    <div class="input-wrapper">
      <input type="text" class="search">
      <span class="material-icons">
        search
      </span>
    </div>
    

    <div class="button">
      <span class="material-icons">
        add_circle
      </span>
      New Note
    </div>

    <ul class="list-of-folders">
      <li class="folder">
        <span class="material-icons">
          stars
        </span>
        Shortcuts
      </li>
      <li class="folder folder-selected">
        <span class="material-icons">
          note
        </span>
        All notes
      </li>
      <li class="folder">
        <span class="material-icons">
          book
        </span>
        Notebook
      </li>
      <li class="folder">
        <span class="material-icons">
          delete
        </span>
        Trash
      </li>
    </ul>
    `
  }
}
