import _ from "lodash";

import { Grid, Typography } from "@mui/material";

import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { DateUtils } from "../../../shared/functions/DateUtils";
import InquiryItemCardWrapper from "./InquiryItemCardWrapper";
import InquiryNurseGridItem from "./InquiryNurseGridItem";
import InquiryStatusLabel from "./InquiryStatusLabel";

export default function InquiryGridItems() {
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const gridItems = [
		{
			label: "Title",
			value: selectedInquiry.title
		},
		{
			label: "Description",
			value: selectedInquiry.description
		},
		{
			label: "Date",
			value: selectedInquiry.receivedDate && DateUtils.formatTimestampDistance(selectedInquiry.receivedDate)
		},
		{
			label: "Status",
			value: <InquiryStatusLabel inquiryStatusId={selectedInquiry.inquiryStatusId} />
		},
		{
			label: "Nurse",
			value: <InquiryNurseGridItem />
		}
	];

	return (
		<InquiryItemCardWrapper>
			<Grid container spacing={1}>
				{_.map(gridItems, (item) => (
					<Grid item key={item.label} xs={12}>
						<Typography fontSize={14} color="secondary" my={0.5}>
							{item.label}
						</Typography>
						<Typography variant="h5">{item.value}</Typography>
					</Grid>
				))}
			</Grid>
		</InquiryItemCardWrapper>
	);
}
