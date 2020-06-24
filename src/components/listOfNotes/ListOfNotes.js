import {TinoteComponent} from "@core/TinoteComponent";
import {$} from "../../core/dom";
import {resize} from "../../core/utils";

export class ListOfNotes extends TinoteComponent {
  static className = "tinote__list-of-notes"

  constructor($root, options) {
    super($root, {
      name: "ListOfNotes",
      listeners: ["mousedown"],
      ...options}
    )
    this.$root = $root
  }

  init() {
    super.init()
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize === "listOfNotes") {
      resize(this.$root, "[data-type='wrapper']")
    }
  }

  toHTML() {
    return `
    <div class="wrapper" data-type='wrapper'>
    <div class="toolbar">

      <div class="input-wrapper">
        <input type="text" class="search">
        <span class="material-icons">
          search
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
          post_add
        </span>
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
      </li>

    </ul>
    
    </div>
    <div class="resize" data-resize="listOfNotes"></div>
    `
  }
}
