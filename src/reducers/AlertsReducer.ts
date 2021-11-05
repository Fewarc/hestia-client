import ActionTypes from "../constants/ActionTypes";
import { AlertsTypes } from "../interfaces/Alerts";

export const AlertsState: AlertsTypes[] = [];

const initialState: AlertsTypes[] = []

type AlertAction = 
{ type: typeof ActionTypes.PUSH_ALERT, payload: AlertsTypes } |
{ type: typeof ActionTypes.REMOVE_ALERT, payload: AlertsTypes } |
{ type: typeof ActionTypes.CLEAR_ALL_ALERTS, payload: null }

// eslint-disable-next-line import/no-anonymous-default-export
export default (alerts: AlertsTypes[] = initialState, action: AlertAction) => {
  switch (action.type) {
    case ActionTypes.PUSH_ALERT: {
if(alerts.some(alert => alert.message === action.payload?.message)) return [ ...alerts ]
      else return [ ...alerts, action.payload ];
    }

    case ActionTypes.REMOVE_ALERT: {
      return [ ...alerts.filter(alert => alert !== action.payload) ]
    }

    case ActionTypes.CLEAR_ALL_ALERTS: {
      return [];
    }

    default:
      return alerts;
  }
}