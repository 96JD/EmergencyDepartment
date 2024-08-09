import { addParamToUrl, getParamFromUrl } from "96jd-url-params-utils";
import _ from "lodash";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { useExperiment } from "@optimizely/react-sdk";

import { OPTIMIZELY_FEATURE_TOGGLE } from "../../AppFeatureToggler";
import { APP_ROUTES } from "../../AppRoutes";
import { APP_URL_PARAMS } from "../../AppUrlParams";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { inquirySelectors } from "../../redux/inquiry/selectors";
import { inquiryThunks } from "../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import MainWrapper from "../../shared/components/MainWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import InquiryAnalytics from "./components/InquiryAnalytics";

export default function InquiryAnalyticsPage() {
	const [analyticsFeaturePaid] = useExperiment(OPTIMIZELY_FEATURE_TOGGLE.ANALYTICS_PAID);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const selectedAnalyticsPeriodId = useAppSelector(inquirySelectors.selectedAnalyticsPeriodId);

	const fetchInquiriesCounts = useCallback(async () => {
		if (!_.isNil(selectedAnalyticsPeriodId)) {
			const currentYear = new Date().getFullYear();
			await dispatch(
				inquiryThunks.getInquiriesCountsRequest(selectedAnalyticsPeriodId === 1 ? currentYear : currentYear - 1)
			);
		}
	}, [dispatch, selectedAnalyticsPeriodId]);

	useEffect(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		switch (loggedInUser.userRoleId) {
			case USER_ROLES_CONSTANTS.PATIENT:
				navigate(`/${APP_ROUTES.INQUIRY_FORM}`);
				break;
			case USER_ROLES_CONSTANTS.NURSE:
				navigate(`/${APP_ROUTES.INQUIRY_LIST}`);
				break;
			case USER_ROLES_CONSTANTS.ADMIN:
				if (analyticsFeaturePaid === OPTIMIZELY_FEATURE_TOGGLE.ON) {
					void fetchInquiriesCounts();
				} else {
					navigate(`/${APP_ROUTES.INQUIRY_LIST}`);
				}
				break;
		}
	}, [analyticsFeaturePaid, fetchInquiriesCounts, navigate]);

	useEffect(() => {
		const analyticsPeriodIdParam = _.toNumber(getParamFromUrl(APP_URL_PARAMS.SELECTED_ANALYTICS_PERIOD_ID));
		const emptyAnalyticsPeriodIdParam = analyticsPeriodIdParam === 0;
		const emptySelectedInquiryStatusIdState = selectedAnalyticsPeriodId === 0;
		if (emptyAnalyticsPeriodIdParam && emptySelectedInquiryStatusIdState) {
			dispatch(inquiryThunks.setSelectedAnalyticsPeriodId(1));
			addParamToUrl(APP_URL_PARAMS.SELECTED_ANALYTICS_PERIOD_ID, "1");
		}
		if (!emptyAnalyticsPeriodIdParam && emptySelectedInquiryStatusIdState) {
			dispatch(inquiryThunks.setSelectedAnalyticsPeriodId(_.toNumber(analyticsPeriodIdParam)));
			addParamToUrl(APP_URL_PARAMS.SELECTED_ANALYTICS_PERIOD_ID, _.toString(analyticsPeriodIdParam));
		} else {
			addParamToUrl(APP_URL_PARAMS.SELECTED_ANALYTICS_PERIOD_ID, _.toString(selectedAnalyticsPeriodId));
		}
	}, [dispatch, selectedAnalyticsPeriodId]);

	return (
		<>
			<Helmet>
				<title>Inquiry Analytics</title>
			</Helmet>
			<MainWrapper>
				<InquiryAnalytics />
			</MainWrapper>
		</>
	);
}
