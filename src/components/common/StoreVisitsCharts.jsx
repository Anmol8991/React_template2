import { getChartColorsArray } from "@/utils";
import ReactApexChart from "react-apexcharts";

const StoreVisitsCharts = ({ dataColors }) => {
  var chartDonutBasicColors = getChartColorsArray(dataColors);

  const series = [44, 55, 41];
  var options = {
    labels: ["Gift Card", "Donation", "Event"],
    chart: {
      height: 333,
      type: "donut",
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
  };
  return (
    <>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="pie"
        height="333"
        className="apex-charts"
      />
    </>
  );
};

export default StoreVisitsCharts;
