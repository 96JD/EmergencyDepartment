import _ from "lodash";
import { UnknownAction } from "redux";

import {
	ActiveInquiriesCount,
	AllInquiriesResponse,
	CreatedInquiryResponse,
	InquiriesCounts,
	InquiriesCountsResponse,
	InquiryResponse,
	UpdatedInquiryResponse
} from "../../api/repositories/inquiryRepository";
import { Inquiry, INQUIRY_CONSTANTS } from "../../models/Inquiry";
import { INQUIRY_ACTIONS_TYPES } from "./actions";

export interface InquiryInitialState {
	loadingAllInquiries: boolean;
	allInquiries: Inquiry[];
	selectedInquiry: Inquiry;
	inquiriesCounts: InquiriesCounts;
	activeInquiriesCount: number;
	selectedAnalyticsPeriodId: number;
}

const inquiryInitialState: InquiryInitialState = {
	loadingAllInquiries: true,
	allInquiries: [],
	selectedInquiry: INQUIRY_CONSTANTS.INITIAL_INQUIRY,
	inquiriesCounts: { activeInquiriesCount: [], inProgressInquiriesCount: [], finishedInquiriesCount: [] },
	activeInquiriesCount: 0,
	selectedAnalyticsPeriodId: 0
};

export const inquiryReducer = (state = inquiryInitialState, action: UnknownAction) => {
	switch (action.type) {
		case INQUIRY_ACTIONS_TYPES.GET_ALL_INQUIRIES:
			return {
				...state,
				loadingAllInquiries: false,
				allInquiries: (action.payload as AllInquiriesResponse).allInquiries
			};

		case INQUIRY_ACTIONS_TYPES.GET_SELECTED_INQUIRY:
			return {
				...state,
				selectedInquiry: (action.payload as InquiryResponse).selectedInquiry
			};

		case INQUIRY_ACTIONS_TYPES.GET_INQUIRIES_COUNTS:
			return {
				...state,
				inquiriesCounts: (action.payload as InquiriesCountsResponse).inquiriesCounts
			};

		case INQUIRY_ACTIONS_TYPES.GET_ACTIVE_INQUIRIES_COUNT:
			return {
				...state,
				activeInquiriesCount: (action.payload as ActiveInquiriesCount).activeInquiriesCount
			};

		case INQUIRY_ACTIONS_TYPES.CREATE_INQUIRY:
			return {
				...state,
				allInquiries: _.concat(state.allInquiries, (action.payload as CreatedInquiryResponse).createdInquiry)
			};

		case INQUIRY_ACTIONS_TYPES.SEND_MESSAGE:
			return {
				...state,
				selectedInquiry: (action.payload as UpdatedInquiryResponse).updatedInquiry
			};

		case INQUIRY_ACTIONS_TYPES.UPDATE_INQUIRY: {
			const updatedInquiry = (action.payload as UpdatedInquiryResponse).updatedInquiry;
			return {
				...state,
				allInquiries: _.map(state.allInquiries, (inquiry: Inquiry) =>
					inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry
				)
			};
		}

		case INQUIRY_ACTIONS_TYPES.SET_SELECTED_ANALYTICS_PERIOD_ID:
			return {
				...state,
				selectedAnalyticsPeriodId: (action.payload as { selectedAnalyticsPeriodId: number })
					.selectedAnalyticsPeriodId
			};

		default:
			return state;
	}
};
