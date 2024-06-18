import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { ToastContainer } from "react-toastify";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { activitiesList } from "@/data/dashboardData";

const Activity = () => {
  const history = useNavigate();
  const activebtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1 text-dark">
                      Activities
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to="/add-activity"
                          className="btn btn-danger bg-gradient "
                          style={{
                            backgroundImage: `linear-gradient(to right, red , yellow) !important`,
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Activity
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <div className="row">
            {(activitiesList || []).map((item, index) => (
              <React.Fragment key={index}>
                <Col xxl={4} sm={6} className="project-card">
                  <Card className="card-height-100">
                    <CardBody className=" card-animate">
                      <div className="d-flex flex-column h-100">
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted mb-4">{item.time}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center">
                              <UncontrolledDropdown direction="start">
                                <DropdownToggle
                                  tag="button"
                                  className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15 shadow-none"
                                >
                                  <FeatherIcon
                                    icon="more-horizontal"
                                    className="icon-sm"
                                  />
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem
                                    href={item.link ? item.link : "#"}
                                  >
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </DropdownItem>
                                  <DropdownItem
                                    href={item.link ? item.link : "#"}
                                  >
                                    <i className=" ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </DropdownItem>
                                  <div className="dropdown-divider"></div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex mb-2"
                          onClick={() => {
                            item.link && history(item.link);
                          }}
                        >
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
                    </CardBody>
                    <div className="card-footer bg-transparent border-top-dashed py-2">
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
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Activity;
