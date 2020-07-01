import {ALL_NOTES_ID, TRASH_ID} from "../../../constants"

function toNote(currentNote) {
  return note => {
    const selected = currentNote === note.id ? "selected" : ""
    return `
    <li class="note-item ${selected}" 
    data-id="${note.id}" 
    data-type="note-item"
    data-context="note-item">

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

  const buttonInactive = currentFolder === TRASH_ID ? "inactive" : "add-note"
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

      <div class="button" data-type="${buttonInactive}">
        <span class="material-icons">
          post_add
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