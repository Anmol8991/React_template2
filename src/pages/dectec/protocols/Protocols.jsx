import React, { useEffect, useState } from "react";
import { CardBody, Row, Card, Container, Col } from "reactstrap";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContainer from "@/components/dectec/protocols/TableContainer";

import { PageHeader } from "@/components/common/PageHeader";
import { fetchProtocolInfo } from "../../../api/dectecApi";
import { useDataContext } from "../../../hooks/useDataContext";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";
import { GridTable } from "../../../components/dectec/protocols/GridTable";

const Protocols = () => {
  const { data } = useDataContext();

  const [protocolInfo, setProtocolInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader
            pageHeading="Protocols"
            linkText="Add Protocol"
            pathName="add-protocol"
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

export default Protocols;
