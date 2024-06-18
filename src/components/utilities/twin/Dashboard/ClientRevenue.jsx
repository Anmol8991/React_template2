import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { revAll, rev1M, rev6M, rev1Y } from "@/data/utility/data";
import LineChart from "@/components/common/charts/LineChart";
import { earnedPointsGraphApi } from "@/api/dectecApi";
import Loader from "../../../common/Loader";

const ClientRevenue = () => {
  const [chartData, setDataChange] = useState(revAll);
  const [filterData, setFilterData] = useState("1m");
  const [revenueChartData, setRevenueData] = useState("");
  const [revData, setRevData] = useState("");
  const [loading, setLoading] = useState(false);
  const [earnedPointsData, setEarnedPointsData] = useState([]);

  function changeData(variable) {
    setFilterData(variable);
  }

  useEffect(() => {
    setLoading(true);
    earnedPointsGraphApi(filterData)
      .then((res) => {
        if (res.success) {
          const category = res?.data.map((category) => category.categoryName);
          const activityPoints = res?.data.map(
            (val) => val.points.value + val.points.suffix
          );
          const rev = [
            { name: "Earned Points", type: "bar", data: activityPoints },
          ];
          const revenueChart = {
            categories: category,
            opacity: [1, 0.9, 1],
          };
          setDataChange(rev);
          setRevenueData(revenueChart);
        } else {
          setError(message);
          console.log(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [filterData]);

  const filterOptions = ["1w", "1m", "6m", "1y", "all"];
  return (
    <React.Fragment>
      <Card className="card-height-90">
        {loading ? (
          <Loader />
        ) : (
          <>
            <CardHeader className="align-items-center mt-2 pb-4 d-flex">
              <h4 className="card-title mb-0 flex-grow-1 text-dark">
                Points Earned
              </h4>
              <div className="d-flex gap-1">
                {filterOptions.map((data) => (
                  <button
                    key={data}
                    type="button"
                    className={`btn btn-sm  ${
                      filterData === data
                        ? "bg-secondary text-white"
                        : "btn-soft-secondary"
                    }  `}
                    style={{ textTransform: "uppercase" }}
                    onClick={() => changeData(data)}
                  >
                    {data}
                  </button>
                ))}
              </div>
              <div className="flex-shrink-0"></div>
            </CardHeader>
            <CardBody className="p-0 pb-2">
              <div className="w-100">
                <div dir="ltr">
                  <LineChart
                    height={318}
                    series={chartData}
                    dataColors='["--vz-primary"]'
                    categories={revenueChartData.categories}
                    opacity={revenueChartData.opacity}
                    xAxisLabel="Activity Type"
                    role={"utility"}
                  />
                </div>
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ClientRevenue;
