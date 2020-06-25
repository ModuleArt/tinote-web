import {SELECT_FOLDER,
  SELECT_NOTE,
  CHANGE_MENU_SIZE,
  CHANGE_LIST_SIZE,
  DELETE_FOLDER,
  DELETE_NOTE,
  RENAME_NOTE,
  ADD_NOTE,
  ADD_FOLDER,
  RENAME_FOLDER
} from "./types"

export function rootReducer(state, action) {
  console.log("rootReducer : ", action)
  switch (action.type) {
  case SELECT_NOTE:
    return {...state, currentNote: action.data}

  case DELETE_NOTE:
    return {...state, notes: state.notes.filter(n => n.id !== action.data)}

  case ADD_NOTE:
    return {...state, notes: state.notes.concat(action.data)}

  case RENAME_NOTE:
    return {...state, notes: state.notes.map(n => {
      return n.id === action.data.id
        ? {...n, title: action.data.title}
        : n
    })}


  case SELECT_FOLDER:
    return {...state, currentFolder: action.data}

  case DELETE_FOLDER:
    return {...state, folders: state.folders.filter(f => f.id !== action.data)}

  case ADD_FOLDER:
    return {...state, folders: state.folders.concat(action.data)}

  case RENAME_FOLDER:
    return {...state, folders: state.folders.map(f => {
      return f.id === action.data.id
        ? {...f, name: action.data.name}
        : f
    })}


  case CHANGE_MENU_SIZE:
    return {...state, menuSize: action.data}

  case CHANGE_LIST_SIZE:
    return {...state, listOfNotesSize: action.data}

  case "__INIT__":
  default: return state
  }
}
