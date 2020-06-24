import {capitalize} from "./utils";

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No root provided for DOMListener")
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMlisteners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener)
      if (!this[methodName]) {
        const componentName = this.name || ""
        throw new Error(`Method "${methodName}" is not implemented in 
        "${componentName}" Component`)
      }

      this[methodName] = this[methodName].bind(this)
      this.$root.on(listener, this[methodName])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      this.$root.off(listener, this[getMethodName(listener)])
    })
  }
}

function getMethodName(name) {
  return "on" + capitalize(name)
}
