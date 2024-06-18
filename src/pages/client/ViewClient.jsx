import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
// import Widgets from "@/Components/vewClients/widgets";
// import TableContainer from "@/Components/vewClients/TableContainer";
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

import { activitiesData } from "@/data/dashboardData/index.js";
import { useSelector } from "react-redux";
import Widgets from '@/components/client/viewClients/Widgets';
import TableContainer from '@/components/client/viewClients/TableContainer';

const ViewClient = () => {
  const { state } = useLocation();
  const { name, logo } = state; // Read values passed on

  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));


  const activities = [
    {
      protocolLogo: avatar1,
      protocolName: "PERK",
      clientLogo: avatar2,
      clientName: "DarkSet",
      Name: activitiesData[0].name,
      Description: activitiesData[0].des,
      points: 567,
      date: "10 Dec 2018",
    },
    {
      protocolLogo: avatar3,
      protocolName: "PERK",
      clientLogo: avatar4,
      clientName: "DarkSet",
      Name: activitiesData[1].name,
      Description: activitiesData[1].des,
      points: 7267,
      date: "20 Dec 2017",
    },
    {
      protocolLogo: avatar5,
      protocolName: "PERK",
      clientLogo: avatar6,
      clientName: "DarkSet",
      Name: activitiesData[2].name,
      Description: activitiesData[2].des,
      points: 34537,
      date: "17 Mar 2017",
    },
    {
      protocolLogo: avatar7,
      protocolName: "PERK",
      clientLogo: avatar8,
      clientName: "DarkSet",
      Name: activitiesData[3].name,
      Description: activitiesData[3].des,
      points: 3564,
      date: "15 Feb 2017",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <Row className="d-flex align-item-center">
                    <div className="col-auto">
                      <Row>
                        <div className="col-auto">
                          <Row className="g-0">
                            <div className="col-auto">
                              <div className="avatar-xs">
                                <img
                                  src={logo}
                                  alt="user-img"
                                  className="img-thumbnail rounded-circle"
                                />
                              </div>
                            </div>

                            <Col>
                              <div className="p-2">
                                <h6
                                  className={
                                    layoutModeType === "light"
                                      ? "text-black mb-1"
                                      : "text-white mb-1"
                                  }
                                >
                                  {name}
                                </h6>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </div>
                    <Col></Col>
                    <div className="col-auto">
                      <div className="flex-shrink-0">
                        <div className="d-flex gap-2 flex-wrap">
                          <Link to="#" className="btn btn-light">
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add User
                          </Link>

                          <Link to="#" className="btn btn-danger">
                            <i className=" ri-creative-commons-nc-line align-bottom me-1"></i>{" "}
                            Buy Points
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col lg={4}>
                    <Card className="bg-light">
                      <CardBody>
                        <h5 className="card-title mb-3">Info</h5>
                        <div className="table-responsive">
                          <Table className="table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Full Name :
                                </th>
                                <td className="text-muted">Arrow Tech</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Mobile :
                                </th>
                                <td className="text-muted">+(1) 987 6543</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  E-mail :
                                </th>
                                <td className="text-muted">
                                  daveadame@velzon.com
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Location :
                                </th>
                                <td className="text-muted">
                                  California, United States
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Added Date
                                </th>
                                <td className="text-muted">24 Nov 2021</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={8}>
                    <Row>
                      <Widgets />
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    <Card id="invoiceList">
                      <CardHeader className="border-0">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1">
                            Activities
                          </h5>
                          <div className="flex-shrink-0"></div>
                        </div>
                      </CardHeader>

                      <CardBody className="pt-0">
                        <div>
                          <TableContainer data={activities} index={4} />
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

export default ViewClient;
