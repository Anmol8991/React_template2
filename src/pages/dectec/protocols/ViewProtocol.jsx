import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  Badge 
} from "reactstrap";
import Widgets from "@/components/dectec/viewProtocol/Widgets";
import perk from "@/assets/images/demo/perk.png";
import TableContainer from "@/components/dectec/viewProtocol/TableContainer";
import { ToastContainer } from "react-toastify";

//Images

import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";
import profileBg from "@/assets/images/profile-bg.jpg";

import defaultLogo from "@/assets/images/default_person.png";
import { fetchProtocolInfo, fetchProtocolOverview, activitiesApi } from "../../../api/dectecApi";
import { dectectViewProtocolWidgetData } from "../../../utils/createWidgetData";
import { WidgetList } from "@/components/common/WidgetList";
import { GridTable } from "../../../components/dectec/viewProtocol/GridTable";

const ViewProtocol = () => {
  const { protocolId } = useParams();
  // const [protocolName, setProtocolName] = useState("");
  // const [protocolType, setProtocolType] = useState("HR");
  // const [protocolDescription, setProtocolDescription] = useState("");
  // const [protocolLogo, setProtocolLogo] = useState(null);
  const [protocolData, setProtocolData] = useState("");
  const [error, setError] = useState(null);
  const [protocolOverview, setProtocolOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 5,
    clientId:"",
    protocolId:"",
  });

  useEffect(() => {
    fetchProtocolInfo(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      protocolId
      ).then(({ success, message, data }) => {
      if (success) {
        setProtocolData(data[0]);
        setLoading(false);
      } else {
        setError(message);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProtocolOverview(protocolId).then((res) => {
      if (res.success) {
        const newData = dectectViewProtocolWidgetData(res?.data);
        setProtocolOverview(newData);
      } else {
        setError(res?.message);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);
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
                    src={protocolData?.protocolInfo?.protocolLogo ? protocolData?.protocolInfo?.protocolLogo : defaultLogo}
                    alt=""
                    className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <h3 className="text-white mb-1">{protocolData?.protocolInfo?.name}</h3>
                  <p className="text-white-75">{protocolData?.protocolType}</p>
                  <div className="hstack text-white-50 gap-1">
                    {/* <div className="me-2">
                      <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>
                      {userData.city}, {userData.country}
                    </div> */}
                    <div className="text-white">
                      <i className="ri-profile-line me-1 text-white-75 fs-20 align-middle"></i>
                      {protocolData?.protocolDescription}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} className="col-lg-auto order-last order-lg-0">
                <Row className="text text-white-50 text-center">
                  <Col lg={4} xs={3}>
                    <div className="p-2">
                      <h4 className="text-white mb-1"></h4>
                      <button className="btn btn-secondary m-2" style={{pointerEvents:"none"}}><span>Protocol</span></button> 
                      {/* <Badge color="light m-2">Primary</Badge> */}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-item-center">
                    <div className="flex-grow-1 ">
                      <Row>
                        <div className="col-auto">
                          <Row className="g-0">
                            <div className="col-auto">
                              <div className="avatar-xs">
                                <img
                                  src={
                                    protocolLogo ? protocolLogo : defaultLogo
                                  }
                                  alt=""
                                  className="img-thumbnail rounded-circle"
                                />
                              </div>
                            </div>

                            <Col>
                              <div className="p-2">
                                <h6 className="text-white mb-1">
                                  {protocolName}
                                </h6>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </div>
                    {/* <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        <Link to="#" className="btn btn-light">
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          User
                        </Link>

                        <Link to="#" className="btn btn-danger">
                          <i className=" ri-creative-commons-nc-line align-bottom me-1"></i>{" "}
                          Buy Points
                        </Link>
                      </div>
                    </div> */}
                  {/* </div>
                </CardHeader>
              </Card>
            </Col>
          </Row> */} 
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  {/* <Col lg={5}>
                    <Card className="bg-light">
                      <CardBody>
                        {loading && <p className="py-1">Loading...</p>}
                        <h5 className="card-title mb-3">Info</h5>
                        <div className="table-responsive">
                          <Table className="table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Name:
                                </th>
                                <td className="text-muted">{protocolName}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Type:
                                </th>
                                <td className="text-muted">{protocolType}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Description:
                                </th>
                                <td className="text-muted">
                                  {protocolDescription}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col> */}
                  <Col lg={12}>
                    <Row style={{justifyContent:"space-around",flexWrap:"wrap"}}>
                      {/* <Widgets xl={6} md={6}/> */}
                      <WidgetList loading={loading} error={error} widgetsData={protocolOverview} flex={1}/>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    <Card id="invoiceList">
                      <CardHeader className="border-0 pb-1">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1">
                            Activities
                          </h5>
                          <div className="flex-shrink-0"></div>
                        </div>
                      </CardHeader>

                      <CardBody className="pt-0">
                        <div>
                          {/* <TableContainer data={activities} index={4} /> */}
                          {/* {
                            protocolActivities  && (
                              <GridTable data={ protocolActivities} />
                            )
                          } */}
                          <GridTable />
                          <ToastContainer closeButton={false} limit={1} />
                        </div>
                      </CardBody>
                    </Card>
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

export default ViewProtocol;
