import { Faq } from "../../models/Faq";

export const FAQ_ACTIONS_TYPES = {
	GET_ALL_FAQS: "GET_ALL_FAQS",
	GET_SELECTED_FAQ: "GET_SELECTED_FAQ",
	CREATE_FAQ: "CREATE_FAQ",
	UPDATE_FAQ: "UPDATE_FAQ",
	DELETE_FAQ: "DELETE_FAQ"
};

export const faqActions = {
	getAllFaqs: (allFaqs: Faq[]) => ({
		type: FAQ_ACTIONS_TYPES.GET_ALL_FAQS,
		payload: { allFaqs }
	}),

	getSelectedFaq: (selectedFaq: Faq) => ({
		type: FAQ_ACTIONS_TYPES.GET_SELECTED_FAQ,
		payload: { selectedFaq }
	}),

	createFaq: (createdFaq: Faq) => ({
		type: FAQ_ACTIONS_TYPES.CREATE_FAQ,
		payload: { createdFaq }
	}),

	updateFaq: (updatedFaq: Faq) => ({
		type: FAQ_ACTIONS_TYPES.UPDATE_FAQ,
		payload: { updatedFaq }
	}),

	deleteFaq: (deletedFaq: Faq) => ({
		type: FAQ_ACTIONS_TYPES.DELETE_FAQ,
		payload: { deletedFaq }
	})
};
