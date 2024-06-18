import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "reactstrap";
import PieChart from "@/components/common/charts/PieChart";

import { fetchRedemptions } from "../../../api/dectecApi";
import Loader from "../../common/Loader";
import ErrorBox from "../../common/ErrorBox";

const Redemptions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redemptionsData, setRedemptionsData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRedemptions()
      .then((res) => {
        if (res.success) {
          setRedemptionsData(res?.data);
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const pieChartData = {
    labels: redemptionsData?.map((item) => item?.type + " Points") ?? [],
    series: redemptionsData?.map((item) => item?.pointsInFormat?.value) ?? [],
  };

  return (
    <React.Fragment>
      <Card className="card-height-100">
        <CardHeader className="align-items-center mt-2 pb-4 d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">Redemptions</h4>
          <div className="flex-shrink-0"></div>
        </CardHeader>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorBox error={error} />
        ) : (
          <div className="card-body">
            <div dir="ltr">
              <PieChart
                series={pieChartData?.series}
                labels={pieChartData?.labels}
                height={333}
                data={redemptionsData}
                dataColors='["--vz-primary", "--vz-success", "--vz-warning"]'
              />
            </div>
          </div>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Redemptions;
