import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Avatar, Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";

import { APP_ROUTES } from "../../../AppRoutes";
import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { UserUtils } from "../../../shared/functions/UserUtils";

interface Props {
	nurseLetters?: string;
	patientLetters?: string;
}

export default function InquiryChatHeader({ nurseLetters, patientLetters }: Readonly<Props>) {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const loggedInUser = UserUtils.getLoggedInUser();

	const nurseFullName = selectedInquiry.nurse && UserUtils.getFullName(selectedInquiry.nurse);
	const patientFullName = selectedInquiry.patient && UserUtils.getFullName(selectedInquiry.patient);

	const endChat = useCallback(async () => {
		const formData = new FormData();
		formData.append("message", "Chat is ended.");

		const updatedInquiry = await dispatch(inquiryThunks.sendMessageRequest(formData));
		const _updatedInquiry = await dispatch(
			inquiryThunks.updateInquiryRequest({
				...updatedInquiry,
				inquiryStatusId: INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY
			})
		);
		navigate(`/${APP_ROUTES.INQUIRY_ITEM}/${_.toString(_updatedInquiry.id)}`);
	}, [dispatch, navigate]);

	return (
		<Box
			position="fixed"
			alignItems="center"
			width="inherit"
			p={theme.spacing(2)}
			borderBottom={`${theme.colors.alpha.black[10]} solid 1px`}
			bgcolor={theme.colors.alpha.white[100]}
			zIndex={1}
		>
			<Box
				sx={{
					[theme.breakpoints.up("lg")]: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					}
				}}
			>
				<Box display="flex" alignItems="center">
					<Avatar variant="rounded" sx={{ width: 48, height: 48 }}>
						{loggedInUser.personNumber === selectedInquiry.patientPersonNumber
							? nurseLetters
							: patientLetters}
					</Avatar>
					<Box ml={1}>
						<Typography variant="h4">
							{loggedInUser.personNumber === selectedInquiry.patientPersonNumber
								? nurseFullName
								: patientFullName}
						</Typography>
					</Box>
					{loggedInUser.personNumber === selectedInquiry.nursePersonNumber && (
						<Tooltip
							sx={{ ml: 1 }}
							placement="bottom"
							title="End chat with patient"
							onClick={() => {
								void endChat();
							}}
						>
							<IconButton color="success">
								<CheckCircleOutlineIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			</Box>
		</Box>
	);
}
