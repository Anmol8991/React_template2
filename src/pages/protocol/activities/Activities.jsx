import React from "react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardBody, Col, Container } from "reactstrap";
import { GridTable } from "../../../components/protocol/activities/GridTable";
const Activities = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader
            pageHeading="Activities"
            linkText="Add Activity"
            pathName="add-activity"
            linkIcon={<i className="ri-add-line align-bottom me-1"></i>}
            isLink
          />

          <Col>
            <Card>
              <CardBody className="pt-0">
                <GridTable />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Activities;
