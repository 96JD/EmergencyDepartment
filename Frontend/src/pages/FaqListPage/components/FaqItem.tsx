import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardContent, Link } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { APP_ROUTES } from "../../../AppRoutes";
import { Faq } from "../../../models/Faq";
import { USER_ROLES_CONSTANTS } from "../../../models/UserRole";
import { UserUtils } from "../../../shared/functions/UserUtils";

interface Props {
	faq: Faq;
}

export default function FaqItem({ faq }: Readonly<Props>) {
	const navigate = useNavigate();

	const onQuestionClick = useCallback(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		if (loggedInUser.userRoleId === USER_ROLES_CONSTANTS.ADMIN) {
			navigate(`/${APP_ROUTES.FAQ_FORM}/${_.toString(faq.id)}`);
		}
	}, [faq.id, navigate]);

	return (
		<CardContent>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Link href="#" onClick={onQuestionClick}>
						<Typography>{faq.question}</Typography>
					</Link>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>{faq.answer}</Typography>
				</AccordionDetails>
			</Accordion>
		</CardContent>
	);
}
