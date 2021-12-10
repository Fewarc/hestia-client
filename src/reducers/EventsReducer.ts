import ActionTypes from "../constants/ActionTypes";

export const EventsState: Event[] = [];

type EventAction = { type: string, payload: Event[] }

// eslint-disable-next-line import/no-anonymous-default-export
export default (events: Event[] = EventsState, action: EventAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_EVENTS: {
      return [ ...action.payload ]
    }

    default:
      return events
  }
}