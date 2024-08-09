import { fieldMustMatchDigitsLength, formHasErrors } from "96jd-error-handler-utils";
import _ from "lodash";

import { LoginCredentials, USER_CONSTANTS } from "../../../models/User";

export function validateLoginForm(loginCredentials: LoginCredentials) {
	if (import.meta.env.PROD && _.isEmpty(loginCredentials)) {
		return {};
	}

	const errors = { personNumber: "", password: "" };

	const personNumberValidLength = USER_CONSTANTS.PERSON_NUMBER_VALID_LENGTH;
	errors.personNumber = fieldMustMatchDigitsLength(
		"Person number",
		_.toString(loginCredentials.personNumber),
		personNumberValidLength
	);

	if (!USER_CONSTANTS.PASSWORD_VALID_PATTERN.test(loginCredentials.password)) {
		errors.password = USER_CONSTANTS.PASSWORD_VALID_PATTERN_ERROR;
	}

	return formHasErrors(errors) ? errors : {};
}
