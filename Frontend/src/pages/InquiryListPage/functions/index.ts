import _ from "lodash";

import { Inquiry } from "../../../models/Inquiry";

export function filterInquiries(
	allInquiries: Inquiry[],
	selectedInquiryStatusId: number,
	filterNursesPersonNumber: number[]
) {
	return _.filter(
		allInquiries,
		(inquiry: Inquiry) =>
			!(
				inquiry.inquiryStatusId !== selectedInquiryStatusId ||
				(_.size(filterNursesPersonNumber) && !_.includes(filterNursesPersonNumber, inquiry.nursePersonNumber))
			)
	);
}
