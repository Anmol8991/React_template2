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
    client: "",
    earnedPoints: "",
    redeemedPoints: "",
    activityCount: "",
    zipcode: "",
    walletId: "",
    JoinedAt: "",
  });
  const [protocolList, setProtocolList] = useState("");
  const [groupData, setGroupedData] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState(null);

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
            clientName,
            earnedPoints,
            redeemedPoints,
            activityCount,
            zipcode,
            walletId,
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
            client: clientName,
            earnedPoints: earnedPoints,
            redeemedPoints:redeemedPoints,
            activityCount:activityCount,
            zipcode: zipcode,
            walletId: walletId,
            JoinedAt: dateOfJoining,
          });
        } else {
          setError(res.message);
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchUserProtocolDataApi(userId)
      .then((res) => {
        if (res.success) {
          console.log(res?.data[0]);
          const userInfo = res?.data;

          const arrProtocol = [];
          const groupedData = userInfo?.reduce((acc, protocol) => {
            const key = protocol.protocolId; //`protocolId${acc.count}`;

            const arrList = {
              id: protocol.protocolId,
              logo: protocol.protocolLogo,
              name: protocol.protocolName,
            };
            arrProtocol.push(arrList);

            const clients = protocol.protocolClients.map((client) => ({
              clientId: client.clientId,
              clientName: client.clientName,
              clientLogo: client.clientLogo,
            }));
            acc[key] = clients;
            // acc.count++;
            return acc;
          }, {}); //count:1
          setProtocolList(arrProtocol);
          setGroupedData(groupedData);
          console.log(groupedData, "res");
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

  const handleProtocols = (data) => {
    setActiveProtocol(data.id);
    setActiveClient(null);
    setIsClient(true);
    setSelectedProtocol(groupData[data.id]);
  };

  const handleClient = (data) => {
    setActiveClient(data.clientId);
    //set profile data
  };

  useEffect(() => {
    setLoading(true);
    viewProfileInfo(userId,activeProtocol,activeClient)
      .then((res) => {
        if (res.success) {
          console.log(res);
          const newData = dectectViewUserWidgetData(res?.data);
          setUserWidgetData(newData);
        } else {
          console.log(res?.message);
          setError(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [activeProtocol, activeClient]);

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
                <div className="p-2">
                  <h3 className="text-white mb-1">{userData.name}</h3>
                  <p className="text-white">
                    <i className="bx bx-envelope me-2 fs-16 align-middle"></i>
                    {userData.email}
                    {/* <span className="p-2">
                      <i className="ri-wallet-line me-2 text-white fs-16 align-middle"></i>
                      {userData.walletId}
                    </span> */}
                  </p>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <p className="text-white">
                      <i className="ri-building-line me-2 fs-16 align-middle"></i>
                      {userData.client}
                    </p>
                    <p className="text-white">
                      <span className="d-flex align-items-center">
                        <i className="bx bx-calendar me-2 fs-16 align-middle"></i>
                        <span>Joined at - {userData.JoinedAt}</span>
                      </span>
                    </p>
                  </div>
                  <p className="text-white">
                    <i className="ri-map-pin-user-line me-2 fs-16 align-middle"></i>
                    {userData.city}, {userData.country},{" "}
                    {userData?.zipcode && "ZIP - " + userData?.zipcode}
                  </p>
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
                      <h4 className="text-white mb-1">{userData.redeemedPoints}</h4>
                      <p className="fs-14 mb-0">Redeemed points</p>
                    </div>
                  </Col>

                  <Col lg={4} xs={3}>
                    <div className="p-2">
                      <h4 className="text-white mb-1">{userData.activityCount}</h4>
                      <p className="fs-14 mb-0">Activities</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Card>
            <CardBody>
              <Row>
                <Col lg={12}>
                  {protocolList &&
                    Object.values(protocolList)?.map((element, i) => {
                      return (
                        <Button
                          key={i}
                          onClick={() => handleProtocols(element)}
                          className={
                            activeProtocol === element.id
                              ? `m-2`
                              : `m-2  btn btn-light hover-active-btn-view-user`
                          }
                        >
                          <div className="d-flex gap-2 align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                src={element.logo}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1">{element.name}</div>
                          </div>
                        </Button>
                      );
                    })}
                </Col>
              </Row>

              {selectedProtocol ? (
                <Row className="mt-3">
                  <Col lg={12}>
                    {selectedProtocol.map((element, i) => {
                      return (
                        <Button
                          key={i}
                          // onClick={handleClient}
                          onClick={() => handleClient(element)}
                          className={
                            activeClient === element.clientId
                              ? `m-2`
                              : `m-2  btn btn-light hover-active-btn-view-user`
                          }
                        >
                          <div className="d-flex gap-2 align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                src={element.clientLogo}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1">
                              {element.clientName}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <div className={`m-4 h-96 btn`}></div>
                  </Col>
                </Row>
              )}

              {isClient && activeClient !== null && (
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
                              className="border border-light"
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
                                {/* <ToastContainer closeButton={false} limit={1} /> */}
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
                                {/* <ToastContainer closeButton={false} limit={1} /> */}
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
                                {/* <ToastContainer closeButton={false} limit={1} /> */}
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
