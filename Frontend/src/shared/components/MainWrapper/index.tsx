import { ReactNode } from "react";

import { Card, Container } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function MainWrapper({ children }: Readonly<Props>) {
	return (
		<Container sx={{ py: 1 }}>
			<Card sx={{ p: 2, borderRadius: 2.5 }}>{children}</Card>
		</Container>
	);
}
