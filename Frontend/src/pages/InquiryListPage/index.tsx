import { addParamToUrl, getParamFromUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";

import { HubConnection } from "@microsoft/signalr";

import { APP_URL_PARAMS } from "../../AppUrlParams";
import { INQUIRY_STATUS_CONSTANTS } from "../../models/InquiryStatus";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { inquirySelectors } from "../../redux/inquiry/selectors";
import { inquiryThunks } from "../../redux/inquiry/thunks";
import { inquiryStatusSelectors } from "../../redux/inquiryStatus/selectors";
import { inquiryStatusThunks } from "../../redux/inquiryStatus/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userThunks } from "../../redux/user/thunks";
import MainWrapper from "../../shared/components/MainWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import InquiryList from "./components/InquiryList";

export default function InquiryListPage() {
	const signalRConnection: HubConnection = useOutletContext();

	const dispatch = useAppDispatch();

	const activeInquiriesCount = useAppSelector(inquirySelectors.activeInquiriesCount);
	const selectedInquiryStatusId = useAppSelector(inquiryStatusSelectors.selectedInquiryStatusId);

	const fetchData = useCallback(async () => {
		await dispatch(inquiryThunks.getAllInquiriesRequest());
		await dispatch(inquiryStatusThunks.getAllInquiryStatusesRequest());
		await dispatch(userThunks.getAllUsersRequest());
	}, [dispatch]);

	useEffect(() => {
		void fetchData();
	}, [fetchData]);

	useEffect(() => {
		const inquiryStatusIdParam = _.toNumber(getParamFromUrl(APP_URL_PARAMS.SELECTED_INQUIRY_STATUS_ID));
		const emptyInquiryStatusIdParam = inquiryStatusIdParam === 0;
		const emptySelectedInquiryStatusIdState = selectedInquiryStatusId === 0;
		if (emptyInquiryStatusIdParam && emptySelectedInquiryStatusIdState) {
			const firstStatus = INQUIRY_STATUS_CONSTANTS.STATUSES.ACTIVE;
			dispatch(inquiryStatusThunks.setSelectedInquiryStatusId(firstStatus));
			addParamToUrl(APP_URL_PARAMS.SELECTED_INQUIRY_STATUS_ID, _.toString(firstStatus));
		}
		if (!emptyInquiryStatusIdParam && emptySelectedInquiryStatusIdState) {
			dispatch(inquiryStatusThunks.setSelectedInquiryStatusId(_.toNumber(inquiryStatusIdParam)));
			addParamToUrl(APP_URL_PARAMS.SELECTED_INQUIRY_STATUS_ID, _.toString(inquiryStatusIdParam));
		} else {
			addParamToUrl(APP_URL_PARAMS.SELECTED_INQUIRY_STATUS_ID, _.toString(selectedInquiryStatusId));
		}
	}, [dispatch, selectedInquiryStatusId]);

	useEffect(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		if (loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT) {
			signalRConnection.on("AssigningNurse", (inquiryStatusId: number) => {
				if (inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.ACTIVE) {
					dispatch(inquiryThunks.setActiveInquiriesCount(activeInquiriesCount - 1));
				}
			});
		}
	}, [activeInquiriesCount, dispatch, signalRConnection]);

	return (
		<>
			<Helmet>
				<title>Inquiry List</title>
			</Helmet>
			<MainWrapper>
				<InquiryList />
			</MainWrapper>
		</>
	);
}
