import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";
import ErrorBox from "../../../components/common/ErrorBox";
import Loader from "../../../components/common/Loader";

import "react-toastify/dist/ReactToastify.css";

import {
  protocolUsersData,
  userWidget1,
  userWidget2,
} from "@/data/dectec/data/data";
import { WidgetList } from "@/components/common/WidgetList";
import { ToastContainer } from "react-toastify";
import TableContainer from "@/components/dectec/users/TableContainer";
import { CustomButton } from "../../../components/common/CustomButton";
import { fetchUserOverview, usersListApi } from "../../../api/dectecApi";
import { dectectUserWidgetData } from "../../../utils/createWidgetData";
import { GridTable } from "../../../components/dectec/users/GridTable";

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
          const newData = dectectUserWidgetData(res?.data);
          setUserWidgetData(newData);
        } else {
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
                    {/* <CustomButton
                      btnText="Bulk Upload"
                      btnClassNames="btn btn-primary ms-3 "
                      btnIcon={
                        <i className="ri-add-line align-bottom me-1"></i>
                      }
                    /> */}
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          {/* <PageHeader
            pageHeading="Users"
            linkText="Add User"
            pathName="add-user"
            linkIcon={<i className="ri-add-line align-bottom me-1"></i>}
            isLink
          /> */}
          <Row>
            {/* {active === "All" ? ( */}
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorBox error={error} />
            ) : (
              <WidgetList widgetsData={userWidgetData} xl={4} md={12} />
            )}
            {/* ) : (
              <WidgetList widgetsData={userWidget1} xl={4} md={12} />
            )} */}
          </Row>
          <Col>
            <Card>
              <CardBody className="pt-0">
                <div>
                  {/* <TableContainer
                    data={protocolUsersData}
                    setActive={setActive}
                    index={2}
                  /> */}
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
