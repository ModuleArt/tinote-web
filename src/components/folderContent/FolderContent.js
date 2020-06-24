import {TinoteComponent} from "@core/TinoteComponent";

export class FolderContent extends TinoteComponent {
  static className = "tinote__folder-content"

  constructor($root, options) {
    super($root, {
      name: "FolderContent",
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
    <div class="toolbar">
      <div class="folder-name">
        All Notes
      </div>
      <div class="number-of-notes">
        1488 Notes
      </div>
    </div>

    <ul class="list-of-notes">

      <li class="note-item note-item-selected">
        <div class="text-data-wrapper">
          <div class="title">
            Нот тайтл 1
          </div>
          <div class="text">
            Симлп текст для для нота бла бла бла
          </div>
          <div class="date">
            1 min ago
          </div>
        </div>
        
        <img src="./note-item-img.png" alt="" class="img">
      </li>

      <li class="note-item note-item-selected">
        <div class="text-data-wrapper">
          <div class="title">
            Нот тайтл 1
          </div>
          <div class="text">
            Симлп текст для для нота бла бла бла
          </div>
          <div class="date">
            1 min ago
          </div>
        </div>
        <img src="./note-item-img.png" alt="" class="img">
      </li>

      <li class="note-item note-item-selected">
        <div class="text-data-wrapper">
          <div class="title">
            Нот тайтл 1
          </div>
          <div class="text">
            Симлп текст для для нота бла бла бла
          </div>
          <div class="date">
            1 min ago
          </div>
        </div>
        <img src="./note-item-img.png" alt="" class="img">
      </li>

    </ul>
    `
  }
}
