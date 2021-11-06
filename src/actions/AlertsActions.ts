import ActionTypes from "../constants/ActionTypes";
import { AlertsTypes } from "../interfaces/Alerts";

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
  try {
    return { type: ActionTypes.CLEAR_ALL_ALERTS, payload: null };
  } catch (error) {
    console.error(error);
  }
}

export const clearErrorAlerts = () => {
  try {
    return { type: ActionTypes.CLEAR_ALL_ERRORS, payload: null }
  } catch (error) {
    console.error(error);
  }
}

export const clearWarningAlerts = () => {
  try {
    return { type: ActionTypes.CLEAR_ALL_WARNINGS, payload: null }
  } catch (error) {
    console.error(error);
  }
}

export const clearInfoAlerts = () => {
  try {
    return { type: ActionTypes.CLEAR_ALL_INFOS, payload: null }
  } catch (error) {
    console.error(error);
  }
}