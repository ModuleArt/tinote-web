import {TinoteComponent} from "@core/TinoteComponent";
import {createMenu} from "./menu.template";
import {$} from "../../core/dom";
import {resize} from "../../core/utils";

export class Menu extends TinoteComponent {
  static className = "tinote__menu"

  constructor($root, options) {
    super($root, {
      name: "Menu",
      listeners: ["mousedown"],
      ...options}
    )
    this.$root = $root
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize === "menu") {
      resize(this.$root, "[data-type='wrapper']")
    }
  }

  init() {
    super.init()
  }

  toHTML() {
    return createMenu()
  }
}
