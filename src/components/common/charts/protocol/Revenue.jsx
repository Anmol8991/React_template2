import React from "react";
import ReactApexChart from "react-apexcharts";
import { getChartColorsArray } from "@/utils";

const RevenueChart = ({ dataColors, series, categories }) => {
	var chartColors = getChartColorsArray(dataColors);
	var options = {
		chart: {
			height: 350,
			type: "line",
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},

		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
			width: 3,
		},
		colors: chartColors,
		xaxis: {
			categories: categories,
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return parseInt(value);
				},
			},
		},
	};

	return (
		<React.Fragment>
			<ReactApexChart
				dir="ltr"
				options={options}
				series={series}
				type="line"
				height="350"
				width="85%"
				className="apex-charts"
			/>
		</React.Fragment>
	);
};

export default RevenueChart;
