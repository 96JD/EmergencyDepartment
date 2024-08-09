import _ from "lodash";

import { Inquiry } from "../../../models/Inquiry";
import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { UserUtils } from "../../../shared/functions/UserUtils";

export function getSenderPersonNumber(selectedInquiry: Inquiry) {
	const loggedInUser = UserUtils.getLoggedInUser();
	return _.toString(
		loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT
			? selectedInquiry.patientPersonNumber
			: selectedInquiry.nursePersonNumber
	);
}

export function getSenderFirstName(selectedInquiry: Inquiry) {
	const loggedInUser = UserUtils.getLoggedInUser();
	return loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT
		? selectedInquiry.nurse?.firstName
		: selectedInquiry.patient?.firstName;
}

export function getReceiverPersonNumber(selectedInquiry: Inquiry) {
	const loggedInUser = UserUtils.getLoggedInUser();
	return _.toString(
		loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT
			? selectedInquiry.nursePersonNumber
			: selectedInquiry.patientPersonNumber
	);
}
