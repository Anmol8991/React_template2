import React, { useState } from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";

import "react-toastify/dist/ReactToastify.css";
import {
  paymentsWidget1,
  paymentsWidget2,
  protocolPaymentsData,
} from "@/data/dectec/data/data.js";

import { PageHeader } from "@/components/common/PageHeader";
import { WidgetList } from "@/components/common/WidgetList";
import TableContainer from "../../../components/dectec/payments/TableContainer";
import { ToastContainer } from "react-toastify";
import { CustomButton } from "../../../components/common/CustomButton";
import PaymentsTable from "../../../components/dectec/payments/PaymentsTable";

const Payments = () => {
  const [active, setActive] = useState("All");
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader pageHeading="Payments" isLink={false} />

          <Row className="g-0">
            <Col lg={12}>
              <div className="">
                <Row className="">
                  {active === "All" ? (
                    <WidgetList widgetsData={paymentsWidget1} md={6} />
                  ) : (
                    <WidgetList widgetsData={paymentsWidget2} md={6} />
                  )}
                </Row>
              </div>
            </Col>
          </Row>

          <Col>
            <Card>
              <CardBody className="pt-0">
                <div>
                  {/* <TableContainer
                    data={protocolPaymentsData}
                    setActive={setActive}
                    index={2}
                  /> */}
                  <PaymentsTable />
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Payments;
