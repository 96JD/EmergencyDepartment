import _ from "lodash";
import Chart from "react-apexcharts";

import { Box, useTheme } from "@mui/material";

import NoDataFound from "../../../shared/components/NoDataFound";
import { getChartOptions } from "../functions";

interface Props {
	activeInquiryData: number[];
	inProgressInquiryData: number[];
	finishedInquiryData: number[];
}

export default function InquiryAnalyticsChart({
	activeInquiryData,
	inProgressInquiryData,
	finishedInquiryData
}: Props) {
	const theme = useTheme();

	const chartOptions = getChartOptions(theme);

	const chartData = [
		{
			name: "active",
			data: activeInquiryData
		},
		{
			name: "in progress",
			data: inProgressInquiryData
		},
		{
			name: "finished",
			data: finishedInquiryData
		}
	];

	return _.isEmpty(chartData) ? (
		<Box py={10}>
			<NoDataFound data="Data" />
		</Box>
	) : (
		<Chart options={chartOptions} series={chartData} type="bar" height={270} />
	);
}
