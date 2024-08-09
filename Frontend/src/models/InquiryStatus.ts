import { Inquiry } from "./Inquiry";

export interface InquiryStatus {
	id: number;
	name: string;
	inquiries?: Inquiry[];
}

export const INQUIRY_STATUS_CONSTANTS = {
	STATUSES: {
		ACTIVE: 1,
		IN_PROGRESS: 2,
		IN_CHAT: 3,
		IN_SUMMARY: 4,
		FINISHED: 5
	},

	LABELS: [
		{
			id: 1,
			text: "active",
			color: "primary"
		},
		{
			id: 2,
			text: "in progress",
			color: "warning"
		},
		{
			id: 3,
			text: "in chat",
			color: "info"
		},
		{
			id: 4,
			text: "in summary",
			color: "info"
		},
		{
			id: 5,
			text: "finished",
			color: "success"
		}
	]
};
