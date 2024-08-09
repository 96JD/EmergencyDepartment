import { ReactNode } from "react";

import { Popover } from "@mui/material";

interface Props {
	anchorEl?: HTMLButtonElement;
	onClose: () => void;
	children: ReactNode;
}

export default function Popup({ anchorEl, onClose, children }: Readonly<Props>) {
	return (
		<Popover
			anchorOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open
			anchorEl={anchorEl}
			onClose={onClose}
		>
			{children}
		</Popover>
	);
}
