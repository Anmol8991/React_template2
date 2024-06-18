import React from "react";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
// import { ecomWidgets } from "./data/index.js";

import foodImage from "@/assets/images/demo/food2.gif";
import activity1 from "@/assets/images/brands/slack.png";
// import { activitiesData } from "../Perk/data/index.js";
import { activitiesData, ecomWidgets } from "@/data/viewActivityData";
import { WidgetList } from '@/components/common/WidgetList';

const ViewActivityWidget = () => {
  const history = useNavigate();
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
  ];
  return (
    <React.Fragment>
      <Col xl={4} md={12}>
        {(projectLists || []).map((item, index) => (
          <React.Fragment key={index}>
            <Col xxl={12} sm={12} className="project-card">
              <Card className="card-height-100">
                <CardBody className=" card-animate">
                  <div className="d-flex flex-column h-100">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span
                            className={
                              "avatar-title rounded p-2 bg-soft-" +
                              item.imgbgColor
                            }
                          >
                            <img
                              src={item.img}
                              alt=""
                              className="img-fluid p-1"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1 fs-15">
                          <Link to="#" className="text-dark">
                            {item.label}
                          </Link>
                        </h5>
                        <p className="text-muted text-truncate-two-lines mb-3">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <div className="avatar-group">
                          Points : {item.points}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="text-muted">
                          <i className="ri-calendar-event-fill me-1 align-bottom"></i>{" "}
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </Col>

      <Col>
        <Row>
          {/* {ecomWidgets.map((item, key) => (
            <Col xl={4} md={12} key={key}>
              <Card
                className="card-animate"
                onClick={() => {
                  item.link ? history(`/${item.link}`) : console.log(item.link);
                }}
              >
                <CardBody>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      {item.label}
                    </p>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{
                      gap: "1rem",
                    }}
                  >
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        className={
                          "avatar-title rounded fs-3 bg-" + item.bgcolor
                        }
                      >
                        <i className={`${item.icon}`}></i>
                      </span>
                    </div>

                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span
                            className="counter-value text-dark"
                            data-target="559.25"
                          >
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={item.counter}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))} */}
          <WidgetList widgetsData={ecomWidgets} xl={4} md={12} />
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default ViewActivityWidget;
