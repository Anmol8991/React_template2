import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import React, { useState, useEffect, useMemo, useCallback } from "react";

import TableContainer from "@/components/dectec/viewUser/TableContainer";

//redux

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import profileBg from "@/assets/images/profile-bg.jpg";
import {
  viewProfileInfo,
  fetchUserProtocolDataApi,
} from "../../../api/dectecApi";
import defaultLogo from "@/assets/images/default_person.png";
import { dectectViewUserWidgetData } from "../../../utils/createWidgetData";
import GridRedemptionTable from "../../../components/dectec/viewUser/GridRedemptionTable";
import { GridActivityTable } from "../../../components/dectec/viewUser/GridActivityTable";
import { GridRewardedTable } from "../../../components/dectec/viewUser/GridRewardedTable";
import { WidgetList } from "@/components/common/WidgetList";
import Loader from "../../../components/common/Loader";

const ViewUser = () => {
  SwiperCore.use([Autoplay]);
  const history = useNavigate();

  const [activeTab, setActiveTab] = useState("1");

  const [activeProtocol, setActiveProtocol] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [activeClient, setActiveClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [userWidgetData, setUserWidgetData] = useState([]);
  const [userData, setUserData] = useState({
    userId,
    profilePic: defaultLogo,
    name: "",
    email: "",
    city: "",
    country: "",
    zipcode: "",
    address: "",
    state: "",
    client: "",
    earnedPoints: "",
    redeemedPoints: "",
    activityCount: "",
    dateOfJoining: "",
  });

  useEffect(() => {
    setLoading(true);
    viewProfileInfo(userId)
      .then((res) => {
        if (res.success) {
          console.log(res?.data[0]);
          const {
            profilePic,
            name,
            email,
            city,
            country,
            state,
            address,

            earnedPoints,
            redeemedPoints,
            activityCount,
            zipcode,

            dateOfJoining,
          } = res?.data[0];
          setUserData({
            ...userData,
            userId,
            profilePic,
            name,
            email,
            city,
            country,
            state,
            address,
            earnedPoints,
            redeemedPoints,
            activityCount,
            zipcode,

            dateOfJoining,
          });
          const newData = dectectViewUserWidgetData(res?.data);
          setUserWidgetData(newData);
        } else {
          setError(res.message);
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
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
          <div className="pt-4 mb-4 mb-lg-3 pb-lg-2">
            {loading ? (
              <Loader />
            ) : (
              <Row className="g-4">
                <div className="col-auto">
                  <div className="avatar-lg">
                    <img
                      src={userData.profilePic}
                      alt=""
                      className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
                    />
                  </div>
                </div>

                <Col>
                  <div className="p-1">
                    <h3 className="text-white mb-1">{userData.name}</h3>
                    <p className="text-white">
                      <i className="bx bx-envelope me-2 fs-16 align-middle"></i>
                      {userData.email}
                    </p>
                    <div className="d-flex align-items-center flex-wrap gap-1">
                      <p className="text-white">
                        <i className="ri-building-line me-2 fs-6 align-middle"></i>
                        {userData.client}
                      </p>
                      <p className="text-white">
                        <span className="d-flex align-items-center">
                          <i className="bx bx-calendar me-2 fs-6 align-middle"></i>
                          <span>Joined at - {userData.dateOfJoining}</span>
                        </span>
                      </p>
                    </div>
                    <p className="text-white">
                      <i className="ri-map-pin-user-line me-2 fs-6 align-middle"></i>
                      {userData.city}, {userData.state}, {userData.country},{" "}
                      {userData?.zipcode && "ZIP - " + userData?.zipcode}
                    </p>
                    <p>{userData.address}</p>
                  </div>
                </Col>

                <Col xs={12} className="col-lg-auto order-last order-lg-0">
                  <Row className="text text-white-50 text-center">
                    <Col lg={4} xs={3}>
                      <div className="p-2">
                        <h4 className="text-white mb-1">
                          {userData.earnedPoints}
                        </h4>
                        <p className="fs-14 mb-0">Points Rewarded</p>
                      </div>
                    </Col>
                    <Col lg={4} xs={3}>
                      <div className="p-2">
                        <h4 className="text-white mb-1">
                          {userData.redeemedPoints}
                        </h4>
                        <p className="fs-14 mb-0">Redeemed points</p>
                      </div>
                    </Col>

                    <Col lg={4} xs={3}>
                      <div className="p-2">
                        <h4 className="text-white mb-1">
                          {userData.activityCount}
                        </h4>
                        <p className="fs-14 mb-0">Activities</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </div>

          <Card>
            <CardBody>
              {loading ? (
                <Loader />
              ) : (
                <Row className="p-2 mt-3">
                  <Col lg={12}>
                    <div>
                      <div className="d-flex">
                        <Nav
                          pills
                          className="animation-nav animation-nav-view-user profile-nav gap-2 gap-lg-3 flex-grow-1"
                          role="tablist"
                        >
                          <NavItem>
                            <NavLink
                              href="#overview-tab"
                              className={classnames(
                                { active: activeTab === "1" },
                                "fs-14"
                              )}
                              onClick={() => {
                                toggleTab("1");
                              }}
                            >
                              <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                              <span className="d-none d-md-inline-block">
                                Points
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="#activities"
                              className={classnames(
                                { active: activeTab === "2" },
                                "fs-14"
                              )}
                              onClick={() => {
                                toggleTab("2");
                              }}
                            >
                              <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                              <span className="d-none d-md-inline-block">
                                Points Rewarded
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="#projects"
                              className={classnames(
                                { active: activeTab === "3" },
                                "fs-14"
                              )}
                              onClick={() => {
                                toggleTab("3");
                              }}
                            >
                              <i className="ri-price-tag-line d-inline-block d-md-none"></i>{" "}
                              <span className="d-none d-md-inline-block">
                                Redeemed Points
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="#documents"
                              className={classnames(
                                { active: activeTab === "4" },
                                "fs-14"
                              )}
                              onClick={() => {
                                toggleTab("4"); //
                              }}
                            >
                              <i className="ri-folder-4-line d-inline-block d-md-none"></i>{" "}
                              <span className="d-none d-md-inline-block">
                                Activities
                              </span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <div className="flex-shrink-0">
                          <Button
                            onClick={() => {
                              history(`/edit-user/${userId}`);
                            }}
                            className="btn btn-success"
                          >
                            <i className="ri-edit-box-line align-bottom"></i>{" "}
                            Edit Profile
                          </Button>
                        </div>
                      </div>

                      <TabContent activeTab={activeTab} className="pt-4">
                        <TabPane tabId="1">
                          <Row>
                            <WidgetList
                              widgetsData={userWidgetData}
                              xl={4}
                              md={3}
                              className=" bg-light"
                            />
                            {/* )} */}
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Card>
                            <CardBody className="pt-0">
                              <div>
                                {/* <TableContainer data={EarnedPoints} index={2} /> */}
                                <GridRewardedTable
                                  client={activeClient}
                                  protocol={activeProtocol}
                                />
                                <ToastContainer closeButton={false} limit={1} />
                              </div>
                            </CardBody>
                          </Card>
                        </TabPane>

                        <TabPane tabId="3">
                          <Card>
                            <CardBody className="pt-0">
                              <div>
                                {/* <TableContainer
                                  data={RedeemedPoints}
                                  index={3}
                                /> */}
                                <GridRedemptionTable
                                  client={activeClient}
                                  protocol={activeProtocol}
                                />
                                <ToastContainer closeButton={false} limit={1} />
                              </div>
                            </CardBody>
                          </Card>
                        </TabPane>

                        <TabPane tabId="4">
                          <Card>
                            <CardBody className="pt-0">
                              <div>
                                {/* <TableContainer data={activities} index={4} /> */}
                                <GridActivityTable client={activeClient} />
                                <ToastContainer closeButton={false} limit={1} />
                              </div>
                            </CardBody>
                          </Card>
                        </TabPane>
                      </TabContent>
                    </div>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewUser;
