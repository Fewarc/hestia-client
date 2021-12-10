import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getAllEvents = (state: RootStateOrAny) => state.events;


export const getUserEvents = createSelector(
  [getAllEvents],
  (allEvents) => {
    return allEvents;
  }
);