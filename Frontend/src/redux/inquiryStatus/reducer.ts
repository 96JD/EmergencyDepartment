import { UnknownAction } from "redux";

import { AllInquiryStatusesResponse } from "../../api/repositories/inquiryStatusRepository";
import { InquiryStatus } from "../../models/InquiryStatus";
import { INQUIRY_STATUS_ACTIONS_TYPES } from "./actions";

export interface InquiryStatusInitialState {
	loadingAllInquiryStatuses: boolean;
	allInquiryStatuses: InquiryStatus[];
	selectedInquiryStatusId: number;
}

const inquiryStatusInitialState: InquiryStatusInitialState = {
	loadingAllInquiryStatuses: true,
	allInquiryStatuses: [],
	selectedInquiryStatusId: 0
};

export const inquiryStatusReducer = (state = inquiryStatusInitialState, action: UnknownAction) => {
	switch (action.type) {
		case INQUIRY_STATUS_ACTIONS_TYPES.GET_ALL_INQUIRY_STATUSES:
			return {
				...state,
				loadingAllInquiryStatuses: false,
				allInquiryStatuses: (action.payload as AllInquiryStatusesResponse).allInquiryStatuses
			};

		case INQUIRY_STATUS_ACTIONS_TYPES.SET_SELECTED_INQUIRY_STATUS_ID:
			return {
				...state,
				selectedInquiryStatusId: (action.payload as { selectedInquiryStatusId: number }).selectedInquiryStatusId
			};

		default:
			return state;
	}
};
