import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import LineChart from "../../common/charts/LineChart";
import { fetchPointsRewardedPerActivity } from "../../../api/clientApi";
import Loader from "../../common/Loader";
// import LineChart from "../../common/charts/LineChart";

const ClientRevenue = () => {
  const [pointsPerActivityData, setPointsPerActivityData] = useState([]);
  const [dateFilter, setDateFilter] = useState("1m");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchPointsRewardedPerActivity(dateFilter)
      .then((res) => {
        setPointsPerActivityData(res);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateFilter]);

  const { seriesData, categories, prefixes } = pointsPerActivityData.reduce(
    ({ seriesData, categories, prefixes }, { points, activityName }) => ({
      seriesData: [...seriesData, points.value],
      categories: [...categories, activityName],
      prefixes: [...prefixes, points.prefix],
    }),
    { seriesData: [], categories: [], prefixes: [] }
  );
  const lineChartData = {
    series: [
      {
        name: "Earning",
        type: "bar",
        data: seriesData,
      },
    ],
    opacity: [1, 0.9, 1],
  };
  const series = {
    name: "Earning",
    data: seriesData,
    opacity: [1, 0.9, 1],
  };

  const filterOptions = ["1m", "6m", "1y", "all"];
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-0 align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Points Rewarded Per Activity
          </h4>
          <div className="d-flex gap-1">
            {filterOptions.map((data) => (
              <button
                key={data}
                type="button"
                className={`btn btn-sm  ${
                  dateFilter === data
                    ? "bg-secondary text-white"
                    : "btn-soft-secondary"
                }  `}
                style={{ textTransform: "uppercase" }}
                onClick={() => setDateFilter(data)}
              >
                {data}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardBody className="p-0 pb-2">
          {loading ? (
            <Loader />
          ) : (
            <div className="w-100">
              <div dir="ltr">
                <LineChart
                  height={457}
                  series={lineChartData.series}
                  categories={categories}
                  opacity={lineChartData.opacity}
                  width="86%"
                  dataColors='["--vz-primary", "--vz-success", "--vz-danger"]'
                  xAxisLabel="Activities"
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ClientRevenue;
