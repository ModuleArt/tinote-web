import {Wrapper} from "../../../core/Wrappper";
import FolderItems from "./FolderItems/FolderItems"

class Menu extends Wrapper {
  static className = "menu"
  constructor($root, options) {
    super($root, {...options,
      components: [
        FolderItems
      ]
    })
  }
}

export default Menu
