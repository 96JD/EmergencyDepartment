import { RootState } from "../store";

export const inquiryStatusSelectors = {
	loadingAllInquiryStatuses: (state: RootState) => state.inquiryStatusReducer.loadingAllInquiryStatuses,
	allInquiryStatuses: (state: RootState) => state.inquiryStatusReducer.allInquiryStatuses,
	selectedInquiryStatusId: (state: RootState) => state.inquiryStatusReducer.selectedInquiryStatusId
};
