import _ from "lodash";

import { API_URLS, axiosRequest } from "../";
import { Faq } from "../../models/Faq";

export interface AllFaqsResponse {
	allFaqs: Faq[];
}

export interface FaqResponse {
	selectedFaq: Faq;
}

export interface CreatedFaqResponse {
	createdFaq: Faq;
}

export interface UpdatedFaqResponse {
	updatedFaq: Faq;
}

export interface DeletedFaqResponse {
	deletedFaq: Faq;
}

export const faqRepository = {
	async fetchAll() {
		return (await axiosRequest(`${API_URLS.FAQ}/fetch-all-faqs`)) as AllFaqsResponse;
	},

	async fetchSingleByKey(id: number) {
		return (await axiosRequest(`${API_URLS.FAQ}/fetch-faq(${_.toString(id)})`)) as FaqResponse;
	},

	async create(faq: Faq) {
		return (await axiosRequest(`${API_URLS.FAQ}/create-faq`, "POST", faq)) as CreatedFaqResponse;
	},

	async update(faq: Faq) {
		return (await axiosRequest(`${API_URLS.FAQ}/update-faq`, "PUT", faq)) as UpdatedFaqResponse;
	},

	async delete(faq: Faq) {
		return (await axiosRequest(`${API_URLS.FAQ}/delete-faq`, "DELETE", faq)) as DeletedFaqResponse;
	}
};
