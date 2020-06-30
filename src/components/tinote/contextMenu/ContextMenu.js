import {Component} from "@core/Component";
import {$} from "@core/dom";
import {createContextMenu} from "./contextMenu.template";

export class ContextMenu extends Component {
  static className = "context-menu"

  constructor($root, options) {
    super($root, {
      name: "ContextMenu",
      listeners: [],
      subscribe: [],
      ...options}
    )

    this.$root = $root
    this.menuOptions = null
    this.menuVisible = false

    this.folderOptions = [
      {
        event: "folder:delete",
        buttonName: "Delete"
      },
      {
        event: "folder:rename",
        buttonName: "Rename"
      }
    ]
    this.noteItemOptions = [
      {
        event: "note-item:delete",
        buttonName: "Delete"
      },
      {
        event: "note-item:rename",
        buttonName: "Rename"
      }
    ]
  }

  init() {
    super.init()

    this.onContextmenu = this.onContextmenu.bind(this)
    document.oncontextmenu = this.onContextmenu

    document.addEventListener("click", event => {
      if (this.menuVisible) this.toggleMenu("hide")
    })
  }

  toggleMenu(command) {
    this.$root.css({display: command === "show" ? "block" : "none"})
    this.menuVisible = !this.menuVisible
  }

  onContextmenu(event) {
    event.preventDefault()
    const $wrap = $(event.target).closest("[data-context]")

    if ($wrap && $wrap.data.context) {
      const options = $wrap.data.context === "folder"
        ? this.folderOptions
        : this.noteItemOptions

      this.$root.html(createContextMenu(options))

      const menuOptions = this.$root.findAll(".context-menu-option")
      menuOptions.forEach(op => {
        op.addEventListener("click", e => {
          this.$emit(op.dataset.event, $wrap.data.id)
        })
      })

      this.$root.css({left: `${event.pageX}px`, top: `${event.pageY}px`})
      this.toggleMenu("show")
    } else {
      this.toggleMenu("hide")
    }
    return false
  }

  toHTML() {
    return createContextMenu()
  }
}
