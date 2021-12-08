import ActionTypes from "../constants/ActionTypes";
import { Message } from "../types/MessageType";

export const MessageState: Message[] = [];

type MessageAction = { type: typeof ActionTypes.UPDATE_MESSAGES, payload: Message[] }

// eslint-disable-next-line import/no-anonymous-default-export
export default (messages: Message[] = MessageState, action: MessageAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_MESSAGES: {
      return [ ...action.payload ]
    }

    default: 
      return messages;
  }
}