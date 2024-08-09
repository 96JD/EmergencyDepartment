import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { UserUtils } from "../../../shared/functions/UserUtils";
import InquiryChatButton from "./InquiryChatButton";
import InquiryGridItems from "./InquiryGridItems";
import InquiryImages from "./InquiryImages";
import InquirySummary from "./InquirySummary";

export default function InquiryItem() {
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);
	const loggedInUser = UserUtils.getLoggedInUser();
	return (
		<>
			{selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_PROGRESS &&
				loggedInUser.personNumber === selectedInquiry.nursePersonNumber && <InquiryChatButton />}
			<InquiryGridItems />
			<InquiryImages />
			{(selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY ||
				selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED) && <InquirySummary />}
		</>
	);
}
