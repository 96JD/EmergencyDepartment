import { NavLink } from "react-router-dom";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { alpha, Box, Button, Container, Grid, lighten, Typography, useTheme } from "@mui/material";

import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { UserUtils } from "../../functions/UserUtils";

interface Props {
	route: string;
	heading: string;
	subHeading: string;
}

export default function PageTitleWrapper({ route, heading, subHeading }: Readonly<Props>) {
	const theme = useTheme();
	const loggedInUser = UserUtils.getLoggedInUser();
	return (
		<Box
			p={theme.spacing(2)}
			mb={theme.spacing(2)}
			boxShadow={`0 1px 0 ${alpha(
				lighten(theme.colors.primary.main, 0.7),
				0.15
			)}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`}
			bgcolor={theme.colors.alpha.trueWhite[5]}
		>
			<Container maxWidth="lg">
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<Typography variant="h3">{heading}</Typography>
						<Typography variant="subtitle2">{subHeading}</Typography>
					</Grid>
					{loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN && (
						<Grid item>
							<Button
								component={NavLink}
								to={route}
								variant="contained"
								sx={{ mt: { xs: 2, md: 0 }, bgcolor: "#5849AE" }}
								startIcon={<AddTwoToneIcon fontSize="small" />}
							>
								Add new {heading}
							</Button>
						</Grid>
					)}
				</Grid>
			</Container>
		</Box>
	);
}
