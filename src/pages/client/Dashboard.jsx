import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

// import Widgets from "./Widgets.js";
import Popularity from "@/components/client/dashboard/Popularity";
import ClientRevenue from "@/components/client/dashboard/ClientRevenue";
import Redemptions from "@/components/client/dashboard/Redemptions";
import UsersByCountry from "@/components/client/dashboard/UsersByCountry";
import { GridTable } from "@/components/client/dashboard/rewards/GridTable";
import { WidgetList } from "@/components/common/WidgetList";

import { fetchClientOverview } from "../../api/dectecApi";
import { dectectViewClientWidgetData } from "../../utils/createWidgetData";

const Dashboard = () => {
  const clientId = JSON.parse(localStorage.getItem("user_data"))._id;
  const [loading, setLoading] = useState(false);
  const [clientOverview, setClientOverview] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchClientOverview(clientId)
      .then((res) => {
        if (res.success) {
          const newData = dectectViewClientWidgetData(res?.data?.data ?? []);
          setClientOverview(newData);
        } else {
          console.log(res.message);
          // setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // setError(err.message);
      })
      .finally(setLoading(false));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "465px" }}>
        <Container fluid>
          <Row>
            <Col>
              <Row>
                <WidgetList
                  loading={loading}
                  widgetsData={clientOverview}
                  xl={3}
                  md={6}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <ClientRevenue />
            </Col>
            <Col>
              <Popularity />
            </Col>
          </Row>
          <Row>
            <Col>
              <UsersByCountry />
            </Col>
            <Col lg={5}>
              <Redemptions />
            </Col>
          </Row>
          <Row>
            <Col>
              <GridTable />
              {/* <EarnedPointsHistory /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
