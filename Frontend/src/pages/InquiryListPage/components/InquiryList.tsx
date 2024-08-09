import _ from "lodash";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";

import { Box, Divider, Grid, Table, TableContainer, TablePagination } from "@mui/material";

import { Inquiry, INQUIRY_CONSTANTS } from "../../../models/Inquiry";
import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryStatusSelectors } from "../../../redux/inquiryStatus/selectors";
import { useAppSelector } from "../../../redux/store";
import Spinner from "../../../shared/components/Loader/components/Spinner";
import NoDataFound from "../../../shared/components/NoDataFound";
import { UserUtils } from "../../../shared/functions/UserUtils";
import { filterInquiries } from "../functions";
import InquiryFilterNursesDropdown from "./InquiryFilterNursesDropdown";
import InquiryStatusesDropdown from "./InquiryStatusesDropdown";
import InquiryTableBody from "./InquiryTableBody";
import InquiryTableHeader from "./InquiryTableHeader";

export default function InquiryList() {
	const loggedInUser = UserUtils.getLoggedInUser();

	const loadingAllInquiries = useAppSelector(inquirySelectors.loadingAllInquiries);
	const allInquiries = useAppSelector(inquirySelectors.allInquiries) as Inquiry[];
	const selectedInquiryStatusId = useAppSelector(inquiryStatusSelectors.selectedInquiryStatusId);

	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(INQUIRY_CONSTANTS.ROWS_PER_PAGE);

	const [filterNursesPersonNumber, setFilterNursesPersonNumber] = useState<number[]>([]);
	const filteredInquiries = filterInquiries(allInquiries, selectedInquiryStatusId, filterNursesPersonNumber);
	const paginatedInquiries = _.slice(filteredInquiries, page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const handleInquiryNurseChange = useCallback((nursesPersonNumbers: number[]) => {
		setFilterNursesPersonNumber(nursesPersonNumbers);
	}, []);

	const onPageChange = useCallback((_event: MouseEvent | null, newPage: number) => {
		setPage(newPage);
	}, []);

	const onRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(_.toNumber(event.target.value));
	}, []);

	return (
		<>
			<Grid container alignItems="center" justifyContent="space-between">
				<Grid item>
					<Box pb={2} width={150}>
						<InquiryStatusesDropdown />
					</Box>
				</Grid>
				<Grid item>
					{loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT &&
						selectedInquiryStatusId !== INQUIRY_STATUS_CONSTANTS.STATUSES.ACTIVE && (
							<Box display="flex" justifyContent="space-between" pb={2} width={150}>
								<InquiryFilterNursesDropdown handleInquiryNurseChange={handleInquiryNurseChange} />
							</Box>
						)}
				</Grid>
			</Grid>
			<Divider />
			{loadingAllInquiries ? (
				<Spinner />
			) : (
				<>
					{_.isEmpty(paginatedInquiries) ? (
						<Box p={10}>
							<NoDataFound data="Inquiries" />
						</Box>
					) : (
						<>
							<TableContainer>
								<Table>
									<InquiryTableHeader />
									<InquiryTableBody paginatedInquiries={paginatedInquiries} />
								</Table>
							</TableContainer>
							<TablePagination
								component="div"
								count={_.size(filteredInquiries)}
								onPageChange={onPageChange}
								onRowsPerPageChange={onRowsPerPageChange}
								page={page}
								rowsPerPage={rowsPerPage}
								rowsPerPageOptions={INQUIRY_CONSTANTS.PAGINATION_OPTIONS}
							/>
						</>
					)}
				</>
			)}
		</>
	);
}
