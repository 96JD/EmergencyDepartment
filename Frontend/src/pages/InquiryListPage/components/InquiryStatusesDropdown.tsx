import { addParamToUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { useCallback } from "react";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { APP_URL_PARAMS } from "../../../AppUrlParams";
import { inquiryStatusSelectors } from "../../../redux/inquiryStatus/selectors";
import { inquiryStatusThunks } from "../../../redux/inquiryStatus/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Spinner from "../../../shared/components/Loader/components/Spinner";
import NoDataFound from "../../../shared/components/NoDataFound";

export default function InquiryStatusesDropdown() {
	const dispatch = useAppDispatch();
	const loadingAllInquiryStatuses = useAppSelector(inquiryStatusSelectors.loadingAllInquiryStatuses);
	const allInquiryStatuses = useAppSelector(inquiryStatusSelectors.allInquiryStatuses);
	const selectedInquiryStatusId = useAppSelector(inquiryStatusSelectors.selectedInquiryStatusId);
	const defaultInquiryStatusId = !_.isEmpty(allInquiryStatuses) ? selectedInquiryStatusId : "";

	const allInquiryStatusOptions = _.isEmpty(allInquiryStatuses) ? (
		<NoDataFound data="Inquiry Statuses" />
	) : (
		_.map(allInquiryStatuses, (inquiryStatus) => (
			<MenuItem key={inquiryStatus.id} value={inquiryStatus.id}>
				{inquiryStatus.name}
			</MenuItem>
		))
	);

	const onInquiryStatusChange = useCallback(
		(e: SelectChangeEvent<number>) => {
			const selectedInquiryStatusId = _.toNumber(e.target.value);
			dispatch(inquiryStatusThunks.setSelectedInquiryStatusId(selectedInquiryStatusId));
			addParamToUrl(APP_URL_PARAMS.SELECTED_INQUIRY_STATUS_ID, _.toString(selectedInquiryStatusId));
		},
		[dispatch]
	);

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel>Status</InputLabel>
			<Select
				label="Status"
				inputProps={{ "aria-label": "Status" }}
				autoComplete="Status"
				value={defaultInquiryStatusId}
				onChange={onInquiryStatusChange}
			>
				{loadingAllInquiryStatuses ? <Spinner /> : allInquiryStatusOptions}
			</Select>
		</FormControl>
	);
}
