import { API_URLS, axiosRequest } from "../";
import { InquiryStatus } from "../../models/InquiryStatus";

export interface AllInquiryStatusesResponse {
	allInquiryStatuses: InquiryStatus[];
}

export const inquiryStatusRepository = {
	async fetchAll() {
		return (await axiosRequest(
			`${API_URLS.INQUIRY_STATUS}/fetch-all-inquiry-statuses`
		)) as AllInquiryStatusesResponse;
	}
};
