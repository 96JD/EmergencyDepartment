import * as dateFNS from "date-fns";

import { Divider, useTheme } from "@mui/material";

import { SHARED_CONSTANTS } from "../../../shared/constants";

export default function InquiryChatDateDivider() {
	const theme = useTheme();
	return (
		<Divider
			sx={{
				mt: 12,
				"& .MuiDivider-wrapper": {
					borderRadius: theme.general.borderRadiusSm,
					textTransform: "none",
					fontSize: 12
				}
			}}
		>
			{dateFNS.format(new Date(), SHARED_CONSTANTS.DATE_FORMAT)}
		</Divider>
	);
}
