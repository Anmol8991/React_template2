import React from "react";
import ReactApexChart from "react-apexcharts";
import { getChartColorsArray } from "@/utils";
const DonutChart = ({ dataColors, series, labels, height, totalRevenue }) => {
  var donutchartportfolioColors = getChartColorsArray(dataColors);
  var options = {
    animation: {
      animateRotate: true,
      animateScale: true,
      animationDelay: "4s",
    },
    labels: labels ?? [],
    chart: {
      type: "donut",
      height: 224,
    },

    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "18px",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              color: "#343a40",
              fontWeight: 500,
              offsetY: 5,
              formatter: function (val) {
                return "$" + val + " k";
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label: "Total Revenue",
              fontWeight: 500,
              formatter: function (w) {
                return totalRevenue;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    stroke: {
      lineCap: "round",
      width: 2,
    },
    colors: donutchartportfolioColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series ?? []}
        type="donut"
        height={height}
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default DonutChart;
