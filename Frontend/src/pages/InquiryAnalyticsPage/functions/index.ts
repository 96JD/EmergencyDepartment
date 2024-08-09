import { ApexOptions } from "apexcharts";
import _ from "lodash";

import { Theme } from "@mui/material/styles";

import { InquiryCounts } from "../../../api/repositories/inquiryRepository";

export function mapInquiryCounts(inquiryCounts: InquiryCounts[]) {
	const arr = _.fill(new Array(12), 0);
	_.map(inquiryCounts, (inquiryCount) => {
		arr[inquiryCount.monthIndex] = inquiryCount.count;
	});
	return arr;
}

export function getChartOptions(theme: Theme): ApexOptions {
	return {
		chart: {
			background: "dark",
			type: "bar",
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 6,
				columnWidth: "35%"
			}
		},
		colors: [theme.colors.primary.main, theme.colors.warning.main, theme.colors.success.main],
		dataLabels: {
			enabled: false
		},
		fill: {
			opacity: 1
		},
		theme: {
			mode: theme.palette.mode
		},
		stroke: {
			show: true,
			width: 3,
			colors: ["transparent"]
		},
		legend: {
			show: false
		},
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		grid: {
			strokeDashArray: 5,
			borderColor: theme.palette.divider
		},
		xaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			}
		},
		yaxis: {
			tickAmount: 1,
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			}
		},
		tooltip: {
			x: {
				show: false
			},
			marker: {
				show: false
			},
			y: {
				formatter: function (val: number) {
					return _.toString(val);
				}
			},
			theme: "dark"
		}
	};
}
