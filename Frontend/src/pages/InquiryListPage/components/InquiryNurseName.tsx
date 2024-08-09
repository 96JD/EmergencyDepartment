import { Typography } from "@mui/material";

import { Inquiry } from "../../../models/Inquiry";
import { UserUtils } from "../../../shared/functions/UserUtils";

interface Props {
	inquiry: Inquiry;
}

export default function InquiryNurseName({ inquiry }: Props) {
	return inquiry.nurse ? (
		UserUtils.getFullName(inquiry.nurse)
	) : (
		<Typography component="div" variant="h5" color="error.dark">
			Unassigned yet!
		</Typography>
	);
}
