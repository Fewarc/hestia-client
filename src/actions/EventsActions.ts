import ActionTypes from "../constants/ActionTypes"

export const updateEvents = (events: Event[]) => {
  return { type: ActionTypes.UPDATE_EVENTS, payload: events }
}