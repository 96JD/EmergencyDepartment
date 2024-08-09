import { Divider, List } from "@mui/material";

import Popup from "../../Popup";
import NavbarNotificationItem from "./NavbarNotificationItem";
import NavbarNotificationsHeader from "./NavbarNotificationsHeader";

interface Props {
	anchorEl?: HTMLButtonElement;
	onClose: () => void;
}

export default function NavbarNotificationsPopup({ anchorEl, onClose }: Readonly<Props>) {
	return (
		<Popup anchorEl={anchorEl} onClose={onClose}>
			<NavbarNotificationsHeader />
			<Divider />
			<List>
				<NavbarNotificationItem />
			</List>
		</Popup>
	);
}
