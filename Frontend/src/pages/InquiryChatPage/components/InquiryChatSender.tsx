import { Avatar, Box } from "@mui/material";

import { ChatMessage } from "../../../models/ChatMessage";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { UserUtils } from "../../../shared/functions/UserUtils";
import InquiryChatMessageItem from "./InquiryChatMessageItem";

interface Props {
	nurseLetters?: string;
	patientLetters?: string;
	chatMessages: ChatMessage[];
	chatMessage: ChatMessage;
}

export default function InquiryChatSender({
	nurseLetters,
	patientLetters,
	chatMessages,
	chatMessage
}: Readonly<Props>) {
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);
	const loggedInUser = UserUtils.getLoggedInUser();

	return (
		<Box display="flex" alignItems="flex-start" justifyContent="flex-end" py={1} height={1}>
			<Box mr={2}>
				<InquiryChatMessageItem chatMessages={chatMessages} chatMessage={chatMessage} />
			</Box>
			<Avatar>
				{loggedInUser.personNumber === selectedInquiry.patientPersonNumber ? patientLetters : nurseLetters}
			</Avatar>
		</Box>
	);
}
