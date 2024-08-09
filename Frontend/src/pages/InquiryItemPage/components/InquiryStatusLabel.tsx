import _ from "lodash";

import { Box, useTheme } from "@mui/material";

import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";

interface Props {
	inquiryStatusId: number;
}

export default function InquiryStatusLabel({ inquiryStatusId }: Readonly<Props>) {
	const theme = useTheme();
	const inquiryStatusLabel = _.find(INQUIRY_STATUS_CONSTANTS.LABELS, (l) => l.id === inquiryStatusId);
	return (
		<Box
			className={`MuiLabel-${inquiryStatusLabel?.color ?? "primary"}`}
			display="inline-flex"
			p={theme.spacing(1)}
			borderRadius={theme.general.borderRadius}
			fontSize={12}
			sx={{
				"&.MuiLabel": {
					"&-primary": {
						backgroundColor: theme.colors.primary.lighter,
						color: theme.palette.primary.main
					},
					"&-black": {
						backgroundColor: theme.colors.alpha.black[100],
						color: theme.colors.alpha.white[100]
					},
					"&-secondary": {
						backgroundColor: theme.colors.secondary.lighter,
						color: theme.palette.secondary.main
					},
					"&-success": {
						backgroundColor: theme.colors.success.lighter,
						color: theme.palette.success.main
					},
					"&-warning": {
						backgroundColor: theme.colors.warning.lighter,
						color: theme.palette.warning.main
					},
					"&-error": {
						backgroundColor: theme.colors.error.lighter,
						color: theme.palette.error.main
					},
					"&-info": {
						backgroundColor: theme.colors.info.lighter,
						color: theme.palette.info.main
					}
				}
			}}
		>
			{inquiryStatusLabel?.text}
		</Box>
	);
}
