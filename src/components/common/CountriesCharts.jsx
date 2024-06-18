import { getChartColorsArray } from "@/utils";
import ReactApexChart from "react-apexcharts";

const CountriesCharts = ({ dataColors }) => {
  var barchartCountriesColors = getChartColorsArray(dataColors);

  const series = [
    {
      data: [380, 200, 150, 275],
    },
  ];
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
        colors: ["#adb5bd"],
      },
    },

    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
        "Arkansas (AR)",
        "California (CA)",
        "Montana(MT)",
        "Nebraska(NE)",
      ],
    },
  };
  return (
    <>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="bar"
        height="222"
        width="85%"
        className="apex-charts"
      />
    </>
  );
};

export default CountriesCharts;
