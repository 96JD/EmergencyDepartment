import { MouseEvent, useCallback, useState } from "react";

import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { Box } from "@mui/material";

import NavbarUserBoxButton from "./NavbarUserBoxButton";
import NavbarUserBoxPopup from "./NavbarUserBoxPopup";

export default function NavbarUserBox() {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
	const open = Boolean(anchorEl);

	const openUserBoxPopup = useCallback((event: MouseEvent) => {
		setAnchorEl(event.currentTarget as HTMLButtonElement);
	}, []);

	const closeUserBoxPopup = useCallback(() => {
		setAnchorEl(undefined);
	}, []);

	return (
		<Box ml={2}>
			<NavbarUserBoxButton hideUserNameOnSmallScreen onClick={openUserBoxPopup}>
				<ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
			</NavbarUserBoxButton>
			{open && <NavbarUserBoxPopup anchorEl={anchorEl} onClose={closeUserBoxPopup} />}
		</Box>
	);
}
