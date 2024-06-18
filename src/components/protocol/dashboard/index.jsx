import React from "react";
import { Col, Container, Row } from "reactstrap";
import Widgets from "./Widgets2";
import Marketplace from "./Marketplace";
import UsersByCountry from "./UsersByCountry";
import FeaturedNFT from "./FeaturedNFT";
import RecentOrders from "./RecentOrders";
import UsersRevenue from "./UsersRevenue";
import RedeemedAmount from "./RedeemedAmount";

/**
 *
 * @param {}
 * @returns {}
 */

const DashboardNFT = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="dash-nft">
            <Col lg={8}>
              <Widgets />
              <Marketplace />
              <Row>
                <Col lg={5}>
                  <UsersRevenue />
                </Col>
                <Col lg={7}>
                  <RedeemedAmount />
                </Col>
              </Row>

              <FeaturedNFT />
              <RecentOrders />
            </Col>
            <UsersByCountry />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardNFT;
