import _ from "lodash";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Badge, Box, Grid, Typography, useTheme } from "@mui/material";

interface Props {
	activeInquiryData: number[];
	inProgressInquiryData: number[];
	finishedInquiryData: number[];
}

export default function InquiryAnalyticsCounts({
	activeInquiryData,
	inProgressInquiryData,
	finishedInquiryData
}: Readonly<Props>) {
	const theme = useTheme();

	const counts = [
		{
			icon: <NotificationsActiveIcon htmlColor={theme.colors.primary.main} />,
			text: "Active",
			sum: _.sum(activeInquiryData)
		},
		{
			icon: <LoopIcon color="warning" />,
			text: "In progress",
			sum: _.sum(inProgressInquiryData)
		},
		{
			icon: <CheckCircleIcon htmlColor={theme.colors.success.main} />,
			text: "Finished",
			sum: _.sum(finishedInquiryData)
		}
	];

	return (
		<Grid container sx={{ pt: 2.5 }} spacing={2}>
			{_.map(counts, (count) => (
				<Grid
					key={count.text}
					item
					xs={12}
					sm={4}
					display="flex"
					sx={{ justifyContent: { xs: "start", sm: "center" } }}
				>
					<Badge
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right"
						}}
						overlap="circular"
					>
						{count.icon}
					</Badge>
					<Box ml={2}>
						<Typography variant="h4" noWrap>
							{count.text}
						</Typography>
						{count.sum}
					</Box>
				</Grid>
			))}
		</Grid>
	);
}
