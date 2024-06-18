import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "react-toastify/dist/ReactToastify.css";
import Widgets from "@/components/dectec/redemption/Widgets";
import { PageHeader } from "@/components/common/PageHeader";

const Redemption = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader pageHeading="Redemptions" isLink={false} />
          <Widgets />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Redemption;
