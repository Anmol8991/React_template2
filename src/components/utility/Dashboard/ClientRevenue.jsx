import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { revAll, rev1M, rev6M, rev1Y } from "@/data/utility/data";
import LineChart from "@/components/common/charts/LineChart";
import {earnedPointsGraphApi} from "@/api/dectecApi";

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
          const category = res?.data.map(activity => activity.activityName);
          const activityPoints = res?.data.map(val => val.points.value + val.points.suffix);
          const rev = [{ "name": "Earned Points", "type": "bar", "data": activityPoints }];
          const revenueChart = {
            categories: category,
            opacity: [1, 0.9, 1],
          };
          setDataChange(rev);
          setRevenueData(revenueChart);
        } else {
          setError(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [filterData]);

  return (
    <React.Fragment>
      <Card className="card-height-90">
        <CardHeader className="align-items-center mt-2 pb-4 d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">Points Earned</h4>
          <div className="d-flex gap-1">
            <button
              type="button"
              onClick={() => changeData("1w")}
              className="btn btn-soft-secondary btn-sm"
            >
              1W
            </button>
            <button
              type="button"
              onClick={() => changeData("1m")}
              className="btn btn-soft-secondary btn-sm"
            >
              1M
            </button>
            <button
              type="button"
              onClick={() => changeData("6m")}
              className="btn btn-soft-secondary btn-sm"
            >
              6M
            </button>
            <button
              type="button"
              onClick={() => changeData("1y")}
              className="btn btn-soft-secondary btn-sm"
            >
              1Y
            </button>
            <button
              type="button"
              onClick={() => changeData("all")}
              className="btn btn-soft-secondary btn-sm"
            >
              ALL
            </button>
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
                xAxisLabel="Activities"
                role={"utility"}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ClientRevenue;
