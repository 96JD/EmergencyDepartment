import { fieldCanNotBeEmpty, fieldMustBeBetweenLengths, formHasErrors } from "96jd-error-handler-utils";

import { Faq, FAQ_CONSTANTS } from "../../../models/Faq";

export function validateFaqForm(faq: Faq) {
	const errors = { question: "", answer: "" };

	errors.question = faq.question
		? fieldMustBeBetweenLengths(
				"Question",
				faq.question,
				FAQ_CONSTANTS.QUESTION_MINIMUM_VALID_LENGTH,
				FAQ_CONSTANTS.QUESTION_MAXIMUM_VALID_LENGTH
			)
		: fieldCanNotBeEmpty("Phone number");

	if (!faq.answer) {
		errors.answer = fieldCanNotBeEmpty("Answer");
	}

	return formHasErrors(errors) ? errors : {};
}
