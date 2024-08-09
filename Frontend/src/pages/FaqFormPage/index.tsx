import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import { APP_ROUTES } from "../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { faqThunks } from "../../redux/faq/thunks";
import { useAppDispatch } from "../../redux/store";
import FormWrapper from "../../shared/components/FormWrapper";
import Spinner from "../../shared/components/Loader/components/Spinner";
import { UserUtils } from "../../shared/functions/UserUtils";
import FaqDelete from "./components/FaqDelete";
import FaqForm from "./components/FaqForm";

export default function FaqFormPage() {
	const params = useParams();
	const faqIdParam = _.toNumber(params.id);
	const isUpdateForm = !_.isNil(params.id);
	const faqForm = isUpdateForm ? <FaqForm isUpdateForm={isUpdateForm} /> : <FaqForm />;

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loadingSelectedFaq, setLoadingSelectedFaq] = useState<boolean>(false);

	const fetchSelectedFaq = useCallback(async () => {
		setLoadingSelectedFaq(true);
		await dispatch(faqThunks.getSelectedFaqRequest(faqIdParam));
		setLoadingSelectedFaq(false);
	}, [dispatch, faqIdParam]);

	useEffect(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		if (loggedInUser.userRoleId !== USER_ROLES_CONSTANTS.ADMIN) {
			navigate(`/${APP_ROUTES.FAQ_LIST}`);
		} else if (isUpdateForm) {
			void fetchSelectedFaq();
		}
	}, [fetchSelectedFaq, isUpdateForm, navigate]);

	return (
		<>
			<Helmet>
				<title>Faq Form</title>
			</Helmet>
			<FormWrapper>
				{loadingSelectedFaq ? (
					<Spinner />
				) : (
					<>
						{faqForm}
						{isUpdateForm && <FaqDelete />}
					</>
				)}
			</FormWrapper>
		</>
	);
}
