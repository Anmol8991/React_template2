import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PageHeader } from "@/components/common/PageHeader";
import { fetchClientInfo } from "../../../api/dectecApi";
import ErrorBox from "../../../components/common/ErrorBox";
import Loader from "../../../components/common/Loader";
import { GridTable } from "../../../components/dectec/clients/GridTable";

const Clients = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader
            pageHeading="Clients"
            linkText="Add Client"
            pathName="add-client"
            linkIcon={<i className="ri-add-line align-bottom me-1"></i>}
            isLink
          />
          <Col>
            <Card>
              <CardBody className="pt-0">
                <div>
                  <GridTable />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Clients;
