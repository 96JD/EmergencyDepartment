import _ from "lodash";
import { useCallback } from "react";
import { Slide } from "react-slideshow-image";

import { Box } from "@mui/material";

import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { ImageUtils } from "../../../shared/functions/ImageUtils";
import InquiryItemCardWrapper from "./InquiryItemCardWrapper";

export default function InquiryImages() {
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const slideIndicators = useCallback(
		(i = 0) => (
			<Box
				className="indicator"
				sx={{
					px: 1,
					py: 0.5,
					mx: 1,
					border: "1px #666 solid",
					cursor: "pointer",
					":hover": {
						opacity: 0.9
					}
				}}
			>
				{i + 1}
			</Box>
		),
		[]
	);

	return (
		<InquiryItemCardWrapper>
			{_.size(selectedInquiry.inquiryImages) ? (
				<Slide arrows={false} indicators={slideIndicators}>
					{_.map(selectedInquiry.inquiryImages, (image) => (
						<a key={image.id} href={ImageUtils.getImageUrl(image.url)} target="_blank" rel="noreferrer">
							<img
								src={ImageUtils.getImageUrl(image.url)}
								alt={ImageUtils.getImageUrl(image.url)}
								height={250}
								width="100%"
							/>
						</a>
					))}
				</Slide>
			) : (
				<Box textAlign="center">No Images Provided!</Box>
			)}
		</InquiryItemCardWrapper>
	);
}
