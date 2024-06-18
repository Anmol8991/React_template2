import React from "react";
import { Grid, _ } from "gridjs-react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import {paymentData} from "@/data/protocol/data"
const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

export const PaymentHistoryTable = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0 flex-grow-1">
          {" "}
          <i className="bx bx-history"></i> Payments
        </h4>
      </CardHeader>
      <CardBody>
        <div id="table-gridjs">
          <Grid
            data={paymentData}
            columns={[
              { name: "S.No.", width: "70px" },
              {
                name: "Points Bought",
                // width: "150px",
                formatter: (cell) =>
                  _(
                    <div
                      style={{ fontWeight: "bold" }}
                      className=" text-success"
                    >
                      {cell}{" "}
                    </div>
                  ),
              },
              {
                name: "Amount Paid",
                // width: "270px",
                formatter: (cell) =>
                  _(
                    <div
                      style={{ fontWeight: "bold" }}
                      className=" text-danger"
                    >
                      {cell}{" "}
                    </div>
                  ),
              },
              { name: "Date", width: "100px" },
            ]}
            search={true}
            sort={true}
            pagination={{ enabled: true, limit: 10 }}
          />
        </div>
      </CardBody>
    </Card>
  );
};
