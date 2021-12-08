import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getAllMessages = (state: RootStateOrAny) => state.messages;

export const getChatMessages = createSelector(
  [getAllMessages],
  (allMessages) => {
    return allMessages
  }
)