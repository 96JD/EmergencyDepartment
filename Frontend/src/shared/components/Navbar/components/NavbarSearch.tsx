import { useCallback, useState } from "react";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { IconButton, Tooltip } from "@mui/material";

import NavbarSearchPopup from "./NavbarSearchPopup";

export default function NavbarSearch() {
	const [open, setOpen] = useState<boolean>(false);
	const toggleSearchPopup = useCallback(() => {
		setOpen(!open);
	}, [open]);
	return (
		<>
			<Tooltip arrow title="Search">
				<IconButton color="primary" onClick={toggleSearchPopup}>
					<SearchTwoToneIcon />
				</IconButton>
			</Tooltip>
			{open && <NavbarSearchPopup closePopup={toggleSearchPopup} />}
		</>
	);
}
