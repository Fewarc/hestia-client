import ActionTypes from "../constants/ActionTypes";
import { UserType } from "../interfaces/UserInterface";

export const userLogIn = (user: UserType) => {
  try {
    return { type: ActionTypes.LOG_IN_USER, payload: user }
  } catch (error) {
    console.error(error);
  }
}

export const userLogOut = () => {
  try {
    return { type: ActionTypes.LOG_OUT_USER, payload: null }
  } catch (error) {
    console.error(error);
  }
}

export const updateUser = (user: UserType) => {
  try {
    return { type: ActionTypes.UPDATE_USER, payload: user }
  } catch (error) {
    console.error(error);
  }
}