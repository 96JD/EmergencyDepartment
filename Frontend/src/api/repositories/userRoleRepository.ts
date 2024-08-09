import { API_URLS, axiosRequest } from "../";
import { UserRole } from "../../models/UserRole";

export interface AllUserRolesResponse {
	allUserRoles: UserRole[];
}

export const userRoleRepository = {
	async fetchAll() {
		return (await axiosRequest(`${API_URLS.USER_ROLE}/fetch-all-user-roles`)) as AllUserRolesResponse;
	}
};
