import { Inquiry } from "./Inquiry";

export interface InquiryImage {
	id: number;
	url: string;
	inquiryId: number;
	inquiry?: Inquiry;
}
