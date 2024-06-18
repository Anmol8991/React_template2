import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Refer from "../../../../components/utilities/twin/activities/Refer";

const ReferActivity = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Card id="invoiceList">
          <CardHeader className="bg-light">
            <Row className="px-3 d-flex justify-content-between">
              <Col md={8}>
                <h2>Refer & Earn</h2>
                <p className="text-muted">
                  Invite your friends to TWIN. If they sign up, you will get 10
                  points for referral.
                </p>
              </Col>
              <Col
                md={4}
                className="d-flex flex-column justify-content-center align-items-end"
              >
                <p className="d-flex fs-4 text-info align-items-center gap-1 ">
                  <i className="ri-coins-fill text-warning align-middle"></i>
                  <span>10 Points</span>
                </p>
                <p
                  className="py-2 bg-soft-info rounded-5 px-4 fs-6"
                  style={{ fontWeight: "500" }}
                >
                  Referral
                </p>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="d-flex justify-content-center align-items-center ">
            <Refer />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ReferActivity;
