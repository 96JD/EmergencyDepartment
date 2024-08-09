import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { APP_ROUTES } from "../../AppRoutes";
import { faqSelectors } from "../../redux/faq/selectors";
import { faqThunks } from "../../redux/faq/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Spinner from "../../shared/components/Loader/components/Spinner";
import MainWrapper from "../../shared/components/MainWrapper";
import PageTitleWrapper from "../../shared/components/PageTitleWrapper";
import FaqList from "./components/FaqList";

export default function FaqListPage() {
	const dispatch = useAppDispatch();

	const loadingAllFaqs = useAppSelector(faqSelectors.loadingAllFaqs);

	const fetchAllFaqs = useCallback(async () => {
		await dispatch(faqThunks.getAllFaqsRequest());
	}, [dispatch]);

	useEffect(() => {
		void fetchAllFaqs();
	}, [fetchAllFaqs]);

	return (
		<>
			<Helmet>
				<title>FAQ List</title>
			</Helmet>
			<PageTitleWrapper
				route={`/${APP_ROUTES.FAQ_FORM}`}
				heading="FAQs"
				subHeading="Frequently asked questions"
			/>
			{loadingAllFaqs ? (
				<Spinner />
			) : (
				<MainWrapper>
					<FaqList />
				</MainWrapper>
			)}
		</>
	);
}
