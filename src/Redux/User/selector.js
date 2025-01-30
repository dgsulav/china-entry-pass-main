import { createSelector } from "reselect";

const selectUsers = (state) => state.user.users;
export const selectActiveUser = createSelector(selectUsers, (users) =>
  users.map((user) => user.active === true)
);
