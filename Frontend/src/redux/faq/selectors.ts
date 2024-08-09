import { RootState } from "../store";

export const faqSelectors = {
	loadingAllFaqs: (state: RootState) => state.faqReducer.loadingAllFaqs,
	allFaqs: (state: RootState) => state.faqReducer.allFaqs,
	selectedFaq: (state: RootState) => state.faqReducer.selectedFaq
};
