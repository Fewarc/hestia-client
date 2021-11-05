import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getAllAlerts = (state: RootStateOrAny) => state.alerts;

export const getAlerts = createSelector(
  [getAllAlerts],
  (alerts) => {
    return alerts;
  }
)