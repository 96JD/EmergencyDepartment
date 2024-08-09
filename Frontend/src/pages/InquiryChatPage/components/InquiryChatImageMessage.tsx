import _ from "lodash";

import { Card, useTheme } from "@mui/material";

import { ChatMessage } from "../../../models/ChatMessage";
import { ImageUtils } from "../../../shared/functions/ImageUtils";

interface Props {
	chatMessages: ChatMessage[];
	chatMessageId: number;
}

export default function InquiryChatImageMessage({ chatMessages, chatMessageId }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Card
			sx={{
				bgcolor: "primary.main",
				color: theme.palette.primary.contrastText,
				p: theme.spacing(2),
				borderRadius: theme.general.borderRadiusXl,
				borderTopRightRadius: theme.general.borderRadius,
				maxWidth: "380px",
				display: "inline-flex"
			}}
		>
			{_.map(
				chatMessages,
				(i) =>
					i.id === chatMessageId &&
					i.imageUrl && (
						<a key={i.id} href={ImageUtils.getImageUrl(i.imageUrl)} target="_blank" rel="noreferrer">
							<img
								src={ImageUtils.getImageUrl(i.imageUrl)}
								alt={ImageUtils.getImageUrl(i.imageUrl)}
								width={200}
								height={150}
							/>
						</a>
					)
			)}
		</Card>
	);
}
