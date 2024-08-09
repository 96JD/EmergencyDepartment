import _ from "lodash";
import { ReactNode } from "react";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { List, ListSubheader } from "@mui/material";
import { useExperiment } from "@optimizely/react-sdk";

import { OPTIMIZELY_FEATURE_TOGGLE } from "../../../../AppFeatureToggler";
import { APP_ROUTES } from "../../../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../../../models/UserRole";
import { UserUtils } from "../../../functions/UserUtils";
import SidebarMenuList from "./SidebarMenuList";
import SidebarMenuListWrapper from "./SidebarMenuListWrapper";
import SidebarMenuWrapper from "./SidebarMenuWrapper";

export interface SidebarItem {
	label: string;
	icon: ReactNode;
	link: string;
	visible: boolean;
}

export interface SidebarNavigationMenu {
	subHeader: string;
	sidebarItems: SidebarItem[];
}

export default function SidebarMenu() {
	const [analyticsFeaturePaid] = useExperiment(OPTIMIZELY_FEATURE_TOGGLE.ANALYTICS_PAID);

	const loggedInUser = UserUtils.getLoggedInUser();

	const inquiriesMenuItems: SidebarItem[] = [
		{
			label: "New Inquiry",
			icon: <ControlPointIcon />,
			link: `/${APP_ROUTES.INQUIRY_FORM}`,
			visible: loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT
		},
		{
			label: "All Inquiries",
			icon: <DocumentScannerIcon />,
			link: `/${APP_ROUTES.INQUIRY_LIST}`,
			visible: true
		},
		{
			label: "Analytics",
			icon: <AnalyticsIcon />,
			link: `/${APP_ROUTES.INQUIRY_ANALYTICS}`,
			visible:
				loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN &&
				analyticsFeaturePaid === OPTIMIZELY_FEATURE_TOGGLE.ON
		}
	];

	const databaseMenuItems: SidebarItem[] = [
		{
			label: "FAQs",
			icon: <QuestionAnswerIcon />,
			link: `/${APP_ROUTES.FAQ_LIST}`,
			visible: true
		},
		{
			label: "Users",
			icon: <GroupIcon />,
			link: `/${APP_ROUTES.USER_LIST}`,
			visible: loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN
		}
	];

	const sidebarMenus: SidebarNavigationMenu[] = [
		{
			subHeader: "Inquiries",
			sidebarItems: inquiriesMenuItems
		},
		{
			subHeader: "Database",
			sidebarItems: databaseMenuItems
		}
	];

	return (
		<SidebarMenuWrapper>
			{_.map(sidebarMenus, (menu) => (
				<List key={menu.subHeader} component="div">
					<ListSubheader component="div" disableSticky>
						{menu.subHeader}
					</ListSubheader>
					<SidebarMenuListWrapper>
						<SidebarMenuList sidebarItems={menu.sidebarItems} />
					</SidebarMenuListWrapper>
				</List>
			))}
		</SidebarMenuWrapper>
	);
}
