import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getUser = (state: RootStateOrAny) => state.user;

export const getUsername = createSelector(
  [getUser],
  (user) => {
    return user && user.login;
  }
);

export const isUserLoggedIn = createSelector(
  [getUser],
  (user) => {
    return !!user;
  }
);

export const getUserNavbarData = createSelector(
  [getUser],
  (user) => {
    return { userId: user?.id, username: user?.login }
  }
);