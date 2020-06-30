import {DOMListener} from "./DOMListener";

export class Component extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.emitter = options.emitter
    this.unsubs = []
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ""
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  init() {
    this.initDOMlisteners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => {
      unsub()
    })
  }
}
