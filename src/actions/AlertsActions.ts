import ActionTypes from "../constants/ActionTypes";
import { AlertsTypes } from "../interfaces/AlertsInterface";

export const pushAlert = (alert: AlertsTypes) => {
  try {
    return { type: ActionTypes.PUSH_ALERT, payload: alert };
  } catch (error) {
    console.error(error);
  }
}

export const removeAlert = (alert: AlertsTypes) => {
  try {
    return { type: ActionTypes.REMOVE_ALERT, payload: alert };
  } catch (error) {
    console.error(error);
  }
}

export const clearAllAlerts = () => {
  return { type: ActionTypes.CLEAR_ALL_ALERTS, payload: null };
}

export const clearErrorAlerts = () => {
  return { type: ActionTypes.CLEAR_ALL_ERRORS, payload: null }
}

export const clearWarningAlerts = () => {
  return { type: ActionTypes.CLEAR_ALL_WARNINGS, payload: null }
}

export const clearInfoAlerts = () => {
  return { type: ActionTypes.CLEAR_ALL_INFOS, payload: null }
}