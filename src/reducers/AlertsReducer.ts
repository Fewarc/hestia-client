import { AnyAction } from "redux";
import ActionTypes from "../constants/ActionTypes";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.PUSH_ALERT: {
      return
    }

    default:
      return state;
  }
}