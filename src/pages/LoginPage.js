import {Page} from "../core/route/Page";
import {$} from "../core/dom";

export class LoginPage extends Page {
  static route = "login"

  getRoot() {
    const $root = $.create("div", "modal")
    $root.html(`<form action="" class="form">

    <label for="login">Login:</label>
    <div class="input-wrapper">
      <input id="login" name="login" 
      type="text" class="form-input login" placeholder="Your login..">
      <span class="material-icons">
        perm_identity
      </span>
    </div>
    

    <label for="password">Password:</label>
    <div class="input-wrapper"> 
      <input id="password" name="password"
      type="password" class="form-input password" placeholder="Your password..">
      <span class="material-icons">
        vpn_key
      </span>
    </div>

    <div class="buttons-wrapper">
      <input class="button" type="button" value="Register">
      <input class="button" type="button" value="Login">
    </div>
    
  </form>`)
    return $root
  }
}
