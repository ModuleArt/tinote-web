import {SELECT_FOLDER,
  SELECT_NOTE,
  CHANGE_MENU_SIZE,
  CHANGE_LIST_SIZE,
  DELETE_FOLDER,
  DELETE_NOTE,
  RENAME_FOLDER,
  RENAME_NOTE,
  ADD_NOTE,
  ADD_FOLDER,
  CHANGE_TEXT,
  CHANGE_STYLES,
  UPDATE_FROM_CLOUD,
  DELETE_ALL_NOTES_IN_FOLDER,
  MOVE_NOTE_TO_TRASH
} from "./types"

export function selectFolder(data) {
  return {
    type: SELECT_FOLDER,
    data
  }
}

export function addFolder(data) {
  return {
    type: ADD_FOLDER,
    data
  }
}

export function deleteFolder(data) {
  return {
    type: DELETE_FOLDER,
    data
  }
}

export function renameFolder(data) {
  return {
    type: RENAME_FOLDER,
    data
  }
}

export function selectNote(data) {
  return {
    type: SELECT_NOTE,
    data
  }
}

export function addNote(data) {
  return {
    type: ADD_NOTE,
    data
  }
}

export function deleteNote(data) {
  return {
    type: DELETE_NOTE,
    data
  }
}

export function moveNoteToTrash(data) {
  return {
    type: MOVE_NOTE_TO_TRASH,
    data
  }
}


export function renameNote(data) {
  return {
    type: RENAME_NOTE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function changeMenuSize(data) {
  return {
    type: CHANGE_MENU_SIZE,
    data
  }
}

export function changeListSize(data) {
  return {
    type: CHANGE_LIST_SIZE,
    data
  }
}

export function updateFromCloud(data) {
  return {
    type: UPDATE_FROM_CLOUD,
    data
  }
}

export function deleteAllNotesInFolder(data) {
  return {
    type: DELETE_ALL_NOTES_IN_FOLDER,
    data
  }
}
