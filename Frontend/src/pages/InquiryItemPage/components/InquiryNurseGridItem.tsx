import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../redux/store";
import { UserUtils } from "../../../shared/functions/UserUtils";
import InquiryAssignNurseDropdown from "../../InquiryListPage/components/InquiryAssignNurseDropdown";

export default function InquiryNurseGridItem() {
	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const loggedInUser = UserUtils.getLoggedInUser();

	if (loggedInUser.userRoleId === USER_ROLES_CONSTANTS.PATIENT) {
		const nurse = selectedInquiry.nurse;
		if (nurse) {
			return selectedInquiry.nursePersonNumber ? UserUtils.getFullName(nurse) : "Unassigned yet!";
		}
	} else {
		return <InquiryAssignNurseDropdown inquiry={selectedInquiry} />;
	}
}
