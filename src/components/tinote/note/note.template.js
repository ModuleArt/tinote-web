import {camelCaseToDash} from "@core/utils"

export function createNote(state) {
  let note = state.notes.find(n => n.id === state.currentNote)
  if (!note) note = state.notes[0]

  const styles = JSON.parse(JSON.stringify(note.styles))

  const htmlStyles = Object.keys(styles).map(key => {
    return `${camelCaseToDash(key)} : ${styles[key]}`
  }).join(";")

  return `
  <div style="${htmlStyles};" data-type="note-content" contenteditable>
    ${note.content}
  </div>
  `
}
