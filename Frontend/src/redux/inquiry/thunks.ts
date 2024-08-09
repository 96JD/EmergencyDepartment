import { Dispatch } from "@reduxjs/toolkit";

import { inquiryRepository } from "../../api/repositories/inquiryRepository";
import { AppToaster } from "../../AppToaster";
import { Inquiry } from "../../models/Inquiry";
import { INQUIRY_STATUS_CONSTANTS } from "../../models/InquiryStatus";
import { inquiryActions } from "./actions";

export const inquiryThunks = {
	getAllInquiriesRequest: () => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.fetchAll();
		const allInquiries = response.allInquiries;
		dispatch(inquiryActions.getAllInquiries(allInquiries));
	},

	getSelectedInquiryRequest: (id: number) => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.fetchSingleByKey(id);
		const selectedInquiry = response.selectedInquiry;
		dispatch(inquiryActions.getSelectedInquiry(selectedInquiry));
		return Promise.resolve(selectedInquiry);
	},

	getInquiriesCountsRequest: (year: number) => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.fetchInquiriesCounts(year);
		const inquiriesCounts = response.inquiriesCounts;
		dispatch(inquiryActions.getInquiriesCounts(inquiriesCounts));
	},

	getActiveInquiriesCountRequest: () => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.fetchActiveInquiriesCount();
		const activeInquiriesCount = response.activeInquiriesCount;
		if (activeInquiriesCount) {
			dispatch(inquiryActions.getActiveInquiriesCount(activeInquiriesCount));
		}
	},

	setActiveInquiriesCount: (updatedActiveInquiriesCount: number) => (dispatch: Dispatch) => {
		dispatch(inquiryActions.setActiveInquiriesCount(updatedActiveInquiriesCount));
	},

	createInquiryRequest: (formData: FormData) => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.create(formData);
		const createdInquiry = response.createdInquiry;
		dispatch(inquiryActions.createInquiry(createdInquiry));
		AppToaster.success("Inquiry is created.");
		return Promise.resolve(createdInquiry);
	},

	sendMessageRequest: (formData: FormData) => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.sendMessage(formData);
		const updatedInquiry = response.updatedInquiry;
		dispatch(inquiryActions.sendMessage(updatedInquiry));
		return Promise.resolve(updatedInquiry);
	},

	updateInquiryRequest: (inquiry: Inquiry) => async (dispatch: Dispatch) => {
		const response = await inquiryRepository.update(inquiry);
		const updatedInquiry = response.updatedInquiry;
		dispatch(inquiryActions.updateInquiry(updatedInquiry));
		if (updatedInquiry.inquiryStatusId !== INQUIRY_STATUS_CONSTANTS.STATUSES.IN_CHAT) {
			let successMessage = "Inquiry is assigned to nurse.";
			if (updatedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY) {
				successMessage = "Inquiry is in summary phase now.";
			}
			if (updatedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED) {
				successMessage = "Summary is added.";
			}
			AppToaster.success(successMessage);
		}
		return Promise.resolve(updatedInquiry);
	},

	setSelectedAnalyticsPeriodId: (selectedAnalyticsPeriodId: number) => (dispatch: Dispatch) => {
		dispatch(inquiryActions.setSelectedAnalyticsPeriodId(selectedAnalyticsPeriodId));
	}
};
