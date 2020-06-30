import {Page} from "../core/route/Page";
import {Login} from "../components/login/Login";

export class LoginPage extends Page {
  static route = "login"

  constructor(options) {
    super()
    this.firebase = options.firebase
    this.login = new Login({firebase: this.firebase})
  }

  getRoot() {
    return this.login.getRoot()
  }
}
