import { Dispatch } from "@reduxjs/toolkit";

import { userRoleRepository } from "../../api/repositories/userRoleRepository";
import { userRoleActions } from "./actions";

export const userRoleThunks = {
	getAllUserRolesRequest: () => async (dispatch: Dispatch) => {
		const response = await userRoleRepository.fetchAll();
		const allUserRoles = response.allUserRoles;
		dispatch(userRoleActions.getAllUserRoles(allUserRoles));
	},

	setSelectedUserRoleId: (selectedUserRoleId: number) => (dispatch: Dispatch) => {
		dispatch(userRoleActions.setSelectedUserRoleId(selectedUserRoleId));
	}
};
