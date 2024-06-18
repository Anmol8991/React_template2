import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Button, Input } from "reactstrap";
import { activitiesData, date } from "@/data/dashboardData/index.js";

import wire from "@/assets/images/demo/wire.jpg";
import Search from "./Search";

const RedemptionsHistory = () => {
  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
  const history = useNavigate();
  const redemptionData = [
    {
      activityName: activitiesData[0].name,
      activityLogo: wire,
      date: date[0].date,
      type: "Gift Card",
      amount: 809.0,
      statusClass: "success",
    },
    {
      type: "Donation",
      amount: 800.0,
      statusClass: "danger",
      points: "4398",
      activityName: activitiesData[0].name,
      activityLogo: wire,
      date: date[0].date,
    },
    {
      type: "Event",
      amount: 789.0,
      statusClass: "warning",
      points: "4018",
      activityName: activitiesData[0].name,
      activityLogo: wire,
      date: date[0].date,
    },
    {
      type: "Event",
      amount: 779.0,
      statusClass: "warning",
      date: date[0].date,
    },
    {
      type: "Donation",
      amount: 689.0,
      statusClass: "danger",
      date: date[0].date,
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Redemptions
          </h4>
          <div className="flex-shrink-0"></div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col lg={12}>
                <Row className="g-3 mb-4">
                    <Search />
                </Row>
            </Col>
          </Row>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Points</th>
                  <th scope="col">Amount($)</th>
                  <th scope="col">Date</th>
                  <th scope="col">Trx Hash</th>
                </tr>
              </thead>
              <tbody>
                {(redemptionData || []).map((item, key) => {
                  function hashme(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                  }

                  const hash1 = hashme(1000, 9999);
                  const hash2 = hashme(1000, 9999);
                  const points = hashme(1000, 9999);
                  const amount = hashme(25, 50);

                  return (
                    <tr key={key}>
                      <td>
                        <span
                          className={
                            "badge badge-border badge-soft-" + item.statusClass
                          }
                        >
                          {item.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            amount < 6000
                              ? "text-info"
                              : amount > 6000 && amount < 9999
                              ? "text-warning"
                              : amount > 9999
                              ? "text-danger"
                              : "text-danger"
                          }
                        >
                          {points}
                        </span>
                      </td>

                      <td>
                        <span className="text-info">{amount}</span>
                      </td>

                      <td>{item.date}</td>

                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img
                            src={wire}
                            alt=""
                            className="avatar-xs rounded-circle me-2"
                          />
                          <a href={scanLink} className="text-info p-0">
                            {`0X${hash1}.....${hash2}`}
                          </a>
                        </div>

                        <span
                          role="button"
                          className="fa-layers text-gray fa-fw p-0"
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </span>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Row className="justify-content-md-end justify-content-center align-items-center mt-3 p-2">
                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button
                            color="primary"
                        >
                            {"<"}
                        </Button>
                    </div>
                </Col>
                <Col className="col-md-auto d-none d-md-block">
                    Page{" "}
                    <strong>
                        {1} of {10}
                    </strong>
                </Col>
                <Col className="col-md-auto">
                    <Input
                        type="number"
                        min={1}
                        style={{ width: 70 }}
                        max={10}
                        defaultValue={1}
                    />
                </Col>

                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button color="primary" >
                            {">"}
                        </Button>
                    </div>
                </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RedemptionsHistory;
