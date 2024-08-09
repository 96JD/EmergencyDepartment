import { Dispatch } from "@reduxjs/toolkit";

import { faqRepository } from "../../api/repositories/faqRepository";
import { AppToaster } from "../../AppToaster";
import { Faq } from "../../models/Faq";
import { faqActions } from "./actions";

export const faqThunks = {
	getAllFaqsRequest: () => async (dispatch: Dispatch) => {
		const response = await faqRepository.fetchAll();
		const allFaqs = response.allFaqs;
		dispatch(faqActions.getAllFaqs(allFaqs));
	},

	getSelectedFaqRequest: (id: number) => async (dispatch: Dispatch) => {
		const response = await faqRepository.fetchSingleByKey(id);
		const selectedFaq = response.selectedFaq;
		dispatch(faqActions.getSelectedFaq(selectedFaq));
	},

	createFaqRequest: (faq: Faq) => async (dispatch: Dispatch) => {
		const response = await faqRepository.create(faq);
		const createdFaq = response.createdFaq;
		dispatch(faqActions.createFaq(createdFaq));
		AppToaster.success("FAQ is created.");
		return Promise.resolve(createdFaq);
	},

	updateFaqRequest: (faq: Faq) => async (dispatch: Dispatch) => {
		const response = await faqRepository.update(faq);
		const updatedFaq = response.updatedFaq;
		dispatch(faqActions.updateFaq(updatedFaq));
		AppToaster.success("FAQ is updated.");
		return Promise.resolve(updatedFaq);
	},

	deleteFaqRequest: (faq: Faq) => async (dispatch: Dispatch) => {
		const response = await faqRepository.delete(faq);
		const deletedFaq = response.deletedFaq;
		dispatch(faqActions.deleteFaq(deletedFaq));
		AppToaster.success("FAQ is deleted.");
		return Promise.resolve(deletedFaq);
	}
};
