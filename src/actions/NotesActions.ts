import ActionTypes from "../constants/ActionTypes"
import { Note } from "../types/NoteType";

export const updateNotes = (notes: Note[]) => {
  return { type: ActionTypes.UPDATE_NOTES, payload: notes };
}