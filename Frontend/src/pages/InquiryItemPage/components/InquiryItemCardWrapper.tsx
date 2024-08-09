import { ReactNode } from "react";

import { Card, CardContent } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function InquiryItemCardWrapper({ children }: Readonly<Props>) {
	return (
		<CardContent>
			<Card sx={{ p: 2.5 }}>{children}</Card>
		</CardContent>
	);
}
