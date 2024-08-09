import {
	fieldCanNotBeEmpty,
	fieldMustBeAtMaxLength,
	fieldMustBeBetweenLengths,
	fieldMustMatchDigitsLength,
	formHasErrors
} from "96jd-error-handler-utils";
import _ from "lodash";

import { User, USER_CONSTANTS } from "../../../models/User";

export function validateUserForm(user: User, isUpdateForm: boolean) {
	const errors = {
		personNumber: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		password: "",
		confirmPassword: ""
	};

	if (!isUpdateForm) {
		const personNumberValidLength = USER_CONSTANTS.PERSON_NUMBER_VALID_LENGTH;
		errors.personNumber = fieldMustMatchDigitsLength(
			"Person number",
			_.toString(user.personNumber),
			personNumberValidLength
		);

		errors.firstName = user.firstName
			? fieldMustBeAtMaxLength("First Name", user.firstName, USER_CONSTANTS.FIRST_NAME_MAXIMUM_VALID_LENGTH)
			: fieldCanNotBeEmpty("First Name");

		errors.lastName = user.lastName
			? fieldMustBeAtMaxLength("Last Name", user.lastName, USER_CONSTANTS.LAST_NAME_MAXIMUM_VALID_LENGTH)
			: fieldCanNotBeEmpty("Last Name");

		const password = user.password;
		if (!USER_CONSTANTS.PASSWORD_VALID_PATTERN.test(password)) {
			errors.password = USER_CONSTANTS.PASSWORD_VALID_PATTERN_ERROR;
		}
		if (password !== user.confirmPassword) {
			errors.confirmPassword = "Passwords must match.";
		}
	}

	errors.phoneNumber = user.phoneNumber
		? fieldMustBeBetweenLengths(
				"Phone number",
				user.phoneNumber,
				USER_CONSTANTS.PHONE_NUMBER_MINIMUM_VALID_LENGTH,
				USER_CONSTANTS.PHONE_NUMBER_MAXIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("Phone number");

	errors.address = user.address
		? fieldMustBeBetweenLengths(
				"Address",
				user.address,
				USER_CONSTANTS.ADDRESS_MINIMUM_VALID_LENGTH,
				USER_CONSTANTS.ADDRESS_MAXIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("Address");

	return formHasErrors(errors) ? errors : {};
}
