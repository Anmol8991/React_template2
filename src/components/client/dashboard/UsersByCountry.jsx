import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import BarChart from "@/components/common/charts/BarChart";

const UsersByCountry = () => {
  const barChartData = {
    categories: [
      "Arkansas (AR)",
      "California (CA)",
      "Montana(MT)",
      "Nebraska(NE)",
    ],
    series: [
      {
        data: [380, 200, 150, 275],
      },
    ],
  };

  return (
    <React.Fragment>
      <Card>
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Users by country</h4>
          <div className="d-flex gap-1"></div>
        </div>
        <div className="card-body py-3">
          <div>
            <BarChart
              categories={barChartData.categories}
              series={barChartData.series}
              dataColors='[ "--vz-primary", "--vz-info",  "--vz-danger", "--vz-warning"]'
              width="85%"
              height={300}
            />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default UsersByCountry;
