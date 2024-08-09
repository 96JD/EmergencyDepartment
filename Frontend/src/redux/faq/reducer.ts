import _ from "lodash";
import { UnknownAction } from "redux";

import {
	AllFaqsResponse,
	CreatedFaqResponse,
	DeletedFaqResponse,
	FaqResponse,
	UpdatedFaqResponse
} from "../../api/repositories/faqRepository";
import { Faq, FAQ_CONSTANTS } from "../../models/Faq";
import { FAQ_ACTIONS_TYPES } from "./actions";

export interface FaqInitialState {
	loadingAllFaqs: boolean;
	allFaqs: Faq[];
	selectedFaq: Faq;
}

const faqInitialState: FaqInitialState = { loadingAllFaqs: true, allFaqs: [], selectedFaq: FAQ_CONSTANTS.INITIAL_FAQ };

export const faqReducer = (state = faqInitialState, action: UnknownAction) => {
	switch (action.type) {
		case FAQ_ACTIONS_TYPES.GET_ALL_FAQS:
			return {
				...state,
				loadingAllFaqs: false,
				allFaqs: (action.payload as AllFaqsResponse).allFaqs
			};

		case FAQ_ACTIONS_TYPES.GET_SELECTED_FAQ:
			return {
				...state,
				selectedFaq: (action.payload as FaqResponse).selectedFaq
			};

		case FAQ_ACTIONS_TYPES.CREATE_FAQ:
			return {
				...state,
				allFaqs: _.concat(state.allFaqs, (action.payload as CreatedFaqResponse).createdFaq)
			};

		case FAQ_ACTIONS_TYPES.UPDATE_FAQ: {
			const updatedFaq = (action.payload as UpdatedFaqResponse).updatedFaq;
			return {
				...state,
				allFaqs: _.map(state.allFaqs, (faq: Faq) => {
					return faq.id === updatedFaq.id ? updatedFaq : faq;
				})
			};
		}

		case FAQ_ACTIONS_TYPES.DELETE_FAQ:
			return {
				...state,
				allFaqs: _.filter(
					state.allFaqs,
					(faq: Faq) => faq.id !== (action.payload as DeletedFaqResponse).deletedFaq.id
				)
			};

		default:
			return state;
	}
};
