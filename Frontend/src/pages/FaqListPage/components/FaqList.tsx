import _ from "lodash";

import { Faq } from "../../../models/Faq";
import { faqSelectors } from "../../../redux/faq/selectors";
import { useAppSelector } from "../../../redux/store";
import NoDataFound from "../../../shared/components/NoDataFound";
import FaqItem from "./FaqItem";

export default function FaqList() {
	const allFaqs = useAppSelector(faqSelectors.allFaqs);
	return _.isEmpty(allFaqs) ? (
		<NoDataFound data="FAQs" />
	) : (
		_.map(allFaqs, (faq: Faq) => <FaqItem key={faq.id} faq={faq} />)
	);
}
