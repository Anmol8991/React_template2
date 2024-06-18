import { getChartColorsArray } from "@/utils";
import ReactApexChart from "react-apexcharts";

const CountriesCharts = ({ dataColors, series, categories, height, width }) => {
  var barchartCountriesColors = getChartColorsArray(dataColors);
  var options = {
    chart: {
      type: "bar",
      height: 222,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },

    colors: barchartCountriesColors,
    dataLabels: {
      enabled: true,
      offsetX: 32,
      style: {
        fontSize: "12px",
        fontWeight: 400,
        colors: ["#fff"],
      },
    },

    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: { categories: categories },
  };
  return (
    <>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="bar"
        height={height}
        width={width}
        className="apex-charts"
      />
    </>
  );
};

export default CountriesCharts;
