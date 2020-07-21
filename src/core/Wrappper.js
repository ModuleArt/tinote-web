import {$} from "./dom"

export class Wrapper {
  constructor($el, options) {
    console.log(options)
    this.$root = $el
    this.components = options.components || []
    this.store = options.store
    this.firebase = options.firebase
    this.emitter = options.emitter
    this.storeSubscriber = options.storeSubscriber
  }

  getRoot() {
    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className)

      const component = new Component($el, {
        store: this.store,
        emitter: this.emitter,
        firebase: this.firebase
      })

      $el.html(component.toHTML())
      this.$root.append($el)

      return component
    })
  }

  init() {
    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach(element => {
      element.init()
    });
  }

  toHTML() {
    this.getRoot()
    return this.$root
  }

  destroy() {
    this.components.forEach(element => {
      element.destroy()
    });

    this.storeSubscriber.unsubscribeComponents()
  }
}
