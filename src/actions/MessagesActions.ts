import ActionTypes from "../constants/ActionTypes";
import { Message } from "../types/MessageType";

export const updateMessages = (messages: Message[]) => {
  return { type: ActionTypes.UPDATE_MESSAGES, payload: messages };
}