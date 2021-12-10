import ActionTypes from "../constants/ActionTypes";
import { Note } from "../types/NoteType";

export const NotesState: Note[] = [];

type NoteAction = { type: string, payload: Note[] }

// eslint-disable-next-line import/no-anonymous-default-export
export default (notes: Note[] = NotesState, action: NoteAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTES: {
      return [ ...action.payload ];
    }
    default: 
      return notes;
  }
}