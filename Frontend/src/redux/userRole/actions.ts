import { UserRole } from "../../models/UserRole";

export const USER_ROLE_ACTIONS_TYPES = {
	GET_ALL_USER_ROLES: "GET_ALL_USER_ROLES",
	SET_SELECTED_USER_ROLE_ID: "SET_SELECTED_USER_ROLE_ID"
};

export const userRoleActions = {
	getAllUserRoles: (allUserRoles: UserRole[]) => ({
		type: USER_ROLE_ACTIONS_TYPES.GET_ALL_USER_ROLES,
		payload: { allUserRoles }
	}),

	setSelectedUserRoleId: (selectedUserRoleId: number) => ({
		type: USER_ROLE_ACTIONS_TYPES.SET_SELECTED_USER_ROLE_ID,
		payload: { selectedUserRoleId }
	})
};
