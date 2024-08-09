import _ from "lodash";

import { API_URLS, axiosRequest } from "../";
import { LoginCredentials, User } from "../../models/User";

interface LoginResponse {
	jwt: string;
	loggedInUser: User;
}

interface LogoutResponse {
	loggedOut: boolean;
}

export interface AllUsersResponse {
	allUsers: User[];
}

export interface UserResponse {
	selectedUser: User;
}

export interface CreatedUserResponse {
	createdUser: User;
}

export interface UpdatedUserResponse {
	updatedUser: User;
}

export const userRepository = {
	async login(loginCredentials: LoginCredentials) {
		return (await axiosRequest(`${API_URLS.USER}/login-user`, "POST", loginCredentials)) as LoginResponse;
	},

	async logout() {
		return (await axiosRequest(`${API_URLS.USER}/logout-user`)) as LogoutResponse;
	},

	async fetchAll() {
		return (await axiosRequest(`${API_URLS.USER}/fetch-all-users`)) as AllUsersResponse;
	},

	async fetchSingleByKey(personNumber: number) {
		return (await axiosRequest(`${API_URLS.USER}/fetch-user(${_.toString(personNumber)})`)) as UserResponse;
	},

	async create(user: User) {
		return (await axiosRequest(`${API_URLS.USER}/create-user`, "POST", user)) as CreatedUserResponse;
	},

	async update(user: User) {
		return (await axiosRequest(`${API_URLS.USER}/update-user`, "PUT", user)) as UpdatedUserResponse;
	}
};
