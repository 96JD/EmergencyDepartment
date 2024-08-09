import _ from "lodash";
import { useCallback, useState } from "react";

import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

import { User } from "../../../models/User";
import { useAppSelector } from "../../../redux/store";
import { userSelectors } from "../../../redux/user/selectors";
import NoDataFound from "../../../shared/components/NoDataFound";
import { UserUtils } from "../../../shared/functions/UserUtils";

interface Props {
	handleInquiryNurseChange: (nursesPersonNumbers: number[]) => void;
}

export default function InquiryFilterNursesDropdown({ handleInquiryNurseChange }: Readonly<Props>) {
	const allNurses = useAppSelector(userSelectors.allNurses);

	const [filterNursesPersonNumber, setFilterNursesPersonNumber] = useState<number[]>([]);
	const [filterNursesFullName, setFilterNursesFullName] = useState<string[]>([]);

	const handleNurseFilterSelected = useCallback(
		(nurse: User) => {
			const nurseFullName = UserUtils.getFullName(nurse);
			const nursePersonNumber = nurse.personNumber;

			if (_.indexOf(filterNursesPersonNumber, nursePersonNumber) === -1) {
				setFilterNursesPersonNumber((n) => [...n, nursePersonNumber]);
				setFilterNursesFullName((n) => [...n, nurseFullName]);
				handleInquiryNurseChange([...filterNursesPersonNumber, nursePersonNumber]);
			} else {
				setFilterNursesPersonNumber(_.filter(filterNursesPersonNumber, (n) => n !== nursePersonNumber));
				setFilterNursesFullName(_.filter(filterNursesFullName, (n) => n !== nurseFullName));
				handleInquiryNurseChange(_.filter(filterNursesPersonNumber, (n) => n !== nursePersonNumber));
			}
		},
		[filterNursesFullName, filterNursesPersonNumber, handleInquiryNurseChange]
	);

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel>Nurse</InputLabel>
			<Select
				multiple
				input={<OutlinedInput label="Nurse" />}
				value={filterNursesFullName}
				renderValue={(selected) => selected.join(", ")}
			>
				{_.isEmpty(allNurses) ? (
					<NoDataFound data="Nurses" />
				) : (
					_.map(allNurses, (nurse: User) => (
						<MenuItem
							key={nurse.personNumber}
							value={nurse.personNumber}
							onClick={() => {
								handleNurseFilterSelected(nurse);
							}}
						>
							<Checkbox checked={_.indexOf(filterNursesPersonNumber, nurse.personNumber) > -1} />
							<ListItemText primary={UserUtils.getFullName(nurse)} />
						</MenuItem>
					))
				)}
			</Select>
		</FormControl>
	);
}
