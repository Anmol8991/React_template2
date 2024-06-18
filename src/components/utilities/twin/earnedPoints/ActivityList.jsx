import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, CardHeader, Container, Col } from "reactstrap";
// import Flatpickr from "react-flatpickr";
import { ToastContainer } from "react-toastify";
import TableContainer from "./TableContainer";
import { activityData } from "@/data/utility/data";
import { GridActivityHistoryTable } from "./GridActivityHistoryTable";
import { PageHeader } from "@/components/common/PageHeader";

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
					<Col>
						<PageHeader pageHeading="Earning History" isLink={false} />
					</Col>
					<Col>
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
					</Col>
				</Container>
			</div>
		</React.Fragment>
	);
};
