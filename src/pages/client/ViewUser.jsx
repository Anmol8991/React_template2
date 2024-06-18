import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import Img4 from "@/assets/images/nft/img-04.jpg";
import foodbanner from "@/assets/images/demo/sigularityNetbg2.gif";
//Import Icons
import FeatherIcon from "feather-icons-react";
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import EarningHistory from "@/components/client/ViewUser/EarningHistory.jsx";
import CountUp from "react-countup";
import { activitiesData } from "@/data/dashboardData/index";
import RedemptionsHistory from "@/components/client/ViewUser/RedemptionHistory";

const ViewUser = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const data = [
    {
      id: 3,
      cardColor: "success",
      label: "Points Rewarded",
      counter: "813",
      bgcolor: "warning",
      icon: " bx bx-wallet",
      decimals: 0,
      prefix: "",
      suffix: "",
    },

    {
      id: 4,
      cardColor: "info",
      label: "Points Redeemed",
      counter: "176",
      bgcolor: "danger",
      icon: "bx bxs-badge-dollar",
      decimals: 0,
      prefix: "",
      suffix: "",
    },

    {
      id: 3,
      cardColor: "success",
      label: "Completed ACtivities",
      counter: "2",
      bgcolor: "info",
      icon: " bx bx-food-menu",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
  ];

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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <img
              src={foodbanner}
              className="profile-wid-img profile-setting-img"
              alt=""
              style={{
                opacity: 1,
                width: `100%`,
                objectFit: `cover`,
              }}
            />
          </div>
          <Row style={{marginTop:"-6rem"}}>
            <Col lg={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={Img4}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <Input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">Anna Adame</h5>
                    <p className="text-muted mb-0">since 6 month</p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Completed Activities</h5>
                    </div>
                  </div>
                  {(projectLists || []).map((item, index) => (
                    <Card key={index}>
                      <CardBody className=" card-animate">
                        <div className="d-flex flex-column h-100">
                          <div className="d-flex mb-2">
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
                    </Card>
                  ))}
                </CardBody>
              </Card>
            </Col>

            <Col lg={9}>
              <Row className="mt-3">
                {data.map((item, key) => (
                  <Col xl={4} md={6} key={key}>
                    <Card className="card-animate">
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
                ))}
              </Row>

              <EarningHistory />
              <RedemptionsHistory />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ViewUser;
