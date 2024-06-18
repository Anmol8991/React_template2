import React from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import { Col, Container, Row } from "reactstrap";

import List from "@/components/utility/Common/List";
import { PageHeader } from "../../../components/common/PageHeader";

const Activity = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <PageHeader pageHeading="Activities" isLink={false} />
              <List />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Activity;
