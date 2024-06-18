import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ pageTitle, title }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">{title}</h4>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
