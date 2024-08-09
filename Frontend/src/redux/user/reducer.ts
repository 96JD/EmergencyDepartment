import _ from "lodash";
import { UnknownAction } from "redux";

import {
	AllUsersResponse,
	CreatedUserResponse,
	UpdatedUserResponse,
	UserResponse
} from "../../api/repositories/userRepository";
import { User, USER_CONSTANTS } from "../../models/User";
import { UserUtils } from "../../shared/functions/UserUtils";
import { USER_ACTIONS_TYPES } from "./actions";

export interface UserInitialState {
	loggedInUser: User;
	loadingAllUsers: boolean;
	allUsers: User[];
	selectedUser: User;
}

const userInitialState: UserInitialState = {
	loggedInUser: USER_CONSTANTS.INITIAL_USER,
	loadingAllUsers: true,
	allUsers: [],
	selectedUser: USER_CONSTANTS.INITIAL_USER
};

export const userReducer = (state = userInitialState, action: UnknownAction) => {
	switch (action.type) {
		case USER_ACTIONS_TYPES.LOGIN_USER:
			return {
				...state,
				loggedInUser: UserUtils.getLoggedInUser()
			};

		case USER_ACTIONS_TYPES.GET_ALL_USERS:
			return {
				...state,
				loadingAllUsers: false,
				allUsers: (action.payload as AllUsersResponse).allUsers
			};

		case USER_ACTIONS_TYPES.GET_SELECTED_USER:
			return {
				...state,
				selectedUser: (action.payload as UserResponse).selectedUser
			};

		case USER_ACTIONS_TYPES.CREATE_USER:
			return {
				...state,
				allUsers: _.concat(state.allUsers, (action.payload as CreatedUserResponse).createdUser)
			};

		case USER_ACTIONS_TYPES.UPDATE_USER: {
			const updatedUser = (action.payload as UpdatedUserResponse).updatedUser;
			return {
				...state,
				allUsers: _.map(state.allUsers, (user: User) =>
					user.personNumber === updatedUser.personNumber ? updatedUser : user
				)
			};
		}
		default:
			return state;
	}
};
