import {TRASH_ID, ALL_NOTES_ID} from "@/constants"


function createFolder(currentFolder) {
  const currentFold = currentFolder

  return folder => {
    const selected = currentFold === folder.id
      ? "selected"
      : ""

    return `
    <li class="folder ${selected}" 
    data-id="${folder.id}" 
    data-type="folder"
    data-context="folder">

      <span class="material-icons">
        folder
      </span>

      <p>
      ${folder.name}
      </p>

    </li>
    `
  }
}

function createFoldersList(folders, currentFolder) {
  const currentFold = currentFolder
  const foldersHTML = folders.map(createFolder(currentFold)).join("")

  const isTrash = currentFold === TRASH_ID
    ? "folder-selected"
    : ""

  const isAllNotes = currentFold === ALL_NOTES_ID
    ? "folder-selected"
    : ""

  return `
  <ul class="list-of-folders">
    <li class="folder ${isAllNotes}" 
    data-type="folder" data-id="${ALL_NOTES_ID}" >

      <span class="material-icons">
        note
      </span>
      All notes

    </li>

    <li class="folder ${isAllNotes}" 
    data-type="folder" data-id="${ALL_NOTES_ID}" >

      <span class="material-icons">
      folder_open
      </span>
      Without folder

    </li>

    <div class="horizontal-separator"></div>

    ${foldersHTML}

    <li class="folder" data-type="newFolder">

      <span class="material-icons">
        create_new_folder
      </span>
      New Folder

    </li>

    <div class="horizontal-separator"></div>

    <li class="folder ${isTrash}" data-type="folder" 
      data-context="trash" data-id="${TRASH_ID}" >

      <span class="material-icons">
        delete
      </span>
      Trash

    </li>
  </ul>
  `
}

export function createMenu(state) {
  return `
  <div class="wrapper" data-resize='true' style="width:${state.menuSize};">
    <div class="profile">
      <img src="./profile-img.png" alt="" class="img">

      <div data-type="drop-down" class="dropdown name">
        <div data-type="drop-down" class="dropbtn">Denis Shavshin</div>
        <div id="myDropdown" class="dropdown-content">
          <a href="#" data-type="sign-out">Sign out</a>
        </div>
      </div>

    </div>

    ${createFoldersList(state.folders, state.currentFolder)}

    <div class="connect-info">
      <div class="dot-loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
      </div>

    </div>

  </div>
  <div class="resize" data-resize="menu"></div>
  `
}
