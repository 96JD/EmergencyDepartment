import _ from "lodash";

import { Box, Divider, ListItem, Typography, useTheme } from "@mui/material";

import { inquirySelectors } from "../../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../../redux/store";

export default function NavbarNotificationItem() {
	const theme = useTheme();
	const activeInquiriesCount = useAppSelector(inquirySelectors.activeInquiriesCount);
	return (
		<>
			<ListItem
				tabIndex={0}
				sx={{
					p: 1,
					minWidth: 350,
					":focus, :hover": {
						borderRadius: theme.general.borderRadiusSm,
						outline: 0,
						bgcolor: theme.colors.primary.light
					}
				}}
			>
				<Box flex="1">
					<Box display="flex" justifyContent="space-between">
						<Typography fontWeight="bold">Inquiries</Typography>
					</Box>
					<Typography variant="body2" color="secondary">
						You have
						<Box component="span" color="error.dark">
							{` ${_.toString(activeInquiriesCount)} `}
						</Box>
						active inquiries that needs to be assigned to nurses!
					</Typography>
				</Box>
			</ListItem>
			<Divider component="li" sx={{ my: 1 }} />
		</>
	);
}
