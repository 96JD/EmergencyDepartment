import { ReactNode } from "react";

import { Card, Container } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function FormWrapper({ children }: Readonly<Props>) {
	return (
		<Container sx={{ py: 7 }}>
			<Card sx={{ p: 7, borderRadius: 5, textAlign: "center" }}>{children}</Card>
		</Container>
	);
}
