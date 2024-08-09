export interface Faq {
	id: number;
	question: string;
	answer: string;
}

export const FAQ_CONSTANTS = {
	INITIAL_FAQ: { id: 0, question: "", answer: "" },

	QUESTION_MINIMUM_VALID_LENGTH: 15,
	QUESTION_MAXIMUM_VALID_LENGTH: 100
};
