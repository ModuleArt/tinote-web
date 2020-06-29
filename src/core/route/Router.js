import {$} from "../dom";

export class Router {
  constructor(options) {
    this.pages = options.pages || []
    this.app = $(options.selector)
  }

  init() {
    window.onhashchange = event => {
      event.preventDefault()
      this.switchRoute()
    }

    this.switchRoute()
  }

  async switchRoute() {
    const hash = location.hash.substr(1);
    let CurrentPage = this.pages.find(Page => Page.route === hash)
    if (!CurrentPage) {
      CurrentPage = this.pages[0]
    }

    const currentPage = new CurrentPage()
    const $root = await currentPage.getRoot()

    this.app.clear().append($root)
  }
}
