import {$} from "../../core/dom";

export class Tinote {
  constructor(selector, components = [], componentOptions) {
    this.$el = $(selector)
    this.components = components || []
    this.componentOptions = componentOptions || []
  }

  getRoot() {
    const $root = $.create("div", "tinote")

    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className)

      const component = new Component($el, this.componentOptions)

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(element => {
      element.init()
    });
  }

  destroy() {
    this.components.forEach(element => {
      element.destroy()
    });
  }
}
