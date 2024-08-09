import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";

import { APP_ROUTES } from "../../../AppRoutes";
import { Inquiry } from "../../../models/Inquiry";
import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { inquiryStatusSelectors } from "../../../redux/inquiryStatus/selectors";
import { useAppSelector } from "../../../redux/store";
import { DateUtils } from "../../../shared/functions/DateUtils";
import { UserUtils } from "../../../shared/functions/UserUtils";
import InquiryAssignNurseDropdown from "./InquiryAssignNurseDropdown";
import InquiryNurseName from "./InquiryNurseName";

interface Props {
	paginatedInquiries: Inquiry[];
}

export default function InquiryTableBody({ paginatedInquiries }: Readonly<Props>) {
	const navigate = useNavigate();

	const selectedInquiryStatusId = useAppSelector(inquiryStatusSelectors.selectedInquiryStatusId);

	const loggedInUser = UserUtils.getLoggedInUser();

	const onInquiryIdClick = useCallback(
		(inquiryId: number) => {
			navigate(`/${APP_ROUTES.INQUIRY_ITEM}/${_.toString(inquiryId)}`);
		},
		[navigate]
	);

	return (
		<TableBody>
			{_.map(paginatedInquiries, (inquiry: Inquiry) => {
				return (
					<TableRow hover key={inquiry.id}>
						<TableCell>
							<Typography
								variant="body1"
								sx={{ cursor: "pointer" }}
								fontWeight="bold"
								color="primary"
								noWrap
								onClick={() => {
									onInquiryIdClick(inquiry.id);
								}}
							>
								{inquiry.id}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="body1" fontWeight="bold" gutterBottom noWrap>
								{inquiry.title}
							</Typography>
							<Typography variant="body2" color="secondary" noWrap>
								{inquiry.description.split(" ").slice(0, 5).join(" ")}
								...
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="body1" fontWeight="bold" gutterBottom noWrap>
								{inquiry.receivedDate && DateUtils.formatTimestampDistance(inquiry.receivedDate)}
							</Typography>
						</TableCell>
						<TableCell>
							{loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT &&
							selectedInquiryStatusId !== INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED ? (
								<Box width={150}>
									<InquiryAssignNurseDropdown inquiry={inquiry} />
								</Box>
							) : (
								<InquiryNurseName inquiry={inquiry} />
							)}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
