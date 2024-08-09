import _ from "lodash";

import { API_URLS, axiosRequest } from "../";
import { Inquiry } from "../../models/Inquiry";

export interface AllInquiriesResponse {
	allInquiries: Inquiry[];
}

export interface InquiryResponse {
	selectedInquiry: Inquiry;
}

export interface InquiryCounts {
	monthIndex: number;
	count: number;
}

export interface InquiriesCounts {
	activeInquiriesCount: InquiryCounts[];
	inProgressInquiriesCount: InquiryCounts[];
	finishedInquiriesCount: InquiryCounts[];
}

export interface InquiriesCountsResponse {
	inquiriesCounts: InquiriesCounts;
}

export interface ActiveInquiriesCount {
	activeInquiriesCount: number;
}

export interface CreatedInquiryResponse {
	createdInquiry: Inquiry;
}

export interface UpdatedInquiryResponse {
	updatedInquiry: Inquiry;
}

export const inquiryRepository = {
	async fetchAll() {
		return (await axiosRequest(`${API_URLS.INQUIRY}/fetch-all-inquiries`)) as AllInquiriesResponse;
	},

	async fetchSingleByKey(id: number) {
		return (await axiosRequest(`${API_URLS.INQUIRY}/fetch-inquiry(${_.toString(id)})`)) as InquiryResponse;
	},

	async fetchInquiriesCounts(year: number) {
		return (await axiosRequest(
			`${API_URLS.INQUIRY}/fetch-inquiries-counts(${_.toString(year)})`
		)) as InquiriesCountsResponse;
	},

	async fetchActiveInquiriesCount() {
		return (await axiosRequest(`${API_URLS.INQUIRY}/fetch-active-inquiries-count`)) as ActiveInquiriesCount;
	},

	async create(formData: FormData) {
		return (await axiosRequest(`${API_URLS.INQUIRY}/create-inquiry`, "POST", formData)) as CreatedInquiryResponse;
	},

	async sendMessage(formData: FormData) {
		return (await axiosRequest(`${API_URLS.INQUIRY}/send-message`, "POST", formData)) as UpdatedInquiryResponse;
	},

	async update(inquiry: Inquiry) {
		return (await axiosRequest(`${API_URLS.INQUIRY}/update-inquiry`, "PUT", inquiry)) as UpdatedInquiryResponse;
	}
};
