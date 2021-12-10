import ActionTypes from "../constants/ActionTypes";
import { UserType } from "../interfaces/UserInterface";

export const UserState: UserType | null = null;

type UserAction = 
{ type: typeof ActionTypes.LOG_IN_USER, payload: UserType }

// eslint-disable-next-line import/no-anonymous-default-export
export default (user: UserType | null = null, action: UserAction) => {
  switch (action.type) {
    case ActionTypes.LOG_IN_USER: {
      return action.payload;
    }

    default:
      return user;
  }
}

