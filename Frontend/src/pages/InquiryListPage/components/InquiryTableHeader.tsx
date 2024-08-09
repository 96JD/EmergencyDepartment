import _ from "lodash";

import { TableCell, TableHead, TableRow } from "@mui/material";

const TABLE_CELLS = ["Id", "Title", "Date", "Nurse"];

export default function InquiryTableHeader() {
	return (
		<TableHead>
			<TableRow>
				{_.map(TABLE_CELLS, (cell) => (
					<TableCell key={cell}>{cell}</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
