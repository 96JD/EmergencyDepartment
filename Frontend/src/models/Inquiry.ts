import { ChatMessage } from "./ChatMessage";
import { InquiryImage } from "./InquiryImage";
import { InquiryStatus } from "./InquiryStatus";
import { User } from "./User";

export interface Inquiry {
	id: number;
	title: string;
	description: string;
	generalPractitioner: string;
	summary?: string;
	receivedDate?: string;
	updatedDate?: string;
	patientPersonNumber?: number;
	patient?: User;
	nursePersonNumber?: number;
	nurse?: User;
	inquiryStatusId: number;
	inquiryStatus?: InquiryStatus;
	inquiryImages?: InquiryImage[];
	chatMessages?: ChatMessage[];
}

export const INQUIRY_CONSTANTS = {
	INITIAL_INQUIRY: {
		id: 0,
		title: "string",
		description: "string",
		generalPractitioner: "string",
		inquiryStatusId: 0
	},

	ANALYTICS_PERIODS: {
		1: { text: "This year" },
		2: { text: "Last year" }
	},
	PAGINATION_OPTIONS: [10, 20, 30],
	ROWS_PER_PAGE: 10,
	TITLE_MINIMUM_VALID_LENGTH: 15,
	TITLE_MAXIMUM_VALID_LENGTH: 100,
	DESCRIPTION_MINIMUM_VALID_LENGTH: 25,
	GENERAL_PRACTITIONER_MINIMUM_VALID_LENGTH: 10,
	GENERAL_PRACTITIONER_MAXIMUM_VALID_LENGTH: 50
};
