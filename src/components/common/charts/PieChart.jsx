import { getChartColorsArray } from "@/utils";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ dataColors, series, labels, height, data }) => {
  var chartDonutBasicColors = getChartColorsArray(dataColors);

  //   const series = series;
  var options = {
    labels: labels,
    chart: {
      height: 333,
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartDonutBasicColors,
    tooltip: {
      shared: true,
      y:
        data?.map((item) => {
          return {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return `${item.pointsInFormat.prefix}${y.toFixed(
                  item.pointsInFormat.decimals
                )}${item.pointsInFormat.suffix}`;
              }
              return y;
            },
          };
        }) ?? [],
    },
  };
  return (
    <>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="pie"
        height={height}
        className="apex-charts"
      />
    </>
  );
};

export default PieChart;
