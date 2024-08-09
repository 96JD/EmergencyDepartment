import { ReactNode } from "react";

import { Box } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function InquiryChatWrapper({ children }: Readonly<Props>) {
	return (
		<Box display="flex" flexDirection="column" width="100%" height="100vh">
			{children}
		</Box>
	);
}
