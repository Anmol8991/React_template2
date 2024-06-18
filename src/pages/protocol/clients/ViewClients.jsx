import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Row,
	Table,
	Button,
	Modal,
	ModalBody,
	Form,
	ModalHeader,
} from "reactstrap";

import { ToastContainer } from "react-toastify";
import { CustomButton } from "../../../components/common/CustomButton";
import { PaymentForm } from "../../../components/protocol/viewClient/PaymentForm";
import {
	fetchClientListingApi,
	fetchClientOverview,
} from "../../../api/protocolApi.js";
import ErrorBox from "../../../components/common/ErrorBox";
import Loader from "../../../components/common/Loader";
import { dectectViewClientWidgetData } from "../../../utils/createWidgetData";
import { WidgetList } from "../../../components/common/WidgetList";
import profileBg from "@/assets/images/profile-bg.jpg";
import defaultLogo from "@/assets/images/default_person.png";
import { GridTable } from "../../../components/protocol/viewClient/activities/GridTable";
import { GridPaymentsTable } from "../../../components/protocol/viewClient/payments/GridPaymentsTable";

const ViewClient = () => {
	const { clientId } = useParams();
	const activityRef = useRef();
	const [modal_successMessage, setmodal_successMessage] = useState(false);
	const [clientDetails, setClientDetails] = useState([]);
	const [clientOverview, setClientOverview] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updatePayments, setUpdatePayments] = useState(false);
	const [pageDetails, setPageDetails] = useState({
		pageNumber: 1,
		pageSize: 5,
		protocolId: "",
	});

	useEffect(() => {
		fetchClientListingApi(clientId)
			.then((res) => {
				console.log(res);
				if (res.success) {
					setClientDetails(res?.data[0]);
				} else {
					console.log(res.message);
					setError(res.message);
				}
			})
			.catch((error) => {
				console.log(error);
				setError("Some Error Occurred");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchClientOverview(clientId)
			.then((res) => {
				if (res.success) {
					console.log(res.data, "kk");
					const newData = dectectViewClientWidgetData(res?.data?.data ?? []);
					setClientOverview(newData);
				} else {
					console.log(res.message);
					setError(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
			})
			.finally(setLoading(false));
	}, []);

	function tog_successMessage() {
		setmodal_successMessage(!modal_successMessage);
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<div className="profile-foreground position-relative mx-n4 mt-n4">
						<div className="profile-wid-bg">
							<img src={profileBg} alt="" className="profile-wid-img" />
						</div>
					</div>
					<div className="pt-4  mb-lg-3 pb-lg-2 mb-2">
						<Row className="g-4">
							<div className="col-auto">
								<div className="avatar-lg">
									<img
										src={
											clientDetails?.clientInfo?.clientLogo
												? clientDetails?.clientInfo?.clientLogo
												: defaultLogo
										}
										alt=""
										className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
									/>
								</div>
							</div>

							<Col>
								<div className="p-2">
									<h3 className="text-white mb-1">
										{clientDetails?.clientInfo?.client}
									</h3>
									<p className="text-white-75">
										{clientDetails?.clientInfo?.clientEmail}
									</p>
									<div className="hstack text-white-50 gap-1">
										{/* <div className="me-2">
                      <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>
                      {userData.city}, {userData.country}
                    </div> */}
										<div className="text-white">
											<i className="ri-building-line me-1 text-white-75 fs-20 align-middle"></i>
											{clientDetails?.clientInfo?.clientCity},{" "}
											{clientDetails?.clientInfo?.clientCountry}
										</div>
									</div>
								</div>
							</Col>
							<Col
								xs={12}
								className="col-lg-auto order-last order-lg-0 px-0 px-lg-2"
							>
								<Col className="text text-white-50 text-center d-flex align-items-center gap-2">
									{/* <Col lg={4} xs={3}> */}
									<div className="p-2">
										<button
											className="btn btn-info m-2"
											style={{ pointerEvents: "none" }}
										>
											<span>Client</span>
										</button>
										{/* <Badge color="light m-2">Primary</Badge> */}
									</div>

									{/* </Col> */}
									{/* <Col lg={8} xs={3}> */}
									<div className="flex-shrink-0">
										<div className="d-flex gap-2 flex-wrap">
											<CustomButton
												btnText="Buy Points"
												btnClassNames="btn btn-danger"
												btnClickHandler={tog_successMessage}
												isLink={false}
												path="#"
												btnIcon={
													<i className=" ri-creative-commons-nc-line align-bottom me-1" />
												}
											/>
										</div>
									</div>
									{/* </Col> */}
								</Col>
							</Col>
						</Row>
					</div>
					<Row>
						<Col>
							<div className="h-100">
								<Row>
									<Col lg={12}>
										<Row>
											<WidgetList
												loading={loading}
												error={error}
												xl={null}
												md={null}
												flex={1}
												activityRef={activityRef}
												widgetsData={clientOverview}
											/>
										</Row>
									</Col>
								</Row>

								<Row>
									<Col lg={12}>
										<Card id="invoiceList">
											<CardHeader className="border-0 pb-1">
												<div
													className="d-flex align-items-center"
													ref={activityRef}
												>
													<h5 className="card-title mb-0 flex-grow-1">
														Activities
													</h5>
													<div className="flex-shrink-0"></div>
												</div>
											</CardHeader>

											<CardBody className="pt-0">
												<div>
													{/* <TableContainer data={activities} index={4} /> */}
													<GridTable />
													<ToastContainer closeButton={false} limit={1} />
												</div>
											</CardBody>
										</Card>
									</Col>
								</Row>

								<Row>
									<Col lg={12}>
										<Card id="invoiceList">
											<CardHeader className="border-0 pb-1">
												<div
													className="d-flex align-items-center"
													ref={activityRef}
												>
													<h5 className="card-title mb-0 flex-grow-1">
														Payments
													</h5>
													<div className="flex-shrink-0"></div>
												</div>
											</CardHeader>

											<CardBody className="pt-0">
												<div>
													<GridPaymentsTable updatePayments={updatePayments} />
													{/* 
                            <PaymentsTableContainer
                            data={paymentsHistory}
                            index={4}
                          /> */}
													<ToastContainer closeButton={false} limit={1} />
												</div>
											</CardBody>
										</Card>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Container>
				<Modal
					id="showModal"
					tabIndex="-1"
					isOpen={modal_successMessage}
					toggle={() => {
						tog_successMessage();
					}}
					centered
				>
					<ModalHeader>Buy Points</ModalHeader>
					<ModalBody className="text-center">
						<div className="mt-2">
							<PaymentForm
								setUpdatePayments={setUpdatePayments}
								clientId={clientDetails?.clientInfo?.clientId}
								protocolId={clientDetails?.protocolInfo?.protocolId}
								close={tog_successMessage}
							/>
						</div>
					</ModalBody>
				</Modal>
			</div>
		</React.Fragment>
	);
};

export default ViewClient;
