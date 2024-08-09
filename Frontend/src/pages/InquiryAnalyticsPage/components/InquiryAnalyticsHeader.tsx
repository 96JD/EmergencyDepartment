import { addParamToUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { MouseEvent, useCallback, useMemo, useState } from "react";

import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { Box, ListItemButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";

import { APP_URL_PARAMS } from "../../../AppUrlParams";
import { INQUIRY_CONSTANTS } from "../../../models/Inquiry";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export default function InquiryAnalyticsHeader() {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const selectedAnalyticsPeriodId = useAppSelector(inquirySelectors.selectedAnalyticsPeriodId);
	const selectedAnalyticsPeriod = useMemo(
		() =>
			_.find(INQUIRY_CONSTANTS.ANALYTICS_PERIODS, (_value, key) => key === _.toString(selectedAnalyticsPeriodId)),
		[selectedAnalyticsPeriodId]
	);

	const [anchorEl, setAnchorEl] = useState<HTMLElement>();
	const open = Boolean(anchorEl);

	const openMenu = useCallback((event: MouseEvent) => {
		setAnchorEl(event.currentTarget as HTMLElement);
	}, []);

	const closeMenu = useCallback(() => {
		setAnchorEl(undefined);
	}, []);

	const onPeriodClick = useCallback(
		(periodId: number) => {
			dispatch(inquiryThunks.setSelectedAnalyticsPeriodId(periodId));
			addParamToUrl(APP_URL_PARAMS.SELECTED_ANALYTICS_PERIOD_ID, _.toString(periodId));
		},
		[dispatch]
	);

	return (
		<Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
			<Typography variant="h4">Inquiries Analytics</Typography>
			<ListItemButton
				sx={{
					maxWidth: "120px",
					bgcolor: theme.colors.secondary.main,
					color: "black",
					":focus, :hover": {
						bgcolor: "rgb(126, 131, 154)"
					}
				}}
				onClick={openMenu}
			>
				<Typography variant="h5" mr={1}>
					{selectedAnalyticsPeriod?.text}
				</Typography>
				<ExpandMoreTwoToneIcon fontSize="small" />
			</ListItemButton>
			<Menu
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right"
				}}
				disableScrollLock
				open={open}
				anchorEl={anchorEl}
				onClose={closeMenu}
			>
				{_.map(INQUIRY_CONSTANTS.ANALYTICS_PERIODS, (value, key) => (
					<MenuItem
						key={key}
						onClick={() => {
							onPeriodClick(_.toNumber(key));
						}}
					>
						{value.text}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
}
