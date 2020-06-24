import {$} from "../../core/dom";

export class NoteWrapper {
  static className = "tinote__note-wrapper"

  constructor(selector, {components}) {
    this.$el = $(selector)
    this.components = components

    this.$el.append(this.getRoot())
  }

  toHTML() {
    const html = this.components.map(c => {
      return c.toHTML()
    }).join("")

    return html
  }

  init() {
    this.components.forEach(element => {
      element.init()
    });
  }

  getRoot() {
    const $root = $.create("div", "tinote__note-wrapper")

    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className)

      const component = new Component($el, this.componentOptions)

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  destroy() {
    this.components.forEach(element => {
      element.destroy()
    });
  }
}

