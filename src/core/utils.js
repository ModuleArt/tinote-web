export function capitalize(str) {
  if (typeof str !== "string") {
    return ""
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function resize($root, selector) {
  const $wrapper = $root.find(selector)
  const coords = $wrapper.getCoords()
  let delta

  document.onmousemove = e => {
    e.preventDefault()
    delta = e.pageX - coords.left
    $wrapper.css({width: delta+"px"})
  }

  document.onmouseup = e => {
    document.onmouseup = null
    document.onmousemove= null
  }
}
