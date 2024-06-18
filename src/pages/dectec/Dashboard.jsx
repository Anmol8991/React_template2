import React, { useEffect, useState } from "react";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";

import ClientRevenue from "@/components/dectec/dashboard/ClientRevenue";
import ProtocolRevenue from "@/components/dectec/dashboard/ProtocolRevenue.jsx";
import RedeemedAmount from "@/components/dectec/dashboard/RedeemedAmount.jsx";
import TopTenRedemptions from "@/components/dectec/dashboard/TopTenRedemptions.jsx";

import { WidgetList } from "@/components/common/WidgetList";

import { fetchDashboardSummary } from "../../api/dectecApi";
import { dectecDashboardWidgetData } from "../../utils/createWidgetData";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardSummary, setDashboardSummary] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardSummary()
      .then((res) => {
        if (res.success) {
          const newData = dectecDashboardWidgetData(res?.data);
          setDashboardSummary(newData);
        } else {
          setError(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  document.title = "Dashboard | Dectec Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <WidgetList
                    loading={loading}
                    error={error}
                    widgetsData={dashboardSummary}
                    xl={3}
                    md={6}
                  />
                </Row>
                <Row>
                  <Col lg={4}>
                    <ProtocolRevenue />
                  </Col>

                  <Col lg={8}>
                    <ClientRevenue />
                  </Col>
                </Row>

                <Row>
                  <Col xl={8}>
                    <TopTenRedemptions />
                  </Col>

                  <Col xl={4}>
                    <RedeemedAmount />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
