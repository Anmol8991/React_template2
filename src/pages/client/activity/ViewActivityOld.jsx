import React from "react";
import { Col, Container, Row } from "reactstrap";
import ActivityHistory from "@/components/client/viewActivity/ActivityHistory";
import ViewActivityWidget from "@/components/client/viewActivity/ViewActivityWidget";
import Popularity from "@/components/client/dashboard/Popularity";

const ViewActivity = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="">
            <ViewActivityWidget />
          </Row>
          <Row className="dash-nft">
            <Col lg={8}>
              <ActivityHistory />
            </Col>
            <Popularity />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewActivity;
