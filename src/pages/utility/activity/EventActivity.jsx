import React from "react";
import Refer from "@/components/utility/activities/Refer";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { useLocation, useParams } from "react-router-dom";
import Events from "@/components/activities/Events";

const EventActivity = () => {
  const { activityId } = useParams();
  const location = useLocation();
  const actLogo = "https://img.freepik.com/free-vector/illustrated-woman-being-intern-company_23-2148726151.jpg?size=626&ext=jpg&ga=GA1.1.884270935.1680350144&semt=sph";
  const data = location.state?.data;
  console.log(data);
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
                    Attend an event
                  </h5>

                  </div>
                  <p className="text-muted">
                    Attend an event to earn SOPH points
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
          </Card>
        </Col>
        <Row>
          <Events />
        </Row>
      </Container>
    </div>
  );
};

export default EventActivity;
