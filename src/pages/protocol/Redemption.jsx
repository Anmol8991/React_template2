import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "react-toastify/dist/ReactToastify.css";

import GridTable from "../../components/protocol/redemption/GridTable";

const Redemption = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            {/* <Col lg={12}> */}

            <Card id="invoiceList">
              <CardHeader className="border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1 text-dark">
                    Redemptions
                  </h5>
                </div>
              </CardHeader>
            </Card>
            {/* </Col> */}
          </Row>
          <Row>
            <Card>
              <CardBody className="pt-0">
                <div>
                  <GridTable />
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Redemption;
