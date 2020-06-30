import {$} from "../dom";
import loader from "../../components/loader/loader"
export class Router {
  constructor(options) {
    this.pages = options.pages || []
    this.app = $(options.selector)
    this.firebase = options.firebase

    this.currentPage = null
  }

  init() {
    window.onhashchange = event => {
      event.preventDefault()
      this.switchRoute()
    }

    this.switchRoute()
  }

  isUserLogged() {
    return new Promise(resolve => {
      this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setTimeout(() => resolve(user), 1000)
          console.log("User is signed in")
        } else {
          resolve(null)
          console.log("No user is signed in")
        }
      })
    })
  }

  async switchRoute() {
    console.log(loader())
    this.app.clear().append(loader())

    const auth = await this.isUserLogged()
    if (auth) {
      window.location.hash = "tinote"
    } else {
      window.location.hash = "login"
    }

    const hash = location.hash.substr(1);
    const CurrentPage = this.pages.find(Page => Page.route === hash)
    if (!CurrentPage) {
      return
    }
    if (this.currentPage) {
      this.currentPage.destroy()
    }
    this.currentPage = new CurrentPage({firebase: this.firebase})
    const $root = await this.currentPage.getRoot()

    this.app.clear().append($root)
  }
}
