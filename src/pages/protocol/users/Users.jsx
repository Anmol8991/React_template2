import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";
import ErrorBox from "../../../components/common/ErrorBox";
import Loader from "../../../components/common/Loader";

import "react-toastify/dist/ReactToastify.css";

import { WidgetList } from "@/components/common/WidgetList";
import { ToastContainer } from "react-toastify";

import { CustomButton } from "../../../components/common/CustomButton";
import { fetchUserOverview } from "../../../api/dectecApi";
import { dectectUserWidgetData } from "../../../utils/createWidgetData";
import { GridTable } from "../../../components/protocol/users/GridTable";

const Users = () => {
  const [active, setActive] = useState("All");
  const [userWidgetData, setUserWidgetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUserOverview()
      .then((res) => {
        if (res.success) {
          console.log(res);
          const newData = dectectUserWidgetData(res?.data);
          setUserWidgetData(newData);
        } else {
          console.log(res?.message);
          setError(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h4 className=" mb-0 flex-grow-1 text-dark">Users</h4>

                    <CustomButton
                      btnText="Add User"
                      btnClassNames="btn btn-danger"
                      btnIcon={
                        <i className="ri-add-line align-bottom me-1"></i>
                      }
                      path="add-user"
                      isLink
                    />
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <Row>
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorBox error={error} />
            ) : (
              <WidgetList widgetsData={userWidgetData} xl={4} md={4} />
            )}
          </Row>
          <Col>
            <Card>
              <CardBody className="pt-0">
                <div>
                  <GridTable />
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

export default Users;
