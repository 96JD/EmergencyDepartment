import {
	fieldCanNotBeEmpty,
	fieldMustBeAtLeastLength,
	fieldMustBeBetweenLengths,
	formHasErrors
} from "96jd-error-handler-utils";

import { Inquiry, INQUIRY_CONSTANTS } from "../../../models/Inquiry";

export function validateInquiryForm(inquiry: Inquiry) {
	const errors = { title: "", description: "", generalPractitioner: "" };

	errors.title = inquiry.title
		? fieldMustBeBetweenLengths(
				"Title",
				inquiry.title,
				INQUIRY_CONSTANTS.TITLE_MINIMUM_VALID_LENGTH,
				INQUIRY_CONSTANTS.TITLE_MAXIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("Title");

	errors.description = inquiry.description
		? fieldMustBeAtLeastLength(
				"Description",
				inquiry.description,
				INQUIRY_CONSTANTS.DESCRIPTION_MINIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("Description");

	errors.generalPractitioner = inquiry.generalPractitioner
		? fieldMustBeBetweenLengths(
				"General Practitioner",
				inquiry.generalPractitioner,
				INQUIRY_CONSTANTS.GENERAL_PRACTITIONER_MINIMUM_VALID_LENGTH,
				INQUIRY_CONSTANTS.GENERAL_PRACTITIONER_MAXIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("General Practitioner");

	return formHasErrors(errors) ? errors : {};
}
