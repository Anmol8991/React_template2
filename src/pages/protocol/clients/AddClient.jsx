import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	Col,
	Form,
	Container,
	Input,
	Label,
	Row,
	InputGroup,
	InputGroupText,
	Spinner,
} from "reactstrap";
import { PageHeader } from "@/components/common/PageHeader";
import {
	addClientApi,
	getPointsFromAmountPaidApi,
} from "../../../api/protocolApi.js";

import { countries } from "../../../data/countryData";
import FormImage from "../../../components/common/FormImage";
import { notify } from "../../../utils/toastify";

const AddClient = () => {
	const history = useNavigate();
	const [clientData, setClientData] = useState({
		name: "",
		email: "",
		protocolId: JSON.parse(localStorage.getItem("user_data")).protocolId,
		city: "",
		state: "",
		country: "",
		zipcode: "",
		address: "",
		logo: null,
		description: "",
		amounts: "",
		points: "",
		feeType: null,
		fee: null,
	});
	const [loading, setLoading] = useState(false);
	const addClient = (e) => {
		e.preventDefault();
		setLoading(true);
		addClientApi({
			...clientData,
			country: countries[clientData?.country]?.country ?? "",
			state: countries[clientData?.country]?.states[clientData?.state] ?? "",
		})
			.then((res) => {
				if (res.success) {
					history("/clients");
					notify(res.message, true);
				} else {
					notify(res.message, false);
				}
			})
			.catch((error) => {
				console.log(error);
				notify(error.message, false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getPoints = () => {
		setLoading(true);
		console.log({ clientData: clientData.protocolId });
		getPointsFromAmountPaidApi(clientData.protocolId, clientData.amounts)
			.then((res) => {
				console.log({ res });
				setClientData({ ...clientData, points: res?.data?.points });
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		const getData = setTimeout(() => {
			if (clientData.amounts) {
				getPoints();
			} else {
				setPointsBought("");
			}
		}, 1000);

		return () => {
			clearTimeout(getData);
		};
	}, [clientData.amounts]);

	const handleChange = (e) => {
		setClientData({ ...clientData, [e.target.name]: e.target.value });
		console.log({ clientData });
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Add Client" isLink={false} />
					<Col>
						<Card>
							<CardBody>
								<Form onSubmit={addClient}>
									<Row>
										<Col lg={8}>
											<Row>
												<Col md={6} lg={6}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6"
														>
															Client Name{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															onChange={(e) =>
																setClientData({
																	...clientData,
																	name: e.target.value,
																})
															}
															required
															pattern="^[a-zA-Z0-9@\-_\$\#\.\s]+$"
															onKeyPress={(e) =>
																!/^[a-zA-Z0-9@\-_\$\#\.\s]+$/.test(e.key) &&
																e.preventDefault()
															}
															type="text"
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter Client Name"
															value={clientData.name}
															maxLength={100}
															minLength={3}
														/>
													</div>
												</Col>
												<Col md={6} lg={6}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															Email <span className="text-primary">*</span>
														</Label>
														<Input
															onChange={(e) =>
																setClientData({
																	...clientData,
																	email: e.target.value,
																})
															}
															required
															type="email"
															pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
															placeholder="Enter Email Eg. example@mail.com"
															className="form-control bg-light"
															id="nameInput"
															value={clientData.email}
															maxLength={100}
														/>
													</div>
												</Col>
											</Row>

											<Row lg={12} className="d-flex justify-content-between">
												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															Country <span className="text-primary">*</span>
														</Label>
														<select
															invalid={clientData.country === ""}
															type="select"
															required
															id="nameInput"
															className="bg-light form-control cursor-pointer"
															defaultValue=""
															onChange={(e) =>
																setClientData({
																	...clientData,
																	country: e.target.value,
																})
															}
														>
															<option value="" disabled hidden>
																Select Country
															</option>
															{countries.map((item, i) => (
																<option key={i} value={i}>
																	{item.country}
																</option>
															))}
														</select>
													</div>
												</Col>
												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															State <span className="text-primary">*</span>
														</Label>

														<select
															type="select"
															required
															id="nameInput"
															className="bg-light form-control cursor-pointer"
															defaultValue=""
															onChange={(e) =>
																setClientData({
																	...clientData,
																	state: e.target.value,
																})
															}
														>
															<option value="" disabled hidden>
																{clientData.country
																	? "Select State"
																	: "Choose Country First"}
															</option>
															{countries[clientData.country]?.states.map(
																(item, i) => (
																	<option key={i} value={i}>
																		{item}
																	</option>
																)
															)}
														</select>
													</div>
												</Col>
												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															City <span className="text-primary">*</span>
														</Label>
														<Input
															type="text"
															required
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter City"
															value={clientData.city}
															onChange={(e) =>
																setClientData({
																	...clientData,
																	city: e.target.value,
																})
															}
														/>
													</div>
												</Col>
											</Row>

											<Row lg={12} className="d-flex justify-content-between">
												<Col md={6} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="lastnameInput"
															className="form-label fs-6"
														>
															Address <span className="text-primary">*</span>
														</Label>
														<Input
															type="textarea"
															required
															rows={2}
															className="form-control bg-light"
															id="lastnameInput"
															placeholder="Enter Address"
															onChange={(e) =>
																setClientData({
																	...clientData,
																	address: e.target.value,
																})
															}
															value={clientData.address}
															maxLength={1000}
															minLength={20}
														/>
													</div>
												</Col>

												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															Zip Code <span className="text-primary">*</span>
														</Label>
														<Input
															type="number"
															required
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter Zip Code"
															value={clientData.zipcode}
															onChange={(e) =>
																setClientData({
																	...clientData,
																	zipcode: e.target.value,
																})
															}
														/>
													</div>
												</Col>
												<Col md={4} lg={4}>
													<div className="mb-2 ">
														<Label
															htmlFor="feeType"
															className="form-label fs-6 "
														>
															Transaction Fee{" "}
															<span className="text-primary">*</span>
														</Label>
														<div className="d-flex">
															<InputGroup>
																<div>
																	<select
																		type="select"
																		className="bg-light form-control cursor-pointer"
																		defaultValue=""
																		required
																		name="feeType"
																		id="feeType"
																		onChange={handleChange}
																	>
																		<option value="" disabled hidden>
																			Select Fee Type
																		</option>
																		<option value="percentage">
																			Percentage
																		</option>
																		<option value="amount">Amount</option>
																	</select>
																</div>
																<Input
																	type="number"
																	required
																	className="form-control bg-light"
																	id="fee"
																	name="fee"
																	disabled={!clientData.feeType}
																	onChange={handleChange}
																	placeholder={"Enter"}
																/>

																<InputGroupText className="fs-6">
																	{clientData?.feeType
																		? clientData.feeType === "percentage"
																			? "%"
																			: "$"
																		: "-"}
																</InputGroupText>
															</InputGroup>
														</div>
													</div>
												</Col>
											</Row>

											<Row>
												<Col lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="lastnameInput"
															className="form-label fs-6"
														>
															Description{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															type="textarea"
															required
															rows={2}
															className="form-control bg-light"
															id="lastnameInput"
															placeholder="Enter Description"
															onChange={(e) =>
																setClientData({
																	...clientData,
																	description: e.target.value,
																})
															}
															value={clientData.description}
															maxLength={1000}
															minLength={20}
														/>
													</div>
												</Col>

												<Col lg={6}>
													<div className="d-flex justify-content-between align-items-center">
														<Col md={6} lg={6}>
															<div className="mb-2">
																<Label
																	htmlFor="firstnameInput"
																	className="form-label fs-6 "
																>
																	Amount Paid{" "}
																	<span className="text-primary">*</span>
																</Label>
																<div className="d-flex">
																	<InputGroup>
																		<InputGroupText className="fs-6">
																			$
																		</InputGroupText>
																		<Input
																			type="number"
																			required
																			className="form-control bg-light"
																			id="nameInput"
																			placeholder={
																				clientData.protocolId
																					? "0"
																					: "Select Protocol"
																			}
																			disabled={!clientData.protocolId}
																			value={clientData.amounts}
																			onChange={(e) => {
																				if (clientData.protocolId) {
																					setClientData({
																						...clientData,
																						amounts: e.target.value,
																					});
																				}
																			}}
																			onBlur={() => {
																				if (clientData.amounts) {
																					getPoints();
																				} else {
																					setClientData({
																						...clientData,
																						points: "",
																					});
																				}
																			}}
																		/>
																	</InputGroup>
																</div>
															</div>
														</Col>
														<Col
															md={2}
															lg={2}
															className="fs-2 d-flex justify-content-center align-items-center text-primary"
														>
															{loading ? <Spinner size="sm" /> : "="}
														</Col>
														<Col md={4} lg={4}>
															<div className="mb-2">
																<Label
																	htmlFor="firstnameInput"
																	className="form-label fs-6 "
																>
																	Points Bought{" "}
																</Label>
																<Input
																	type="number"
																	required
																	// disabled
																	className="form-control bg-light"
																	id="nameInput"
																	placeholder="0"
																	value={clientData.points}
																/>
															</div>
														</Col>
													</div>
												</Col>

												<Col></Col>
											</Row>
										</Col>
										<Col
											lg={4}
											className="d-flex flex-column justify-content-between py-2"
										>
											<FormImage
												label="Client Logo"
												image={clientData.logo}
												onChange={(e) => {
													if (e.target.files[0].size / 1024 > 1024) {
														notify("Please select Image less than 1MB", false);
													} else if (
														!e.target.files[0].type.startsWith("image/")
													) {
														notify("Please select a valid image", false);
													} else {
														setClientData({
															...clientData,
															logo: e.target.files[0],
														});
													}
												}}
											/>
											<div className="hstack gap-3 justify-content-center mb-2">
												<button
													className="btn btn-light py-1 px-3"
													disabled={loading}
													onClick={() => history("/clients")}
												>
													Cancel
												</button>
												<button
													type="submit"
													className="btn btn-primary py-1 px-3"
													disabled={loading}
												>
													{loading ? "Saving..." : "Submit"}
												</button>
											</div>
										</Col>
									</Row>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Container>
			</div>
			<Row></Row>
		</React.Fragment>
	);
};

export default AddClient;
