import {TRASH_ID} from "./../../constants"
import {DEFAULT_LIST_WIDTH, DEFAULT_MENU_WIDTH} from "./../../constants"

export const defaultState = {
  menuSize: DEFAULT_MENU_WIDTH,
  listOfNotesSize: DEFAULT_LIST_WIDTH,
  currentFolder: 1,
  currentNote: 1,
  notes: [
    {
      id: 1,
      title: "Note 1",
      content: "Note 1 simple text",
      folder: 1,
      styles: {
        textAlign: "left",
        fontWeight: "bold",
        textDecoration: "underline",
        fontStyle: "italic"
      }
    },
    {
      id: 2,
      title: "Note 2",
      content: `Note 2 simple  very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very
      very very very very very very very very very very very large text`,
      folder: 1,
      styles: {
        textAlign: "center",
        fontWeight: "normal",
        textDecoration: "underline",
        fontStyle: "normal"
      }
    },
    {
      id: 3,
      title: "Note 3",
      content: "Note 3 simple text",
      folder: 2,
      styles: {
        textAlign: "right",
        fontWeight: "normal",
        textDecoration: "none",
        fontStyle: "italic"
      }
    },
    {
      id: 4,
      title: "Note 4",
      content: "Note 4 simple text",
      folder: TRASH_ID
    },
    {
      id: 5,
      title: "Note 5",
      content: "Note 5 simple text",
      folder: TRASH_ID
    }
  ],
  folders: [
    {
      id: 1,
      name: "Folder 1"
    },
    {
      id: 2,
      name: "Folder 2"
    },
    {
      id: 3,
      name: "Folder 3"
    }
  ]
}

