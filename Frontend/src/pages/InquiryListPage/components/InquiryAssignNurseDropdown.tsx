import _ from "lodash";
import { useCallback } from "react";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Inquiry } from "../../../models/Inquiry";
import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { User } from "../../../models/User";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userSelectors } from "../../../redux/user/selectors";
import { UserUtils } from "../../../shared/functions/UserUtils";

interface Props {
	inquiry: Inquiry;
}

export default function InquiryAssignNurseDropdown({ inquiry }: Readonly<Props>) {
	const dispatch = useAppDispatch();

	const allNurses = useAppSelector(userSelectors.allNurses);

	const defaultInquiryStatusId =
		inquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.ACTIVE ? "" : inquiry.nursePersonNumber;

	const assignNurse = useCallback(
		async (event: SelectChangeEvent<number>, inquiry: Inquiry) => {
			const updatedInquiry = await dispatch(
				inquiryThunks.updateInquiryRequest({
					...inquiry,
					nursePersonNumber: _.toNumber(event.target.value),
					inquiryStatusId: INQUIRY_STATUS_CONSTANTS.STATUSES.IN_PROGRESS
				})
			);
			await dispatch(inquiryThunks.getSelectedInquiryRequest(updatedInquiry.id));
		},
		[dispatch]
	);

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel>Assign</InputLabel>
			<Select
				label="Assign"
				inputProps={{ "aria-label": "Assign" }}
				disabled={
					inquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_CHAT ||
					inquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY ||
					inquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED
				}
				value={defaultInquiryStatusId as number}
				onChange={(e) => void assignNurse(e, inquiry)}
			>
				{_.map(allNurses, (nurse: User) => (
					<MenuItem key={nurse.phoneNumber} value={nurse.personNumber}>
						{UserUtils.getFullName(nurse)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
