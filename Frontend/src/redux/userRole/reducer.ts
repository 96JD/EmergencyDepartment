import { UnknownAction } from "redux";

import { AllUserRolesResponse } from "../../api/repositories/userRoleRepository";
import { USER_ROLES_CONSTANTS, UserRole } from "../../models/UserRole";
import { USER_ROLE_ACTIONS_TYPES } from "./actions";

export interface UserRoleInitialState {
	loadingAllUserRoles: boolean;
	allUserRoles: UserRole[];
	selectedUserRoleId: number;
}

const userRoleInitialState: UserRoleInitialState = {
	loadingAllUserRoles: true,
	allUserRoles: [],
	selectedUserRoleId: USER_ROLES_CONSTANTS.NURSE
};

export const userRoleReducer = (state = userRoleInitialState, action: UnknownAction) => {
	switch (action.type) {
		case USER_ROLE_ACTIONS_TYPES.GET_ALL_USER_ROLES:
			return {
				...state,
				loadingAllUserRoles: false,
				allUserRoles: (action.payload as AllUserRolesResponse).allUserRoles
			};

		case USER_ROLE_ACTIONS_TYPES.SET_SELECTED_USER_ROLE_ID:
			return {
				...state,
				selectedUserRoleId: (action.payload as { selectedUserRoleId: number }).selectedUserRoleId
			};

		default:
			return state;
	}
};
