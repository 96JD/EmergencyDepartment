import _ from "lodash";

import { APP_LOCAL_STORAGE } from "../../AppLocalStorage";
import { User, USER_CONSTANTS } from "../../models/User";

export const UserUtils = {
	getLoggedInUser() {
		const loggedInUser = localStorage.getItem(APP_LOCAL_STORAGE.LOGGED_IN_USER);
		return !_.isNil(loggedInUser) ? (JSON.parse(loggedInUser) as User) : USER_CONSTANTS.INITIAL_USER;
	},

	isUserLoggedIn() {
		const loggedInUser = localStorage.getItem(APP_LOCAL_STORAGE.LOGGED_IN_USER);
		return !_.isNil(loggedInUser);
	},

	getFullName(user: User) {
		return `${user.firstName} ${user.lastName}`;
	},

	getFirstTwoLetters(user: User) {
		return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
	}
};
