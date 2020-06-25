import {$} from "../../core/dom";
import {StoreSubscriber} from "./../../core/StoreSubscriber";
import {Emitter} from "./../../core/Emitter";

export class Tinote {
  constructor(options) {
    this.$el = $(options.selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.storeSubscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create("div", "tinote")

    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className)

      const component = new Component($el, {
        store: this.store,
        emitter: this.emitter
      })

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.storeSubscriber.subscribeComponents(this.components)
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
