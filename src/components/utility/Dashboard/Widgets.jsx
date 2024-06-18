import React from "react";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { dashboardWidgets } from "@/data/utility/data";

import sophiaverse1 from "@/assets/images/demo/sophia5.png";

const Widgets = () => {
  const history = useNavigate();
  return (
    <React.Fragment>
      <Col xl={12}>
        <Row>
          {/* <Col xl={1} md={1}></Col> */}
          <Col xl={2} md={2} id="imageCardDb">
				      <img className="" alt="200x200" width="100%" src={sophiaverse1}></img>
          </Col>
          {/* <Col xl={1} md={1}></Col> */}
          {dashboardWidgets.map((item, key) => (
            <Col xl={3} md={3} key={key}>
              <Card
                className="card-animate"
                onClick={() => {
                  item.link ? history(`/${item.link}`) : console.log(item.link);
                }}
              >
                <CardBody>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0 fs-12">
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
          ))}
          {/* <Col xl={2} md={2}></Col> */}
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default Widgets;
