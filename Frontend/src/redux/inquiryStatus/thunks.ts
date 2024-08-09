import { Dispatch } from "@reduxjs/toolkit";

import { inquiryStatusRepository } from "../../api/repositories/inquiryStatusRepository";
import { inquiryStatusActions } from "./actions";

export const inquiryStatusThunks = {
	getAllInquiryStatusesRequest: () => async (dispatch: Dispatch) => {
		const response = await inquiryStatusRepository.fetchAll();
		const allInquiryStatuses = response.allInquiryStatuses;
		dispatch(inquiryStatusActions.getAllInquiryStatuses(allInquiryStatuses));
	},

	setSelectedInquiryStatusId: (selectedInquiryStatusId: number) => (dispatch: Dispatch) => {
		dispatch(inquiryStatusActions.setSelectedInquiryStatusId(selectedInquiryStatusId));
	}
};
