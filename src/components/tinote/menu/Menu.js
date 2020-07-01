import {Component} from "@core/Component";
import {createMenu} from "./menu.template";
import {$} from "@core/dom";
import {resize, changeSelectionOfItem} from "@core/utils";
import {selectFolder,
  changeMenuSize,
  deleteFolder,
  renameFolder,
  addFolder,
  deleteAllNotesInFolder
} from "./../../../redux/actions";
import {initialFolder} from "@/constants";
import {modal, MODAL_YES} from "../../modal/Modal";
import {TRASH_ID} from "../../../constants";

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
    this.prevCurrentFolder = null
    this.db = this.firebase.firestore()
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === "currentFolder") {
      changeSelectionOfItem(this.$root,
        this.prevCurrentFolder,
        changes.currentFolder
      )
      this.prevCurrentFolder = changes.currentFolder
    } else if (Object.keys(changes)[0] === "folders") {
      this.$root.html(this.toHTML())
      if (!this.store.getState().folders.length) {
        this.createFolder()
      }
    }
  }

  init() {
    super.init()

    this.prevCurrentFolder = this.store.getState().folders[0].id

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
      this.rename(data)
    })

    this.$on("folder:delete", data => {
      modal("This action will delete all notes in the folder",
        answer => {
          if (answer === MODAL_YES) {
            this.$dispatch(deleteAllNotesInFolder(data))
            this.$dispatch(deleteFolder(data))
          }
        }
      )
    })

    this.$on("trash:clear", () => {
      modal("Are you sure?",
        answer => {
          if (answer === MODAL_YES) {
            this.$dispatch(deleteAllNotesInFolder(TRASH_ID))
          }
        }
      )
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
        id: id,
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

  createFolder() {
    const id = this.db.collection("folders").doc().id

    this.$dispatch(addFolder({
      ...initialFolder,
      id: id
    }))

    this.$dispatch(selectFolder(id))

    this.rename(id)
  }

  onClick(event) {
    const $target = $(event.target)
    const $wrap = $target.closest("[data-type]")
    if ($wrap) {
      switch ($wrap.data.type) {
      case ("folder"):
        this.$dispatch(selectFolder($wrap.data.id))
        break

      case ("newFolder"):
        this.createFolder()
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
