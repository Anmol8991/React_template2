import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  CardHeader,
  Container,
} from "reactstrap";
// import Flatpickr from "react-flatpickr";
import { ToastContainer } from "react-toastify";
import TableContainer from "./TableContainer";
import { activityData } from "@/data/utility/data";
import { GridActivityHistoryTable } from "./GridActivityHistoryTable";

export const ActivityList = () => {
  // let history = useHistory();
  const [justifyTab, setjustifyTab] = useState("1");
  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  /**
   * Formats the size
   */
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Card id="invoiceList">
              <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 flex-grow-1 text-dark">Activity History</h5>
                  </div>
              </CardHeader>
            </Card>
          </Row>
          <Row>
            <Card>
              <CardBody className="pt-0">
                <div>
                  {/* <DataTable
                    tableData={tableData}
                    tableFilter={true}
                    pagination={true}
                  /> */}
                  {/* <TableContainer data={activityData} index={2} /> */}
                  <GridActivityHistoryTable />
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
