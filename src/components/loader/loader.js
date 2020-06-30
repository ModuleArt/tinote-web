const {$} = require("../../core/dom")

const loader = () => {
  const $root = $.create("div", "loader")
  $root.html(`
    <div class="item-1"></div>
    <div class="item-2"></div>
    <div class="item-3"></div>
    <div class="item-4"></div>
    <div class="item-5"></div>
  `)
  return $root
}

export default loader
