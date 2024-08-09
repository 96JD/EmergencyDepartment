import { InquiriesCounts } from "../../api/repositories/inquiryRepository";
import { Inquiry } from "../../models/Inquiry";

export const INQUIRY_ACTIONS_TYPES = {
	GET_ALL_INQUIRIES: "GET_ALL_INQUIRIES",
	GET_SELECTED_INQUIRY: "GET_SELECTED_INQUIRY",
	GET_INQUIRIES_COUNTS: "GET_INQUIRIES_COUNTS",
	GET_ACTIVE_INQUIRIES_COUNT: "GET_ACTIVE_INQUIRIES_COUNT",
	SET_ACTIVE_INQUIRIES_COUNT: "SET_ACTIVE_INQUIRIES_COUNT",
	CREATE_INQUIRY: "CREATE_INQUIRY",
	SEND_MESSAGE: "SEND_MESSAGE",
	UPDATE_INQUIRY: "UPDATE_INQUIRY",
	SET_SELECTED_ANALYTICS_PERIOD_ID: "SET_SELECTED_ANALYTICS_PERIOD_ID"
};

export const inquiryActions = {
	getAllInquiries: (allInquiries: Inquiry[]) => ({
		type: INQUIRY_ACTIONS_TYPES.GET_ALL_INQUIRIES,
		payload: { allInquiries }
	}),

	getSelectedInquiry: (selectedInquiry: Inquiry) => ({
		type: INQUIRY_ACTIONS_TYPES.GET_SELECTED_INQUIRY,
		payload: { selectedInquiry }
	}),

	getInquiriesCounts: (inquiriesCounts: InquiriesCounts) => ({
		type: INQUIRY_ACTIONS_TYPES.GET_INQUIRIES_COUNTS,
		payload: { inquiriesCounts }
	}),

	getActiveInquiriesCount: (activeInquiriesCount: number) => ({
		type: INQUIRY_ACTIONS_TYPES.GET_ACTIVE_INQUIRIES_COUNT,
		payload: { activeInquiriesCount }
	}),

	setActiveInquiriesCount: (updatedActiveInquiriesCount: number) => ({
		type: INQUIRY_ACTIONS_TYPES.SET_ACTIVE_INQUIRIES_COUNT,
		payload: { updatedActiveInquiriesCount }
	}),

	createInquiry: (createdInquiry: Inquiry) => ({
		type: INQUIRY_ACTIONS_TYPES.CREATE_INQUIRY,
		payload: { createdInquiry }
	}),

	sendMessage: (updatedInquiry: Inquiry) => ({
		type: INQUIRY_ACTIONS_TYPES.SEND_MESSAGE,
		payload: { updatedInquiry }
	}),

	updateInquiry: (updatedInquiry: Inquiry) => ({
		type: INQUIRY_ACTIONS_TYPES.UPDATE_INQUIRY,
		payload: { updatedInquiry }
	}),

	setSelectedAnalyticsPeriodId: (selectedAnalyticsPeriodId: number) => ({
		type: INQUIRY_ACTIONS_TYPES.SET_SELECTED_ANALYTICS_PERIOD_ID,
		payload: { selectedAnalyticsPeriodId }
	})
};
