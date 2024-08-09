import { isEnterPressed } from "96jd-accessibility-utils";
import _ from "lodash";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { HubConnection } from "@microsoft/signalr";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { Avatar, Button, Divider, Grid, IconButton, InputBase, Tooltip, Typography, useTheme } from "@mui/material";

import { ChatMessage } from "../../../models/ChatMessage";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Spinner from "../../../shared/components/Loader/components/Spinner";
import { UserUtils } from "../../../shared/functions/UserUtils";
import { getReceiverPersonNumber, getSenderFirstName, getSenderPersonNumber } from "../functions";
import InquiryChatDateDivider from "./InquiryChatDateDivider";
import InquiryChatHeader from "./InquiryChatHeader";
import InquiryChatInputWrapper from "./InquiryChatInputWrapper";
import InquiryChatMessages from "./InquiryChatMessages";

interface Props {
	isTyping: boolean;
	chatMessages: ChatMessage[];
}

export default function InquiryChat({ isTyping, chatMessages }: Props) {
	const signalRConnection: HubConnection = useOutletContext();
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const loggedInUser = UserUtils.getLoggedInUser();

	const chatImageUploadId = "chat-image-upload";

	const nurseLetters = selectedInquiry.nurse && UserUtils.getFirstTwoLetters(selectedInquiry.nurse);
	const patientLetters = selectedInquiry.patient && UserUtils.getFirstTwoLetters(selectedInquiry.patient);

	const [message, setMessage] = useState<string>("");
	const [images, setImages] = useState<FileList>();
	const [totalImages, setTotalImages] = useState<number>(0);

	const onChatMessageChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const message = e.target.value;
			setMessage(message);
			const loggedInUser = UserUtils.getLoggedInUser();
			void signalRConnection.send("UserIsTyping", loggedInUser.personNumber, message);
		},
		[signalRConnection]
	);

	const sendMessage = useCallback(async () => {
		const loggedInUser = UserUtils.getLoggedInUser();
		const formData = new FormData();
		if (_.size(message)) {
			formData.append("message", message);
			void signalRConnection.send("UserIsTyping", loggedInUser.personNumber, "");
		} else if (images) {
			_.forEach(images, (image, i) => {
				if (image instanceof File) {
					formData.append(`image-${_.toString(i)}`, image);
				}
			});
		}

		formData.append("senderPersonNumber", getSenderPersonNumber(selectedInquiry));
		formData.append("receiverPersonNumber", getReceiverPersonNumber(selectedInquiry));
		formData.append("inquiryId", _.toString(selectedInquiry.id));

		await dispatch(inquiryThunks.sendMessageRequest(formData));
		if (_.size(message)) {
			setMessage("");
			setImages(undefined);
			setTotalImages(0);
		}
	}, [dispatch, images, message, selectedInquiry, signalRConnection]);

	const onImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const uploadedImages = e.target.files;
		if (uploadedImages) {
			setImages(uploadedImages);
			setTotalImages(_.size(uploadedImages));
		}
	}, []);

	return _.isNil(selectedInquiry) ? (
		<Spinner />
	) : (
		<>
			<InquiryChatHeader patientLetters={patientLetters} nurseLetters={nurseLetters} />
			<InquiryChatDateDivider />
			<InquiryChatMessages
				chatMessages={chatMessages}
				nurseLetters={nurseLetters}
				patientLetters={patientLetters}
			/>
			{isTyping && (
				<Typography variant="h4" ml={2} mb={2}>
					{getSenderFirstName(selectedInquiry)} Is Typing ....
				</Typography>
			)}
			<Divider />
			<InquiryChatInputWrapper>
				<Grid item xs={4} sm={6} md={9} display="flex" alignItems="center">
					<Avatar>
						{loggedInUser.personNumber === selectedInquiry.patientPersonNumber
							? patientLetters
							: nurseLetters}
					</Avatar>
					<InputBase
						sx={{ fontSize: 16, p: theme.spacing(1), width: "100%" }}
						autoFocus
						placeholder="Type here..."
						fullWidth
						value={message}
						onChange={onChatMessageChange}
						onKeyDown={(e: KeyboardEvent) => {
							if (isEnterPressed(e)) {
								void sendMessage();
							}
						}}
						disabled={totalImages > 0}
					/>
				</Grid>
				<Grid item display="flex" alignItems="center" justifyContent="space-between" marginInlineStart="auto">
					{totalImages > 0 && (
						<Typography fontSize={16} color={theme.colors.success.main}>
							Total uploaded images: {totalImages}
						</Typography>
					)}
					<input
						style={{ display: "none" }}
						id={chatImageUploadId}
						type="file"
						accept="image/*"
						onChange={onImageUpload}
					/>
					<Tooltip arrow placement="top" title={_.isEmpty(message) && "Attach an image"}>
						<label htmlFor={chatImageUploadId}>
							<IconButton component="span" sx={{ mx: 1 }} color="primary" disabled={!_.isEmpty(message)}>
								<AttachFileTwoToneIcon fontSize="small" />
							</IconButton>
						</label>
					</Tooltip>
					<Button
						startIcon={<SendTwoToneIcon />}
						variant="contained"
						sx={{
							":focus": {
								bgcolor: "rgb(112, 99, 192)"
							}
						}}
						disabled={!_.size(message) && totalImages === 0}
						onClick={() => {
							void sendMessage();
						}}
					>
						Send
					</Button>
				</Grid>
			</InquiryChatInputWrapper>
		</>
	);
}
