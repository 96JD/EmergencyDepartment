import _ from "lodash";
import { MouseEvent, useCallback } from "react";

import { Card, Link, Typography, useTheme } from "@mui/material";

interface Props {
	text: string;
}

export default function InquiryChatTextMessage({ text }: Readonly<Props>) {
	const theme = useTheme();

	const openLink = useCallback((e: MouseEvent) => window.open((e.target as HTMLElement).innerText), []);

	return (
		<Card
			sx={{
				bgcolor: "primary.main",
				color: theme.palette.primary.contrastText,
				p: theme.spacing(2),
				borderRadius: theme.general.borderRadiusXl,
				borderTopRightRadius: theme.general.borderRadius,
				maxWidth: "380px",
				display: "inline-flex",
				wordWrap: "break-word"
			}}
		>
			{_.startsWith(text, "http") ? (
				<Link variant="h2" color="blue" fontWeight="bold" sx={{ cursor: "pointer" }} onClick={openLink}>
					<Typography>{text}</Typography>
				</Link>
			) : (
				text
			)}
		</Card>
	);
}
