import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

import { Link } from "react-router-dom";

import { topartWorkUser } from "@/data/dashboardData/index";

import SimpleBar from "simplebar-react";

import CountUp from "react-countup";

const Popularity = () => {
  return (
    <React.Fragment>
      <Col>
        <Card>
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Users </h4>
            <div className="flex-shrink-0">
              <div>
                <button
                  type="button"
                  className="btn btn-soft-primary btn-sm shadow-none"
                >
                  See All
                </button>
              </div>
            </div>
          </div>
          <CardBody>
            <div className="table-responsive table-card">
              <SimpleBar style={{ maxHeight: "465px" }}>
                <table className="table table-borderless align-middle">
                  <tbody>
                    {topartWorkUser.reverse().map((item, key) => {
                      const countries = ["Canada", "USA", "UK"];
                      const state = [
                        "South Dakota",
                        "Ohio",
                        "Montana",
                        "Nebraska",
                      ];
                      const randomNumber = Math.floor(
                        Math.random() * countries.length
                      );
                      return (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.img}
                                alt=""
                                className="avatar-sm rounded-circle"
                              />
                              <div className="ms-3">
                                <Link to="#!">
                                  <h6 className="fs-15 mb-1">{item.title}</h6>
                                </Link>
                                <p className="mb-0 text-muted">
                                  <span>{state[randomNumber]},</span>
                                </p>
                                <p className="mb-0 text-muted">
                                  <span>{countries[randomNumber]}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <Link to="#!">
                              <h6 className="fs-15 mb-1">
                                <span className="counter-value">
                                  <CountUp
                                    start={0}
                                    end={item.collection}
                                    separator={","}
                                    duration={4}
                                  />
                                </span>
                              </h6>
                            </Link>
                            <p className="mb-0 text-muted">Points Rewarded</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Popularity;
