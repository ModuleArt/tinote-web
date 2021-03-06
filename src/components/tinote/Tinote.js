import {$} from "@core/dom";
import {StoreSubscriber} from "@core/StoreSubscriber";
import {Emitter} from "@core/Emitter";

export class Tinote {
  constructor(options) {
    this.$root = null
    this.components = options.components || []
    this.store = options.store
    this.firebase = options.firebase
    this.emitter = new Emitter()
    this.storeSubscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create("div", "tinote")

    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className)
      console.log(Component)
      const component = new Component($el, {
        store: this.store,
        emitter: this.emitter,
        firebase: this.firebase,
        storeSubscriber: this.storeSubscriber
      })

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$root = this.getRoot()
    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach(element => {
      element.init()
    });

    return this.$root
  }

  destroy() {
    this.components.forEach(element => {
      element.destroy()
    });

    this.storeSubscriber.unsubscribeComponents()
  }
}
