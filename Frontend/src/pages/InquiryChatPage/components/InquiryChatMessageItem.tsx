import _ from "lodash";

import { ChatMessage } from "../../../models/ChatMessage";
import InquiryChatImageMessage from "./InquiryChatImageMessage";
import InquiryChatTextMessage from "./InquiryChatTextMessage";

interface Props {
	chatMessages: ChatMessage[];
	chatMessage: ChatMessage;
}

export default function InquiryChatMessageItem({ chatMessages, chatMessage }: Props) {
	return _.isNil(chatMessage.text) ? (
		<InquiryChatImageMessage chatMessages={chatMessages} chatMessageId={chatMessage.id} />
	) : (
		<InquiryChatTextMessage text={chatMessage.text} />
	);
}
