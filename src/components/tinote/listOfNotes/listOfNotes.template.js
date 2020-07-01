import {ALL_NOTES_ID, TRASH_ID} from "../../../constants"

function toNote(currentNote) {
  return note => {
    const selected = currentNote === note.id ? "selected" : ""
    return `
    <li class="note-item ${selected}" 
    data-id="${note.id}" 
    data-type="note-item"
    data-context="note">

        <div class="text-data-wrapper">
          <div class="title">
            ${note.title}
          </div>
          <div class="text">
            ${note.content.substring(0, 50) + "..."}
          </div>
          <div class="date">
            1 min ago
          </div>
        </div>
      </li>
    `
  }
}

export function createlistOfNotes(state) {
  const currentFolder = state.currentFolder
  const currentNote = state.currentNote

  const notesData = currentFolder !== ALL_NOTES_ID
    ? state.notes.filter(n => n.folder === currentFolder)
    : state.notes.filter(n => n.folder !== TRASH_ID)

  const notes = notesData.map(toNote(currentNote)).join("")

  const buttonType = currentFolder === TRASH_ID ? "clear-trash" : "add-note"
  const buttonIcon = currentFolder === TRASH_ID ? "delete_forever" : "post_add"
  return `
  <div class="wrapper"
    data-resize='true'
    style="width:${state.listOfNotesSize};">

    <div class="toolbar">

      <div class="input-wrapper">
        <input type="text" class="search">
        <span class="material-icons">
          search
        </span>
      </div>

      <div class="button" data-type="${buttonType}">
        <span class="material-icons">
         ${buttonIcon}
        </span>
      </div>

    </div>

    <ul class="list-of-notes">
      ${notes}  
    </ul>
  
  </div>
  <div class="resize" data-resize="listOfNotes"></div>
  `
}
