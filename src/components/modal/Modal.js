export const MODAL_YES = "MODAL_YES"
export const MODAL_NO = "MODAL_NO"
import {$} from "../../core/dom"

export const modal = (message, callback) => {
  const $el = $.create("div", "modal")

  const html = `
  <div class="modal-wrapper">
    <div class="modal-message">
    ${message}
    </div>
    <div class="buttons">
      <div id="modalbtn-yes" class="modal-button">Yes</div>
      <div id="modalbtn-no" class="modal-button">no</div>
    <div class="buttons">
  </div>
  `
  $el.html(html)

  $el.find("#modalbtn-yes").on("click", () => {
    callback(MODAL_YES)
    $el.remove()
  })
  $el.find("#modalbtn-no").on("click", () => {
    callback(MODAL_NO)
    $el.remove()
  })

  document.querySelector("#app").append($el.$el)
}
