import { ApolloError } from "@apollo/client";
import { Dispatch } from "redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";

export const handleError = (error: ApolloError | undefined, dispatch: Dispatch<any>) => {
  if(error) {
    dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(error).message
    }));
    console.log(JSON.stringify(error, null, 2));
  }
}