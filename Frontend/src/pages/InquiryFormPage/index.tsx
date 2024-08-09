import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import FormWrapper from "../../shared/components/FormWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import InquiryForm from "./components/InquiryForm";

export default function InquiryFormPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		if (loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.PATIENT) {
			navigate(`/${APP_ROUTES.INQUIRY_LIST}`);
		}
	}, [navigate]);

	return (
		<>
			<Helmet>
				<title>Inquiry Form</title>
			</Helmet>
			<FormWrapper>
				<InquiryForm />
			</FormWrapper>
		</>
	);
}
