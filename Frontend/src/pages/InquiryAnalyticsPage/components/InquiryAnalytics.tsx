import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { mapInquiryCounts } from "../functions";
import InquiryAnalyticsChart from "./InquiryAnalyticsChart";
import InquiryAnalyticsCounts from "./InquiryAnalyticsCounts";
import InquiryAnalyticsHeader from "./InquiryAnalyticsHeader";

export default function InquiryAnalytics() {
	const inquiriesCounts = useAppSelector(inquirySelectors.inquiriesCounts);

	const activeInquiryData = mapInquiryCounts(inquiriesCounts.activeInquiriesCount);
	const inProgressInquiryData = mapInquiryCounts(inquiriesCounts.inProgressInquiriesCount);
	const finishedInquiryData = mapInquiryCounts(inquiriesCounts.finishedInquiriesCount);

	return (
		<>
			<InquiryAnalyticsHeader />
			<InquiryAnalyticsCounts
				activeInquiryData={activeInquiryData}
				inProgressInquiryData={inProgressInquiryData}
				finishedInquiryData={finishedInquiryData}
			/>
			<InquiryAnalyticsChart
				activeInquiryData={activeInquiryData}
				inProgressInquiryData={inProgressInquiryData}
				finishedInquiryData={finishedInquiryData}
			/>
		</>
	);
}
