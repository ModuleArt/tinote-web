import "./scss/index.scss"
import {Router} from "./core/route/Router"
import {LoginPage} from "./pages/LoginPage"
import {TinotePage} from "./pages/TinotePage"

const router = new Router({
  selector: "#app",
  pages: [
    LoginPage,
    TinotePage
  ]})

router.init()
