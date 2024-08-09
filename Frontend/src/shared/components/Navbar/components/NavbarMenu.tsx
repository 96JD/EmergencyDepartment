import _ from "lodash";
import { NavLink } from "react-router-dom";

import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useExperiment } from "@optimizely/react-sdk";

import { OPTIMIZELY_FEATURE_TOGGLE } from "../../../../AppFeatureToggler";
import { APP_ROUTES } from "../../../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../../../models/UserRole";
import { UserUtils } from "../../../functions/UserUtils";
import NavbarMenuWrapper from "./NavbarMenuWrapper";

export default function NavbarMenu() {
	const [analyticsFeaturePaid] = useExperiment(OPTIMIZELY_FEATURE_TOGGLE.ANALYTICS_PAID);

	const loggedInUser = UserUtils.getLoggedInUser();

	const menuItems = [
		{
			label: "New Inquiry",
			link: `/${APP_ROUTES.INQUIRY_FORM}`,
			visible: loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT
		},
		{
			label: "All Inquiries",
			link: `/${APP_ROUTES.INQUIRY_LIST}`,
			visible: true
		},
		{
			label: "Analytics",
			link: `/${APP_ROUTES.INQUIRY_ANALYTICS}`,
			visible:
				loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN &&
				analyticsFeaturePaid === OPTIMIZELY_FEATURE_TOGGLE.ON
		},
		{
			label: "FAQs",
			link: `/${APP_ROUTES.FAQ_LIST}`,
			visible: true
		},
		{
			label: "Users",
			link: `/${APP_ROUTES.USER_LIST}`,
			visible: loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN
		}
	];

	return (
		<NavbarMenuWrapper>
			<List component={Box} display="flex" disablePadding>
				{_.map(
					menuItems,
					(item) =>
						item.visible && (
							<ListItemButton
								key={item.label}
								component={NavLink}
								classes={{ root: "MuiListItem-indicators" }}
								to={item.link}
							>
								<ListItemText primary={item.label} primaryTypographyProps={{ noWrap: true }} />
							</ListItemButton>
						)
				)}
			</List>
		</NavbarMenuWrapper>
	);
}
