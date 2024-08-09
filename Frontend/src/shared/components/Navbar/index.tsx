import { Box } from "@mui/material";

import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { UserUtils } from "../../functions/UserUtils";
import SidebarMenuButton from "../Sidebar/components/SidebarMenuButton";
import NavbarMenu from "./components/NavbarMenu";
import NavbarNotificationsBell from "./components/NavbarNotificationsBell";
import NavbarSearch from "./components/NavbarSearch";
import NavbarUserBox from "./components/NavbarUserBox";
import NavbarWrapper from "./components/NavbarWrapper";

export default function Navbar() {
	const loggedInUser = UserUtils.getLoggedInUser();
	return (
		<NavbarWrapper>
			<NavbarMenu />
			<Box display="flex" alignItems="center">
				{loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT && (
					<>
						<NavbarSearch />
						{loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN && <NavbarNotificationsBell />}
					</>
				)}
				<NavbarUserBox />
				<SidebarMenuButton />
			</Box>
		</NavbarWrapper>
	);
}
