import React, { useState } from "react";
import { Card, CardBody, Row, CardHeader, Container, Col } from "reactstrap";
// import Flatpickr from "react-flatpickr";
import { ToastContainer } from "react-toastify";
// import { activityTxnData } from "@/data/utility/data";
// import TransactionTable from "@/components/utility/earnedPoints/TransactionTable";
import { PageHeader } from "@/components/common/PageHeader";
import { GridEarnedPointsHistory } from "@/components/utility/earnedPoints/GridEarnedPointsHistory";

const ActivityTransactionList = () => {
	// let history = useHistory();
	const [justifyTab, setjustifyTab] = useState("1");
	// const justifyToggle = (tab) => {
	//   if (justifyTab !== tab) {
	//     setjustifyTab(tab);
	//   }
	// };

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
									{/* <TransactionTable data={activityTxnData} index={2} /> */}
									<GridEarnedPointsHistory />
									{/* <ToastContainer closeButton={false} limit={1} /> */}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Container>
			</div>
		</React.Fragment>
	);
};
export default ActivityTransactionList;
