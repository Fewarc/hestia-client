import ActionTypes from "../constants/ActionTypes";
import { UserType } from "../interfaces/User";

export const userLogIn = (user: UserType) => {
  try {
    return { type: ActionTypes.LOG_IN_USER, payload: user }
  } catch (error) {
    console.error(error);
  }
}