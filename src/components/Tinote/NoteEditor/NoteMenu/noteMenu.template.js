export function createNoteMenu(state) {
  let note = state.notes.find(n => n.id === state.currentNote)
  if (!note) note = state.notes[0]
  return `
  <div class="wrapper" data-type="wrapper">
    <div class="name-of-note" 
    data-type="note-title">${note ? note.title : ""}</div>
    <div class="note-buttons">

      <div class="button" data-type="info">
        <span class="material-icons">
          info
        </span>
      </div>

      <div class="vertical-separator"></div>

      <div class="button" data-type="delete">
        <span class="material-icons">
          delete
        </span>
      </div>
      
    </div>
  </div>
  `
}
