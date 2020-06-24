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
