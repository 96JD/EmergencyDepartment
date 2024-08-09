import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { HubConnection } from "@microsoft/signalr";

import { APP_ROUTES } from "../../AppRoutes";
import { ChatMessage } from "../../models/ChatMessage";
import { INQUIRY_STATUS_CONSTANTS } from "../../models/InquiryStatus";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { inquirySelectors } from "../../redux/inquiry/selectors";
import { inquiryThunks } from "../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Spinner from "../../shared/components/Loader/components/Spinner";
import { UserUtils } from "../../shared/functions/UserUtils";
import InquiryChat from "./components/InquiryChat";
import InquiryChatWrapper from "./components/InquiryChatWrapper";

export default function InquiryChatPage() {
	const params = useParams();
	const inquiryId = _.toNumber(params.id);

	const signalRConnection: HubConnection = useOutletContext();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loadingSelectedInquiry, setLoadingSelectedInquiry] = useState<boolean>(false);
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>(selectedInquiry.chatMessages ?? []);

	const fetchSelectedInquiry = useCallback(async () => {
		setLoadingSelectedInquiry(true);
		await dispatch(inquiryThunks.getSelectedInquiryRequest(inquiryId));
		setLoadingSelectedInquiry(false);
	}, [dispatch, inquiryId]);

	useEffect(() => {
		void fetchSelectedInquiry();
	}, [fetchSelectedInquiry]);

	useEffect(() => {
		if (!_.isNil(selectedInquiry)) {
			const loggedInUser = UserUtils.getLoggedInUser();
			if (
				(loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT &&
					loggedInUser.personNumber !== selectedInquiry.nursePersonNumber) ||
				(loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT &&
					loggedInUser.personNumber !== selectedInquiry.patientPersonNumber) ||
				selectedInquiry.inquiryStatusId !== INQUIRY_STATUS_CONSTANTS.STATUSES.IN_CHAT
			) {
				navigate(`/${APP_ROUTES.INQUIRY_ITEM}/${_.toString(selectedInquiry.id)}`);
			}
			if (selectedInquiry.chatMessages) {
				setChatMessages(selectedInquiry.chatMessages);
			}
		}
	}, [navigate, selectedInquiry]);

	useEffect(() => {
		signalRConnection.on("TypingMessage", (chatMessage: ChatMessage) => {
			const loggedInUser = UserUtils.getLoggedInUser();
			if (_.size(chatMessage.text) && loggedInUser.personNumber !== chatMessage.senderPersonNumber) {
				setIsTyping(true);
			} else {
				setIsTyping(false);
			}
		});
		signalRConnection.on("ReceivingMessage", (chatMessage: ChatMessage) => {
			setChatMessages((chatMessages) => [...chatMessages, chatMessage]);
		});
	}, [signalRConnection]);

	return (
		<>
			<Helmet>
				<title>Inquiry Chat</title>
			</Helmet>
			{loadingSelectedInquiry ? (
				<Spinner />
			) : (
				<InquiryChatWrapper>
					<InquiryChat isTyping={isTyping} chatMessages={chatMessages} />
				</InquiryChatWrapper>
			)}
		</>
	);
}
