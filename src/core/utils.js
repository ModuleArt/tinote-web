export function capitalize(str) {
  if (typeof str !== "string") {
    return ""
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function resize($root, selector, dispatcher) {
  const $wrapper = $root.find(selector)
  const coords = $wrapper.getCoords()
  let delta
  const coord = Math.round(coords.left)

  document.onmousemove = e => {
    e.preventDefault()
    delta = e.pageX - coord
    $wrapper.css({width: delta+"px"})
  }

  document.onmouseup = e => {
    document.onmouseup = null
    document.onmousemove= null

    if (dispatcher) {
      dispatcher(delta)
    }
  }
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function debounce(fn, time) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, time)
  }
}

export function camelCaseToDash(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}
