import { Box, Divider } from "@mui/material";

import Popup from "../../Popup";
import NavbarLogoutButton from "./NavbarLogoutButton";
import NavbarUserBoxButton from "./NavbarUserBoxButton";

interface Props {
	anchorEl?: HTMLButtonElement;
	onClose: () => void;
}

export default function NavbarUserBoxPopup({ anchorEl, onClose }: Readonly<Props>) {
	return (
		<Popup anchorEl={anchorEl} onClose={onClose}>
			<Box p={1}>
				<NavbarUserBoxButton />
				<Divider sx={{ mt: 1 }} />
				<NavbarLogoutButton />
			</Box>
		</Popup>
	);
}
