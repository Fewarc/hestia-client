import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getAllNotes = (state: RootStateOrAny) => state.notes;

export const getUserNotes = createSelector(
  [getAllNotes],
  allNotes => {
    return allNotes;
  }
);