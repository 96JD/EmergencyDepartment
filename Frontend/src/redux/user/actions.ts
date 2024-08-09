import { User } from "../../models/User";

export const USER_ACTIONS_TYPES = {
	LOGIN_USER: "LOGIN_USER",
	LOGOUT_USER: "LOGOUT_USER",
	GET_ALL_USERS: "GET_ALL_USERS",
	GET_SELECTED_USER: "GET_SELECTED_USER",
	CREATE_USER: "CREATE_USER",
	UPDATE_USER: "UPDATE_USER"
};

export const userActions = {
	loginUser: () => ({
		type: USER_ACTIONS_TYPES.LOGIN_USER,
		payload: {}
	}),

	logoutUser: () => ({
		type: USER_ACTIONS_TYPES.LOGOUT_USER,
		payload: {}
	}),

	getAllUsers: (allUsers: User[]) => ({
		type: USER_ACTIONS_TYPES.GET_ALL_USERS,
		payload: { allUsers }
	}),

	getSelectedUser: (selectedUser: User) => ({
		type: USER_ACTIONS_TYPES.GET_SELECTED_USER,
		payload: { selectedUser }
	}),

	createUser: (createdUser: User) => ({
		type: USER_ACTIONS_TYPES.CREATE_USER,
		payload: { createdUser }
	}),

	updateUser: (updatedUser: User) => ({
		type: USER_ACTIONS_TYPES.UPDATE_USER,
		payload: { updatedUser }
	})
};
