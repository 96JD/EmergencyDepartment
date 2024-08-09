import { RootState } from "../store";

export const userRoleSelectors = {
	loadingAllUserRoles: (state: RootState) => state.userRoleReducer.loadingAllUserRoles,
	allUserRoles: (state: RootState) => state.userRoleReducer.allUserRoles,
	selectedUserRoleId: (state: RootState) => state.userRoleReducer.selectedUserRoleId
};
