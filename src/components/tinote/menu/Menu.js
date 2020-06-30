import {Component} from "@core/Component";
import {createMenu} from "./menu.template";
import {$} from "@core/dom";
import {resize, changeSelectionOfItem} from "@core/utils";
import {selectFolder,
  changeMenuSize,
  deleteFolder,
  renameFolder,
  addFolder
} from "./../../../redux/actions";
import {initialFolder} from "@/constants";

export class Menu extends Component {
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
    this.firebase = options.firebase
    this.prevCurrentFolder = -1
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentFolder") {
      changeSelectionOfItem(this.$root,
        this.prevCurrentFolder,
        changes.currentFolder
      )
      this.prevCurrentFolder = changes.currentFolder
    } else {
      this.$root.html(this.toHTML())
    }
  }

  init() {
    super.init()

    this.prevCurrentFolder = this.store.getState().currentFolder

    window.onclick = function(event) {
      if (!event.target.matches(".dropbtn")) {
        const dropdowns = document.getElementsByClassName("dropdown-content")
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    }


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

  signOut() {
    this.firebase.auth().signOut()
    window.location.hash = "login"
  }

  onClick(event) {
    const $target = $(event.target)
    const $wrap = $target.closest("[data-type]")

    if ($wrap) {
      let id

      switch ($wrap.data.type) {
      case ("folder"):
        this.$dispatch(selectFolder(parseInt($wrap.data.id)))
        break

      case ("newFolder"):
        id = Math.max(...this.store.getState().folders
          .map(f => f.id)) + 1

        this.$dispatch(addFolder({
          ...initialFolder,
          id: id
        }))

        this.$dispatch(selectFolder(id))

        this.rename(id)
        break

      case ("drop-down"):
        this.$root.find("#myDropdown").toggleClass("show")
        break

      case ("sign-out"):
        this.signOut()
        break
      default:
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
