import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { ToastContainer } from "react-toastify";

//Images

import profileBg from "@/assets/images/profile-bg.jpg";

import defaultLogo from "@/assets/images/default_person.png";
import { fetchProtocolInfo } from "../../../api/dectecApi";

import { WidgetList } from "@/components/common/WidgetList";

import { ActivityHistoryTable } from "../../../components/protocol/activities/viewActivities/ActivityHistoryTable";
import TopUsers from "../../../components/protocol/activities/viewActivities/TopUsers";

const ViewActivity = () => {
  const { protocolId } = useParams();

  const [activityData, setActivityData] = useState("");
  const [error, setError] = useState(null);
  const [activityOverview, setActivityOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 5,
    clientId: "",
    protocolId: "",
  });

  const overviewData = {
    timesPerformed: 29,
    users: 18,
    totalPoints: 2345,
    // pointsBought: {
    //   value: 140.79,
    //   prefix: "",
    //   suffix: "K",
    // },
    // pointsRewarded: {
    //   value: 55.25,
    //   prefix: "",
    //   suffix: "K",
    // },
    // amountPaid: {
    //   value: 22.74,
    //   prefix: " $",
    //   suffix: "K",
    // },
  };

  useEffect(() => {
    fetchProtocolInfo(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      protocolId
    ).then(({ success, message, data }) => {
      if (success) {
        setActivityData(data[0]);
        setLoading(false);
      } else {
        setError(message);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const newData = activityWidgetData(overviewData);
    setActivityOverview(newData);
  }, []);

  const activityWidgetData = (data) => {
    const newData = [
      {
        id: 1,
        cardColor: "success",
        label: "Users",
        counter: data?.users,
        bgcolor: "warning",
        icon: "bx bx-user-circle",
        decimals: 0,
        prefix: "",
        suffix: "",
        link: "users",
      },
      {
        id: 2,
        cardColor: "info",
        label: "Times Performed",
        counter: data?.timesPerformed,
        bgcolor: "danger",
        icon: "bx bx-wallet",
        decimals: 0,
        prefix: "",
        suffix: "",
        link: "payments",
      },
      {
        id: 2,
        cardColor: "primary",
        label: "Total Points",
        counter: data?.totalPoints,
        bgcolor: "success",
        icon: "bx bx-dollar-circle",
        decimals: 0,
        prefix: "",
        suffix: "",
        link: "payments",
      },
    ];

    return newData;
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="profile-foreground position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg">
              <img src={profileBg} alt="" className="profile-wid-img" />
            </div>
          </div>
          <div className="pt-4  mb-lg-3 pb-lg-2 mb-2">
            <Row className="g-4">
              <div className="col-auto">
                <div className="avatar-lg">
                  <img
                    src={
                      activityData?.protocolInfo?.protocolLogo
                        ? activityData?.protocolInfo?.protocolLogo
                        : defaultLogo
                    }
                    alt=""
                    className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <a href="">
                    <h3 className="text-white mb-1">
                      TechConvergence: Where Tech Worlds Collide{" "}
                      <i className="bx bx-link text-muted" />
                    </h3>
                  </a>
                  {/* <p className="text-white-75">
                    https://dectec.netlify.app/add-activity
                  </p> */}
                  <div className="  gap-1">
                    <div className="me-2 text-white">
                      Points: <span>1234</span>, Limit: <span>3</span>
                    </div>
                    <div className="me-2 text-white">
                      Start Date: <span>10/07/2023</span>, End Date:{" "}
                      <span>08/12/2023</span>
                    </div>
                    <div className="text-white">
                      <i className="ri-profile-line me-1  fs-20 align-middle"></i>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ratione facere aspernatur amet reiciendis deserunt fugiat
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} className="col-lg-auto order-last order-lg-0">
                <Row className="text text-white-50 text-center">
                  <Col lg={4} xs={3}>
                    <div className="p-2">
                      <span
                        className=" py-2 px-4 rounded-5 m-2 text-dark"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <span>Event</span>
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col lg={12}>
                    <Row
                      style={{
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* <Widgets xl={6} md={6}/> */}
                      <WidgetList
                        loading={loading}
                        // error={error}
                        widgetsData={activityOverview}
                        flex={1}
                      />
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col lg={8}>
                    <Card id="invoiceList">
                      <CardHeader className="border-0 pb-1">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1">
                            Activity History
                          </h5>
                          <div className="flex-shrink-0"></div>
                        </div>
                      </CardHeader>

                      <CardBody className="pt-0">
                        <div>
                          <ActivityHistoryTable />
                          <ToastContainer closeButton={false} limit={1} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <TopUsers />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewActivity;
