import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { APP_ROUTES } from "../../../AppRoutes";
import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export default function InquiryChatButton() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const startChat = useCallback(async () => {
		const updatedInquiry = await dispatch(
			inquiryThunks.updateInquiryRequest({
				...selectedInquiry,
				inquiryStatusId: INQUIRY_STATUS_CONSTANTS.STATUSES.IN_CHAT
			})
		);
		const formData = new FormData();
		formData.append("message", "Hi dear patient! I will be assisting you here.");
		formData.append("senderPersonNumber", _.toString(updatedInquiry.nursePersonNumber));
		formData.append("receiverPersonNumber", _.toString(updatedInquiry.patientPersonNumber));
		formData.append("inquiryId", _.toString(updatedInquiry.id));

		const _updatedInquiry = await dispatch(inquiryThunks.sendMessageRequest(formData));
		navigate(`/${APP_ROUTES.INQUIRY_CHAT}/${_.toString(_updatedInquiry.id)}`);
	}, [dispatch, navigate, selectedInquiry]);

	return (
		<Box display="flex" justifyContent="center">
			<Button
				variant="contained"
				size="small"
				sx={{
					":focus": {
						bgcolor: "rgb(112, 99, 192)"
					}
				}}
				onClick={() => {
					void startChat();
				}}
			>
				Chat with patient
			</Button>
		</Box>
	);
}
