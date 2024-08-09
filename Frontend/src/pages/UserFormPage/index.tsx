import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import { APP_ROUTES } from "../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { useAppDispatch } from "../../redux/store";
import { userThunks } from "../../redux/user/thunks";
import FormWrapper from "../../shared/components/FormWrapper";
import Spinner from "../../shared/components/Loader/components/Spinner";
import { UserUtils } from "../../shared/functions/UserUtils";
import UserForm from "./components/UserForm";

export default function UserFormPage() {
	const params = useParams();
	const userPersonNumberParam = _.toNumber(params.personNumber);
	const isUpdateForm = !_.isNil(params.personNumber);
	const userForm = isUpdateForm ? <UserForm isUpdateForm={isUpdateForm} /> : <UserForm />;

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loadingSelectedUser, setLoadingSelectedUser] = useState<boolean>(false);

	const fetchSelectedUser = useCallback(async () => {
		setLoadingSelectedUser(true);
		await dispatch(userThunks.getSelectedUserRequest(userPersonNumberParam));
		setLoadingSelectedUser(false);
	}, [dispatch, userPersonNumberParam]);

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
				if (isUpdateForm) {
					void fetchSelectedUser();
				}
				break;
		}
	}, [fetchSelectedUser, isUpdateForm, navigate]);

	return (
		<>
			<Helmet>
				<title>User Form</title>
			</Helmet>
			<FormWrapper>{loadingSelectedUser ? <Spinner /> : userForm}</FormWrapper>
		</>
	);
}
