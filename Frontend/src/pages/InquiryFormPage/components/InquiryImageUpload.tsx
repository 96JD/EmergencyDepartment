import { isEnterPressed } from "96jd-accessibility-utils";
import { KeyboardEvent, useCallback } from "react";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Box, Card, InputLabel, Tooltip, Typography, useTheme } from "@mui/material";

interface Props {
	imageUploadId: string;
	totalImages: number;
}

export default function InquiryImageUpload({ imageUploadId, totalImages }: Readonly<Props>) {
	const theme = useTheme();

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => isEnterPressed(event) && document.getElementById(imageUploadId)?.click(),
		[imageUploadId]
	);

	return (
		<>
			<InputLabel htmlFor={imageUploadId}>
				<Tooltip arrow title="Click to add images">
					<Card
						tabIndex={0}
						sx={{
							width: "100%",
							height: "100%",
							border: `${theme.colors.alpha.black[50]} dashed 1px`,
							cursor: "pointer",
							":focus, :hover": {
								outline: 0,
								borderColor: theme.colors.primary.main
							}
						}}
						onKeyDown={handleKeyPress}
					>
						<Box width="auto" height={theme.spacing(8)} p={2} bgcolor={theme.colors.alpha.black[5]}>
							<AddTwoToneIcon fontSize="large" />
						</Box>
					</Card>
				</Tooltip>
			</InputLabel>
			{totalImages > 0 && (
				<Typography mt={1} fontSize={16} color={theme.colors.success.main}>
					Total uploaded images: {totalImages}
				</Typography>
			)}
		</>
	);
}
