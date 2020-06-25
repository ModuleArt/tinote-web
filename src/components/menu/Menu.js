import {TinoteComponent} from "@core/TinoteComponent";
import {createMenu} from "./menu.template";
import {$} from "../../core/dom";
import {resize} from "../../core/utils";
import {selectFolder,
  changeMenuSize,
  deleteFolder,
  renameFolder,
  addFolder
} from "./../../redux/actions";
import {initialFolder} from "../../../constants";

export class Menu extends TinoteComponent {
  static className = "tinote__menu"

  constructor($root, options) {
    super($root, {
      name: "Menu",
      listeners: ["mousedown", "click"],
      subscribe: ["folders", "currentFolder"],
      ...options}
    )
    this.$root = $root
    this.store = options.store
  }

  storeChanged(changes) {
    this.$root.html(this.toHTML())
  }

  init() {
    super.init()

    this.$on("folder:rename", data => {
      console.log("folder:rename = ", data)
      this.rename(data)
    })

    this.$on("folder:delete", data => {
      this.$dispatch(deleteFolder(parseInt(data)))
      console.log("folder:delete = ", data)
    })
  }

  rename(id) {
    const folderName = this.getFolder(id).children()[1]
    folderName.setAttribute("contenteditable", "true")

    folderName.focus()
    window.getSelection().selectAllChildren(folderName)

    const fn = e => {
      folderName.onblur = null
      folderName.onkeydown = null
      folderName.setAttribute("contenteditable", "false")
      this.$dispatch(renameFolder({
        id: parseInt(id),
        name: folderName.innerHTML
      }))
    }

    folderName.onkeydown = e => {
      // 13 = ENTER
      if (e.keyCode == 13) fn(e)
    }
    folderName.onblur = fn
  }

  getFolder(id) {
    return this.$root.find(`[data-id="${id}"]`)
  }

  onClick(event) {
    const $target = $(event.target)
    const $wrap = $target.closest("[data-type]")

    if ($wrap) {
      if ($wrap.data.type === "folder") {
        this.$dispatch(selectFolder(parseInt($wrap.data.id)))
      } else if ($wrap.data.type === "newFolder") {
        const id = Math.max(...this.store.getState().folders.map(f => f.id)) + 1

        this.$dispatch(addFolder({
          ...initialFolder,
          id: id
        }))

        this.rename(id)
      }
    }
  }

  onMousedown(event) {
    const $target = $(event.target)

    if ($target.data.resize === "menu") {
      const fn = size => {
        this.$dispatch(changeMenuSize(size))
      }

      resize(this.$root, "[data-resize='true']", fn)
    }
  }

  toHTML() {
    const state = this.store.getState()
    return createMenu(state)
  }
}
