import {$} from "@core/dom"
import {getLoginForm} from "./login.templeate";

export class Login {
  constructor(options) {
    this.$root = $.create("div", "modal")
    this.firebase = options.firebase

    this.init()
  }

  init() {
    this.$root.html(getLoginForm())

    const regBtn = this.$root.find("#register-button")
    const logBtn = this.$root.find("#login-button")

    this.registerButtonHandler = this.registerButtonHandler.bind(this)
    this.loginButtonHandler = this.loginButtonHandler.bind(this)

    regBtn.on("click", this.registerButtonHandler);
    logBtn.on("click", this.loginButtonHandler);
  }

  registerButtonHandler(event) {
    const email = this.$root.find("#login").$el.value
    const pass = this.$root.find("#password").$el.value
    this.firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error.code)
        console.error(error.message)
      })
      .then(() => {
        window.location.hash = "tinote"
      })
    this.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.hash = "tinote"
      } else {
        // No user is signed in.
      }
    });
  }

  loginButtonHandler(event) {
    const email = this.$root.find("#login").$el.value
    const pass = this.$root.find("#password").$el.value
    this.firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error.code)
        console.error(error.message)
      })
      .then(() => {
        window.location.hash = "tinote"
      })
    this.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("ebaaaaaaaaaaaaaa")
        window.location.hash = "tinote"
      } else {
        // No user is signed in.
      }
    });
  }

  getRoot() {
    return this.$root
  }
}
