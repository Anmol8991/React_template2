import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, CardBody, CardHeader, Row, Col, Button, Input } from "reactstrap";
import { activitiesData, date } from "@/data/dashboardData/index.js";
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";

import wire from "@/assets/images/demo/wire.jpg";
import Search from "./Search";

const EarningHistory = () => {
  
  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

  const projectLists = [
    {
      id: 1,
      time: `Updated 3hrs ago`,
      ratingClass: ``,
      imgbgColor: `warning`,
      img: activity1,
      label: activitiesData[1].name,
      caption: activitiesData[1].des,
      number: `40/60`,
      progressBar: 100 * Number(40 / 60) + `%`,
      points: 2345,
      date: `10 Jul, 2021`,
      link: "/view-activity",
    },

    {
      id: 2,
      time: `Updated 2hrs ago`,
      ratingClass: ``,
      imgbgColor: `danger`,
      img: activity2,
      label: activitiesData[0].name,
      caption: activitiesData[0].des,
      number: `20/67`,
      progressBar: 100 * Number(20 / 67) + `%`,
      points: 3456,
      date: `23 FEB, 2021`,
    },
  ];

  const earningData = [
    {
      activityName: activitiesData[0].name,
      activityLogo: activity1,
      points: projectLists[0].points,
      date: date[0].date,
    },
    {
      activityName: activitiesData[1].name,
      activityLogo: activity2,
      points: projectLists[1].points,
      date: date[1].date,
    },
    {
      activityName: activitiesData[0].name,
      activityLogo: activity1,
      points: projectLists[0].points,
      date: date[2].date,
    },
    {
      activityName: activitiesData[0].name,
      activityLogo: activity1,
      points: projectLists[0].points,
      date: date[3].date,
    },
    {
      activityName: activitiesData[1].name,
      activityLogo: activity2,
      points: projectLists[1].points,
      date: date[4].date,
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Points Rewarded
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
                  <th scope="col">Activity</th>
                  <th scope="col">Points</th>
                  <th scope="col">Date</th>
                  <th scope="col">Trx Hash</th>
                </tr>
              </thead>
              <tbody>
                {(earningData || []).map((item, key) => {
                  function hashme(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                  }

                  const hash1 = hashme(1000, 9999);
                  const hash2 = hashme(1000, 9999);

                  return (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center">
                            <img
                              src={item.activityLogo}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {item.activityName}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            item.points < 6000
                              ? "text-info"
                              : item.points > 6000 && item.points < 9999
                              ? "text-warning"
                              : item.points > 9999
                              ? "text-danger"
                              : "text-danger"
                          }
                        >
                          {item.points}
                        </span>
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

export default EarningHistory;
