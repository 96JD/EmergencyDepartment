import _ from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogTitle, Divider, List, useTheme } from "@mui/material";

import { APP_ROUTES } from "../../../../AppRoutes";
import { Inquiry } from "../../../../models/Inquiry";
import { inquirySelectors } from "../../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import NavbarSearchInput from "./NavbarSearchInput";
import NavbarSearchItem from "./NavbarSearchItem";
import NavbarSearchResultHeader from "./NavbarSearchResultHeader";
import NavbarTransition from "./NavbarTransition";

interface Props {
	closePopup: () => void;
}

export default function NavbarSearchPopup({ closePopup }: Readonly<Props>) {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const allInquiries = useAppSelector(inquirySelectors.allInquiries);

	const fetchAllInquiries = useCallback(async () => {
		await dispatch(inquiryThunks.getAllInquiriesRequest());
	}, [dispatch]);

	useEffect(() => {
		void fetchAllInquiries();
	}, [fetchAllInquiries]);

	const [searchValue, setSearchValue] = useState<string>("");

	const filteredInquiries = _.filter(
		allInquiries,
		(filteredInquiry: Inquiry) =>
			_.includes(_.toString(filteredInquiry.id), _.toLower(searchValue)) ||
			_.includes(_.toLower(filteredInquiry.title), _.toLower(searchValue)) ||
			_.includes(_.toLower(filteredInquiry.description), _.toLower(searchValue))
	) as Inquiry[];

	const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	}, []);

	const handleInquiryClick = useCallback(
		(inquiryId: number) => {
			navigate(`/${APP_ROUTES.INQUIRY_ITEM}/${_.toString(inquiryId)}`);
			closePopup();
		},
		[navigate, closePopup]
	);

	return (
		<Dialog
			classes={{
				container: "MuiDialog-container",
				paperScrollPaper: "MuiDialog-paperScrollPaper"
			}}
			sx={{
				"& .MuiDialog-container": {
					height: "auto"
				},
				"& .MuiDialog-paperScrollPaper": {
					maxHeight: "calc(100vh - 64px)"
				}
			}}
			fullWidth
			maxWidth="md"
			scroll="paper"
			keepMounted
			TransitionComponent={NavbarTransition}
			open
			onClose={closePopup}
		>
			<DialogTitle p={theme.spacing(3)} bgcolor={theme.colors.alpha.black[5]}>
				<NavbarSearchInput value={searchValue} onChange={handleSearchChange} />
			</DialogTitle>
			<Divider />
			{!_.isEmpty(searchValue) && (
				<DialogContent>
					<NavbarSearchResultHeader searchValue={searchValue} />
					<Divider sx={{ my: 1 }} />
					<List disablePadding>
						{_.map(filteredInquiries, (filteredInquiry) => (
							<NavbarSearchItem
								key={filteredInquiry.id}
								filteredInquiry={filteredInquiry}
								onClick={() => {
									handleInquiryClick(filteredInquiry.id);
								}}
							/>
						))}
					</List>
				</DialogContent>
			)}
		</Dialog>
	);
}
