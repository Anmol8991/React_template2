import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  Form,
  ModalHeader,
} from "reactstrap";

import { ToastContainer } from "react-toastify";
import { CustomButton } from "../../../components/common/CustomButton";

import { dectectViewClientWidgetData } from "../../../utils/createWidgetData";
import { WidgetList } from "../../../components/common/WidgetList";
import profileBg from "@/assets/images/profile-bg.jpg";
import defaultLogo from "@/assets/images/default_person.png";
import activity1 from "@/assets/images/brands/slack.png";
const ViewActivity = () => {
  const { clientId } = useParams();
  const activityRef = useRef();
  const [modal_successMessage, setmodal_successMessage] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const [clientOverview, setClientOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatePayments, setUpdatePayments] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 5,
    protocolId: "",
  });

  function tog_successMessage() {
    setmodal_successMessage(!modal_successMessage);
  }
  const activityDetails = {
    activityLogo: activity1,
    activityName: "Read Blog",
    activityDescription:
      "Read the blog improve the reading skill and earn points",
    points: 2345,
    startDate: "10 Jul,2021",
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
                    src={activityDetails?.activityLogo ?? defaultLogo}
                    alt=""
                    className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <h3 className="text-white mb-1">
                    {activityDetails?.activityName}
                  </h3>
                  <p className="text-white-75">
                    {activityDetails?.activityDescription}
                  </p>
                  <div className="hstack text-white-50 gap-1">
                    <div className="text-white">
                      <i className="ri-building-line me-1 text-white-75 fs-20 align-middle"></i>
                      Points: {activityDetails?.points},{" "}
                      {activityDetails?.startDate}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col lg={12}>
                    <Row>
                      {/* <ViewActivityWidget /> */}
                      {/* <WidgetList
                        loading={loading}
                        error={error}
                        xl={null}
                        md={null}
                        flex={1}
                        activityRef={activityRef}
                        widgetsData={clientOverview}
                      /> */}
                    </Row>
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
