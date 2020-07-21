function toButton({active, icon, value}) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(value)}'
  `

  return `
  <div ${meta} class="button ${active ? "selected" : ""}">
      <span ${meta} class="material-icons">
        ${icon}
      </span>
  </div>
  `
}


export function createToolbar(state) {
  const buttons = [
    {
      icon: "format_bold",
      active: state["fontWeight"] === "bold",
      value: {fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"}
    },
    {
      icon: "format_underline",
      active: state["textDecoration"] === "underline",
      value: {textDecoration: state["textDecoration"] === "underline"
        ? "none"
        : "underline"}
    },
    {
      icon: "format_italic",
      active: state["fontStyle"] === "italic",
      value: {fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic"}
    },
    {
      icon: "format_align_left",
      active: state["textAlign"] === "left",
      value: {textAlign: "left"}
    },
    {
      icon: "format_align_center",
      active: state["textAlign"] === "center",
      value: {textAlign: "center"}
    },
    {
      icon: "format_align_right",
      active: state["textAlign"] === "right",
      value: {textAlign: "right"}
    }
  ]

  const htmlButtons = buttons.map(toButton).join("")
  return `
  <div class="wrapper" data-type="wrapper">
    ${htmlButtons}
  </div>
  `
}
