import _ from "lodash";
import { createSelector } from "reselect";

import { User } from "../../models/User";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { RootState } from "../store";

export const userSelectors = {
	loggedInUser: (state: RootState) => state.userReducer.loggedInUser,
	loadingAllUsers: (state: RootState) => state.userReducer.loadingAllUsers,
	allUsers: (state: RootState) => state.userReducer.allUsers,
	allNurses: createSelector(
		(state: RootState) => state.userReducer.allUsers,
		(allUsers: User[]) => _.filter(allUsers, (user: User) => user.userRoleId !== USER_ROLES_CONSTANTS.PATIENT)
	),
	selectedUser: (state: RootState): User => state.userReducer.selectedUser
};
