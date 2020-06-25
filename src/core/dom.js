class DOM {
  constructor(selector) {
    this.$el = typeof selector === "string"
      ? document.querySelector(selector)
      : selector
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() {
    return this.$el.dataset
  }

  css(styles = {}) {
    Object.getOwnPropertyNames(styles).forEach(el => {
      this.$el.style[el] = styles[el]
    })
  }

  closest(selector) {
    if (this.$el.closest(selector)) {
      return $(this.$el.closest(selector))
    }
    return null
  }

  children() {
    return this.$el.children
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  focus() {
    this.$el.focus()
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  }
}

export function $($el) {
  if ($el instanceof DOM) {
    return $el
  }
  return new DOM($el)
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
