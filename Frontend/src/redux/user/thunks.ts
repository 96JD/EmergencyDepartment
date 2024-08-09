import { Dispatch } from "@reduxjs/toolkit";

import { userRepository } from "../../api/repositories/userRepository";
import { APP_LOCAL_STORAGE } from "../../AppLocalStorage";
import { AppToaster } from "../../AppToaster";
import { LoginCredentials, User } from "../../models/User";
import { userActions } from "./actions";

export const userThunks = {
	loginUserRequest: (loginCredentials: LoginCredentials) => async (dispatch: Dispatch) => {
		const response = await userRepository.login(loginCredentials);
		const jwt = response.jwt;
		const loggedInUser = response.loggedInUser;
		localStorage.setItem(APP_LOCAL_STORAGE.JWT, jwt);
		localStorage.setItem(APP_LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify(loggedInUser));
		AppToaster.success("Logged In Successfully.");
		dispatch(userActions.loginUser());
		return Promise.resolve(loggedInUser);
	},

	logoutUserRequest: () => async (dispatch: Dispatch) => {
		const response = await userRepository.logout();
		const loggedOut = response.loggedOut;
		if (loggedOut) {
			localStorage.removeItem(APP_LOCAL_STORAGE.JWT);
			localStorage.removeItem(APP_LOCAL_STORAGE.LOGGED_IN_USER);
			AppToaster.success("Logged out Successfully.");
			dispatch(userActions.logoutUser());
			return Promise.resolve(loggedOut);
		}
	},

	getAllUsersRequest: () => async (dispatch: Dispatch) => {
		const response = await userRepository.fetchAll();
		const allUsers = response.allUsers;
		dispatch(userActions.getAllUsers(allUsers));
	},

	getSelectedUserRequest: (id: number) => async (dispatch: Dispatch) => {
		const response = await userRepository.fetchSingleByKey(id);
		const selectedUser = response.selectedUser;
		dispatch(userActions.getSelectedUser(selectedUser));
	},

	createUserRequest: (user: User) => async (dispatch: Dispatch) => {
		const response = await userRepository.create(user);
		const createdUser = response.createdUser;
		dispatch(userActions.createUser(createdUser));
		AppToaster.success("User is created.");
		return Promise.resolve(createdUser);
	},

	updateUserRequest: (user: User) => async (dispatch: Dispatch) => {
		const response = await userRepository.update(user);
		const updatedUser = response.updatedUser;
		dispatch(userActions.updateUser(updatedUser));
		AppToaster.success("User is updated.");
		return Promise.resolve(updatedUser);
	}
};
