import React from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import { Col, Container, Row, Card, CardHeader } from "reactstrap";

import { PageHeader } from "@/components/common/PageHeader";
import LearnToEarn from "@/components/activities/LearnToEarn";
import { useParams } from "react-router-dom";

const LearningActivity = () => {
  const { activityId } = useParams();
  const actLogo = "https://img.freepik.com/free-vector/illustrated-woman-being-intern-company_23-2148726151.jpg?size=626&ext=jpg&ga=GA1.1.884270935.1680350144&semt=sph";

  return (
    <div className="page-content">
      <Container fluid>
        <Col>
          <Card className="" id="invoiceList">
            <CardHeader className="bg-light">
              <Row className="px-3 d-flex justify-content-between">
                <Col md={8}>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-2">
                    <img
                      src={actLogo}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <h5 className="card-title mb-0 flex-grow-1 text-dark">
                    Learn to earn
                  </h5>

                  </div>
                  <p className="text-muted">
                    Learn a technology to earn points.
                  </p>
                </Col>
                <Col
                  md={4}
                  className="d-flex flex-column justify-content-center align-items-end"
                >
                  <p className="d-flex fs-4 fw-bold align-items-center gap-1 ">
                    <i className="ri-coin-fill text-warning align-middle"></i>
                    <span>20</span> -
                    <i className="ri-coin-fill text-warning align-middle"></i>
                    <span>50</span>
                  </p>
                  {/* <p
                    className="py-2 bg-soft-info rounded-5 px-4 fs-6"
                    style={{ fontWeight: "500" }}
                  >
                    Event
                  </p> */}
                </Col>
              </Row>
            </CardHeader>
            {/* <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                
                <div className="d-flex align-items-center">

                  <div className="flex-shrink-0 me-2">
                    <img
                      src={actLogo}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <h5 className="card-title mb-0 flex-grow-1 text-dark">
                    Learn to earn
                  </h5>

                </div>
              </div>
              <div className="flex-shrink-0" >Learn a technology to earn points</div>
            </CardHeader> */}
          </Card>
        </Col>
        <Row>
          <LearnToEarn />
        </Row>
      </Container>
    </div>
  );
};

export default LearningActivity;
