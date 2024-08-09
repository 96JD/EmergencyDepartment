import _ from "lodash";
import { createSelector } from "reselect";

import { Inquiry } from "../../models/Inquiry";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { UserUtils } from "../../shared/functions/UserUtils";
import { RootState } from "../store";

export const inquirySelectors = {
	loadingAllInquiries: (state: RootState) => state.inquiryReducer.loadingAllInquiries,
	allInquiries: (state: RootState) =>
		UserUtils.getLoggedInUser().userRoleId !== USER_ROLES_CONSTANTS.PATIENT
			? state.inquiryReducer.allInquiries
			: createSelector(
					(state: RootState) => state.inquiryReducer.allInquiries,
					(inquiries: Inquiry[]) =>
						_.filter(
							inquiries,
							(inquiry: Inquiry) =>
								inquiry.patientPersonNumber === UserUtils.getLoggedInUser().personNumber
						)
				),
	selectedInquiry: (state: RootState) => state.inquiryReducer.selectedInquiry,
	inquiriesCounts: (state: RootState) => state.inquiryReducer.inquiriesCounts,
	activeInquiriesCount: (state: RootState) => state.inquiryReducer.activeInquiriesCount,
	selectedAnalyticsPeriodId: (state: RootState) => state.inquiryReducer.selectedAnalyticsPeriodId
};
