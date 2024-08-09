import { Inquiry } from "./Inquiry";
import { User } from "./User";

export interface ChatMessage {
	id: number;
	text?: string;
	imageUrl?: string;
	receivedDate?: string;
	senderPersonNumber: number;
	sender?: User;
	receiverPersonNumber: number;
	receiver?: User;
	inquiryId: number;
	inquiry?: Inquiry;
}
