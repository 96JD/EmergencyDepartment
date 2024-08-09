import { InquiryStatus } from "../../models/InquiryStatus";

export const INQUIRY_STATUS_ACTIONS_TYPES = {
	GET_ALL_INQUIRY_STATUSES: "GET_ALL_INQUIRY_STATUSES",
	SET_SELECTED_INQUIRY_STATUS_ID: "SET_SELECTED_INQUIRY_STATUS_ID"
};

export const inquiryStatusActions = {
	getAllInquiryStatuses: (allInquiryStatuses: InquiryStatus[]) => ({
		type: INQUIRY_STATUS_ACTIONS_TYPES.GET_ALL_INQUIRY_STATUSES,
		payload: { allInquiryStatuses }
	}),

	setSelectedInquiryStatusId: (selectedInquiryStatusId: number) => ({
		type: INQUIRY_STATUS_ACTIONS_TYPES.SET_SELECTED_INQUIRY_STATUS_ID,
		payload: { selectedInquiryStatusId }
	})
};
