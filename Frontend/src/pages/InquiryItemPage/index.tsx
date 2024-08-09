import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { HubConnection } from "@microsoft/signalr";

import { APP_ROUTES } from "../../AppRoutes";
import { INQUIRY_STATUS_CONSTANTS } from "../../models/InquiryStatus";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { inquirySelectors } from "../../redux/inquiry/selectors";
import { inquiryThunks } from "../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userThunks } from "../../redux/user/thunks";
import Spinner from "../../shared/components/Loader/components/Spinner";
import MainWrapper from "../../shared/components/MainWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import InquiryItem from "./components/InquiryItem";

export default function InquiryItemPage() {
	const params = useParams();
	const inquiryId = _.toNumber(params.id);

	const signalRConnection: HubConnection = useOutletContext();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const activeInquiriesCount = useAppSelector(inquirySelectors.activeInquiriesCount);
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const [loadingSelectedInquiry, setLoadingSelectedInquiry] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		setLoadingSelectedInquiry(true);
		await dispatch(inquiryThunks.getSelectedInquiryRequest(inquiryId));
		setLoadingSelectedInquiry(false);
		await dispatch(userThunks.getAllUsersRequest());
	}, [dispatch, inquiryId]);

	useEffect(() => {
		void fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (!_.isNil(selectedInquiry)) {
			const loggedInUser = UserUtils.getLoggedInUser();
			if (
				selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_CHAT &&
				(loggedInUser.personNumber === selectedInquiry.nursePersonNumber ||
					loggedInUser.personNumber === selectedInquiry.patientPersonNumber)
			) {
				navigate(`/${APP_ROUTES.INQUIRY_CHAT}/${_.toString(inquiryId)}`);
			} else if (
				(selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY &&
					loggedInUser.personNumber !== selectedInquiry.nursePersonNumber) ||
				(loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT &&
					loggedInUser.personNumber !== selectedInquiry.patientPersonNumber)
			) {
				navigate(`/${APP_ROUTES.INQUIRY_LIST}`);
			}
		}
	}, [inquiryId, navigate, selectedInquiry]);

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
				<title>Inquiry Item</title>
			</Helmet>
			<MainWrapper>{loadingSelectedInquiry ? <Spinner /> : <InquiryItem />}</MainWrapper>
		</>
	);
}
