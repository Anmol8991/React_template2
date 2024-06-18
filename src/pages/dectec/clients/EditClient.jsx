import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	Card,
	CardBody,
	Col,
	Form,
	Container,
	Input,
	Label,
	Row,
	FormFeedback,
	InputGroupText,
	InputGroup,
	Spinner,
} from "reactstrap";

import arrow_company from "@/assets/images/demo/arrow-company.png";
import { PageHeader } from "@/components/common/PageHeader";
import { CustomButton } from "../../../components/common/CustomButton";
import {
	editClientInfoApi,
	fetchClientListingApi,
	getPointsFromAmountPaidApi,
} from "../../../api/dectecApi";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";
import FormImage from "../../../components/common/FormImage";
import { countries } from "../../../data/countryData";
import { notify } from "../../../utils/toastify";

export const EditClient = () => {
	const history = useNavigate();
	const { clientId } = useParams();
	const [protocolId, setProtocolId] = useState("");
	const [amountPointDetails, setAmountPointDetails] = useState({
		amount: 0,
		point: 0,
	});
	const [clientDetails, setClientDetails] = useState({
		clientId,
		name: "",
		description: "",
		logo: "",
		country: "",
		state: "",
		city: "",
		address: "",
		zipcode: "",
		fee: null,
		feeType: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchClientListingApi(clientId)
			.then((res) => {
				if (res.success) {
					const {
						clientInfo,
						amountPaid,
						pointsBought,
						pointsRemaining,
						pointsRewarded,
						protocolInfo,
						fee,
						feeType,
					} = res?.data[0];
					setClientDetails({
						...clientDetails,
						name: clientInfo.client,
						description: clientInfo.description,
						logo: clientInfo.clientLogo,
						country:
							countries?.findIndex(
								(obj) =>
									obj.country.toLowerCase() ===
									clientInfo.clientCountry.toLowerCase()
							) ?? "",
						city: clientInfo.clientCity,
						zipcode: clientInfo.clientZipcode,
						state:
							countries[
								countries?.findIndex(
									(obj) =>
										obj.country.toLowerCase() ===
										clientInfo.clientCountry.toLowerCase()
								) ?? ""
							]?.states?.indexOf(clientInfo.clientState) ?? "",
						address: clientInfo.clientAddress,
						fee,
						feeType,
					});
					setAmountPointDetails({
						amount: amountPaid.value,
						point: pointsBought.value,
					});
					setProtocolId(protocolInfo?.protocolId);
				} else {
					setError(res.message);
				}
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const editClientDetails = (e) => {
		e.preventDefault();
		setSaving(true);
		editClientInfoApi({
			...clientDetails,
			country: countries[clientDetails.country].country,
			state: countries[clientDetails.country].states[clientDetails.state],
		})
			.then((res) => {
				if (res.success) {
					notify(res.message, true);
					history("/clients");
				} else {
					setError(res.message);
					notify(res.message, false);
				}
			})
			.catch((error) => {
				setError(error.message);
				notify(error.message, false);
			})
			.finally(() => {
				setSaving(false);
			});
	};

	const handleChange = (e) => {
		setClientDetails({
			...clientDetails,
			[e.target.name]: e.target.value,
		});
	};

	const getPoints = () => {
		setLoading(true);
		getPointsFromAmountPaidApi(protocolId, amountPointDetails.amount)
			.then((res) => {
				setClientDetails({ ...clientDetails, point: res?.data?.points });
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	};

	

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Edit Client" isLink={false} />
					<Col>
						<Card>
							<CardBody>
								<Form onSubmit={editClientDetails}>
									<Row>
										<Col lg={8}>
											<Row>
												<Col lg={6}>
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
																setClientDetails({
																	...clientDetails,
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
															value={clientDetails.name}
															maxLength={100}
															minLength={3}
														/>
													</div>
												</Col>
												<Col
													lg={6}
													className="d-flex justify-content-between align-items-center"
												>
													<Col md={5} lg={5}>
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
																		disabled
																		placeholder="0"
																		className="form-control bg-light"
																		id="nameInput"
																		value={amountPointDetails.amount}
																	/>
																</InputGroup>
															</div>
														</div>
													</Col>
													<Col
														md={2}
														lg={2}
														className="fs-2 d-flex justify-content-center text-primary"
													>
														{loading ? <Spinner size="sm" /> : "="}
													</Col>
													<Col md={5} lg={5}>
														<div className="mb-2">
															<Label
																htmlFor="firstnameInput"
																className="form-label fs-6 "
															>
																Points Bought{" "}
																<span className="text-primary">*</span>
															</Label>
															<Input
																type="number"
																required
																disabled
																className="form-control bg-light"
																id="nameInput"
																placeholder="0"
																value={amountPointDetails.point}
															/>
														</div>
													</Col>
												</Col>
											</Row>
											<Row>
												<Col lg={8}>
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
																setClientDetails({
																	...clientDetails,
																	description: e.target.value,
																})
															}
															value={clientDetails.description}
															maxLength={1000}
															minLength={20}
														/>
													</div>
												</Col>

												<Col lg={4}>
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
																		value={
																			clientDetails?.feeType
																				? clientDetails?.feeType ===
																				  "percentage"
																					? "percentage"
																					: "amount"
																				: ""
																		}
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
																	value={
																		clientDetails?.fee && clientDetails?.fee
																	}
																	placeholder={"Enter"}
																	onChange={handleChange}
																/>

																<InputGroupText className="fs-6">
																	{clientDetails?.feeType
																		? clientDetails?.feeType === "percentage"
																			? "%"
																			: "$"
																		: "-"}
																</InputGroupText>
															</InputGroup>
														</div>
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
															type="select"
															required
															id="nameInput"
															className="bg-light form-control cursor-pointer"
															value={clientDetails.country}
															defaultValue=""
															onChange={(e) =>
																setClientDetails({
																	...clientDetails,
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
															value={clientDetails.state}
															defaultValue=""
															onChange={(e) =>
																setClientDetails({
																	...clientDetails,
																	state: e.target.value,
																})
															}
														>
															<option value="" disabled hidden>
																{clientDetails.country
																	? "Select State"
																	: "Choose Country First"}
															</option>
															{countries[clientDetails.country]?.states.map(
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
															value={clientDetails.city}
															onChange={(e) =>
																setClientDetails({
																	...clientDetails,
																	city: e.target.value,
																})
															}
														/>
													</div>
												</Col>
											</Row>

											<Row lg={12} className="d-flex justify-content-between">
												<Col md={8} lg={8}>
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
																setClientDetails({
																	...clientDetails,
																	address: e.target.value,
																})
															}
															value={clientDetails.address}
															maxLength={1000}
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
															value={clientDetails.zipcode}
															onChange={(e) =>
																setClientDetails({
																	...clientDetails,
																	zipcode: e.target.value,
																})
															}
														/>
													</div>
												</Col>
											</Row>
										</Col>

										<Col
											lg={4}
											className="d-flex flex-column justify-content-between py-3"
										>
											<FormImage
												label="Client Logo"
												image={clientDetails.logo}
												onChange={(e) => {
													if (e.target.files[0].size / 1024 > 1024) {
														notify("Please select Image less than 1MB", false);
													} else if (
														!e.target.files[0].type.startsWith("image/")
													) {
														notify("Please select a valid image", false);
													} else {
														setClientDetails({
															...clientDetails,
															logo: e.target.files[0],
														});
													}
												}}
											/>

											<div className="hstack gap-3 justify-content-center">
												<button
													className="btn btn-light py-1 px-3"
													disabled={loading || saving}
													onClick={() => history("/clients")}
												>
													Cancel
												</button>
												<button
													type="submit"
													className="btn btn-primary py-1 px-3"
													disabled={saving}
												>
													{saving ? "Saving..." : "Save Changes"}
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
