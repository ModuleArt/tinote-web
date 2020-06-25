export function createContextMenu(options = []) {
  const opItems = options.map(op => {
    return `<li class="context-menu-option"
    data-event="${op.event}">${op.buttonName}</li>`
  }).join("")

  return `
  <ul class="context-menu-options">
    ${opItems}
  </ul>
  `
}
