import _ from "lodash";

import { Box, Container } from "@mui/material";

import { ChatMessage } from "../../../models/ChatMessage";
import { UserUtils } from "../../../shared/functions/UserUtils";
import InquiryChatReceiver from "./InquiryChatReceiver";
import InquiryChatSender from "./InquiryChatSender";

interface Props {
	chatMessages: ChatMessage[];
	nurseLetters?: string;
	patientLetters?: string;
}

export default function InquiryChatMessages({ chatMessages, nurseLetters, patientLetters }: Readonly<Props>) {
	const loggedInUser = UserUtils.getLoggedInUser();
	return (
		<Container>
			<Box mt={1} mb={10}>
				{_.map(chatMessages, (chatMessage: ChatMessage) =>
					chatMessage.senderPersonNumber === loggedInUser.personNumber ? (
						<InquiryChatSender
							key={_.uniqueId(chatMessage.text)}
							nurseLetters={nurseLetters}
							patientLetters={patientLetters}
							chatMessages={chatMessages}
							chatMessage={chatMessage}
						/>
					) : (
						<InquiryChatReceiver
							key={_.uniqueId(chatMessage.text)}
							nurseLetters={nurseLetters}
							patientLetters={patientLetters}
							chatMessages={chatMessages}
							chatMessage={chatMessage}
						/>
					)
				)}
			</Box>
		</Container>
	);
}
