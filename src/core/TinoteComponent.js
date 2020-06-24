import {DOMListener} from "./DOMListener";

export class TinoteComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ""
  }

  init() {
    this.initDOMlisteners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
