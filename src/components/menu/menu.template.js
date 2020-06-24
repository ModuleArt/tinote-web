function createFoldersList() {
  return `
  <ul class="list-of-folders">
    <li class="folder">
      <span class="material-icons">
        note
      </span>
      All notes
    </li>
    <div class="horizontal-separator">
      
    </div>

    <li class="folder folder-selected">
      <span class="material-icons">
        folder
      </span>
      Folder 1
    </li>
    <li class="folder">
      <span class="material-icons">
        folder
        </span>
      Folder 2
    </li>

    <li class="folder">
      <span class="material-icons">
        folder
        </span>
      Folder 3
    </li>

    <li class="folder">
      <span class="material-icons">
        create_new_folder
        </span>
      New Folder
    </li>

    <div class="horizontal-separator">
      
    </div>

    <li class="folder">
      <span class="material-icons">
        delete
      </span>
      Trash
    </li>
  </ul>
  `
}


export function createMenu() {
  return `
  <div class="wrapper" data-type="wrapper">
  <div class="profile">
    <img src="./profile-img.png" alt="" class="img">
    <div class="name">Jeka Volynko</div>
  </div>

  ${createFoldersList()}

  <div class="settings">
    <span class="material-icons">
      settings
      </span>
      Settings
  </div>

  </div>
  <div class="resize" data-resize="menu"></div>
  `
}
