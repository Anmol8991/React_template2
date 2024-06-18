import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
// import Widgets from "@/components/protocol/dashboard/Widgets2";
import PointsHistory from "@/components/protocol/dashboard/PointsHistory";
import UsersByCountry from "@/components/protocol/dashboard/UsersByCountry";
import TopUsers from "@/components/protocol/dashboard/TopUsers";

import { WidgetList } from "@/components/common/WidgetList";
import { dashboardWidgets } from "@/data/protocol/data";
import sophiaverse2 from "@/assets/images/demo/sophia5.png";
import twinLogo from "@/assets/images/demo/twinLogo.webp";
import Redemptions from "@/components/protocol/dashboard/Redemptions";
import TopTenRedemptions from "../../components/protocol/dashboard/TopTenRedemptions";
import { fetchProtocolOverview } from "../../api/protocolApi";
import { getProtocolWidgetData } from "../../utils/createWidgetData";

const Dashboard = () => {
	const [dashboardOverviewData, setDashboardOverviewData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetchProtocolOverview()
			.then((res) => {
				if (res.success) {
					console.log(res.data);
					const newData = getProtocolWidgetData(res?.data);
					setDashboardOverviewData(newData);
				} else {
					setError(res?.message);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<Row className="dash-nft">
						<Col lg={12}>
							<Row>
								<Col lg={2}>
									<img
										alt="200x200"
										width="100%"
										height={130}
										src={twinLogo}
										style={{
											objectFit: "contain",
										}}
									></img>
								</Col>
								<Col md={12} lg={10}>
									<Row>
										<WidgetList
											loading={loading}
											error={error}
											widgetsData={dashboardOverviewData}
											xl={4}
											md={4}
											sm={4}
										/>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col xl={8}>
									<PointsHistory />
								</Col>
								<Col xl={4}>
									{/* <UsersByCountry /> */}
									<Card style={{ height: "480px" }}>
										<Redemptions />
									</Card>
								</Col>
							</Row>

							{/* curve line graph  */}

							<Row>
								<Col lg={8}>
									<TopUsers />
								</Col>
								<Col lg={4}>
									<UsersByCountry />
								</Col>
							</Row>
						</Col>

						{/* high paid clients,pie chart,countries  */}
						<Col lg={12}>
							<TopTenRedemptions />
							{/* 10 redemptions */}
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
