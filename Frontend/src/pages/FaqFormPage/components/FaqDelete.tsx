import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, Button, IconButton, Tooltip } from "@mui/material";

import { APP_ROUTES } from "../../../AppRoutes";
import { faqSelectors } from "../../../redux/faq/selectors";
import { faqThunks } from "../../../redux/faq/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export default function FaqDelete() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const selectedFaq = useAppSelector(faqSelectors.selectedFaq);

	const [showDeleteOptions, setShowDeleteOptions] = useState<boolean>(false);

	const toggleDeleteOptions = useCallback(() => {
		setShowDeleteOptions(!showDeleteOptions);
	}, [showDeleteOptions]);

	const deleteFaq = useCallback(async () => {
		await dispatch(faqThunks.deleteFaqRequest(selectedFaq));
		navigate(`/${APP_ROUTES.FAQ_LIST}`);
	}, [dispatch, selectedFaq, navigate]);

	return (
		<Box>
			<Tooltip placement="top" title="Delete" arrow>
				<IconButton size="small" color="error" sx={{ mt: 2 }} onClick={toggleDeleteOptions}>
					<DeleteTwoToneIcon fontSize="large" />
				</IconButton>
			</Tooltip>
			{showDeleteOptions && (
				<Box display="flex" justifyContent="center" gap={1} mt={2}>
					<Button variant="contained" size="small" color="secondary" onClick={toggleDeleteOptions}>
						Cancel
					</Button>
					<Button
						variant="contained"
						size="small"
						color="error"
						onClick={() => {
							void deleteFaq();
						}}
					>
						Confirm
					</Button>
				</Box>
			)}
		</Box>
	);
}
