import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

//Import Icons
import Img2 from "@/assets/images/nft/img-02.jpg";
import Img3 from "@/assets/images/nft/img-03.jpg";
import Img4 from "@/assets/images/nft/img-04.jpg";
import Img5 from "@/assets/images/nft/img-05.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContainer from "@/components/protocol/earned/TableContainer";
import { clientsData } from "@/data/protocol/index";
import { GridTable } from "../../components/protocol/earned/GridTable";

const Earned = () => {
  const activitiesData = [
    "Learn to Earn",
    "Social media",
    "AI code",
    "Training data",
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Card id="invoiceList">
              <CardHeader className="border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1 text-dark">
                    Points Earned
                  </h5>
                </div>
              </CardHeader>
            </Card>
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

export default Earned;
