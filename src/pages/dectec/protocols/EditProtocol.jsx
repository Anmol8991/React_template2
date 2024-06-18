import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
	InputGroup,
	InputGroupText,
} from "reactstrap";
import Loader from "../../../components/common/Loader";
import protocol from "@/assets/images/demo/perk.png";
import { PageHeader } from "@/components/common/PageHeader";
import { CustomButton } from "@/components/common/CustomButton";
import { editProtocolInfo, viewProtocolInfo } from "../../../api/dectecApi";
import defaultLogo from "@/assets/images/default_person.png";
import FormImage from "../../../components/common/FormImage";
import ErrorBox from "../../../components/common/ErrorBox";
import { notify } from "../../../utils/toastify";

export const EditProtocol = (props) => {
	const history = useNavigate();
	const { protocolId } = useParams();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [protocolDetails, setProtocolDetails] = useState({
		protocolId,
		name: "",
		type: "",
		description: "",
		logo: null,
		fee: null,
		feeType: null,
		pointValue: null,
	});
	const [error, setError] = useState(null);
	const handleChange = (e) => {
		setProtocolDetails({
			...protocolDetails,
			[e.target.name]: e.target.value,
		});
	};
	useEffect(() => {
		setLoading(true);
		viewProtocolInfo(protocolId)
			.then(({ success, message, data }) => {
				if (success) {
					const {
						protocolInfo,
						protocolType,
						protocolDescription,
						fee,
						feeType,
						pointValue,
					} = data[0];
					setProtocolDetails({
						...protocolDetails,
						name: protocolInfo.name,
						logo: protocolInfo.protocolLogo,
						type: protocolType,
						description: protocolDescription,
						fee,
						feeType,
						pointValue: pointValue ? pointValue : null,
					});
				} else {
					setError(message);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);
	const handleForm = (e) => {
		e.preventDefault();
		setSaving(true);
		editProtocolInfo(protocolDetails)
			.then((res) => {
				if (res.success) {
					history("/protocols");
					notify(res.message, true);
				} else {
					notify(res.message, false);
				}
			})
			.catch((err) => {
				notify(err.message, false);
			})
			.finally(() => setSaving(false));
	};
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Edit Protocol" isLink={false} />
					<Col>
						{loading ? (
							<Loader />
						) : error ? (
							<ErrorBox error={error} />
						) : (
							<Card>
								<CardBody>
									<Form onSubmit={handleForm}>
										<Row>
											<Col lg={8}>
												<Row>
													<Col lg={6}>
														<div className="mb-2">
															<Label
																htmlFor="firstnameInput"
																className="form-label fs-6"
															>
																Protocol Name{" "}
																<span className="text-primary">*</span>
															</Label>
															<Input
																onChange={handleChange}
																required
																name="name"
																pattern="^[a-zA-Z0-9@-_$#.\s]+$"
																onKeyPress={(e) =>
																	!/^[a-zA-Z0-9@\-_\$\#\.\s]+$/.test(e.key) &&
																	e.preventDefault()
																}
																type="text"
																className="form-control bg-light"
																id="nameInput"
																placeholder="Enter Protocol Name"
																value={protocolDetails.name}
																maxLength={100}
																minLength={3}
															/>
														</div>
													</Col>
													<Col lg={6}>
														<Col>
															<div className="mb-2">
																<Label
																	htmlFor="phonenumberInput"
																	className="form-label fs-6"
																>
																	Protocol Type{" "}
																	<span className="text-primary">*</span>
																</Label>
																<select
																	type="select"
																	name="type"
																	id="protocolType"
																	className="form-control bg-light cursor-pointer"
																	defaultValue={protocolDetails.type}
																	onChange={handleChange}
																>
																	<option value="HR">HR</option>
																	<option value="AI">AI</option>
																	<option value="Real Estate">
																		Real Estate
																	</option>
																	<option value="Training">Training</option>
																</select>
															</div>
														</Col>
													</Col>
												</Row>

												<Col lg={12}>
													<div className="mb-2">
														<Label
															htmlFor="lastnameInput"
															className="form-label fs-6"
														>
															Protocol Description{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															type="textarea"
															name="description"
															className="form-control bg-light"
															id="lastnameInput"
															placeholder="Add description"
															rows={4}
															onChange={handleChange}
															value={protocolDetails.description}
															maxLength={500}
															minLength={20}
														/>
													</div>
												</Col>

												<Col lg={12}>
													<Row>
														<Col md={6} lg={4}>
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
																				defaultValue={
																					protocolDetails?.feeType
																						? protocolDetails?.feeType ===
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
																				protocolDetails?.fee &&
																				protocolDetails?.fee
																			}
																			placeholder={"Enter"}
																			onChange={handleChange}
																		/>

																		<InputGroupText className="fs-6">
																			{protocolDetails?.feeType
																				? protocolDetails?.feeType ===
																				  "percentage"
																					? "%"
																					: "$"
																				: "-"}
																		</InputGroupText>
																	</InputGroup>
																</div>
															</div>
														</Col>

														<Col md={6} lg={4}>
															<div className="mb-2 ">
																<Label
																	htmlFor="feeType"
																	className="form-label fs-6 "
																>
																	Point Value{" "}
																	<span className="text-primary">*</span>
																</Label>
																<div className="d-flex">
																	<InputGroup>
																		<InputGroupText className="fs-6">
																			$ 1
																		</InputGroupText>
																		<InputGroupText className="fs-6">
																			=
																		</InputGroupText>

																		<Input
																			type="number"
																			required
																			className="form-control bg-light"
																			id="pointValue"
																			name="pointValue"
																			value={
																				protocolDetails?.pointValue &&
																				protocolDetails?.pointValue
																			}
																			onChange={handleChange}
																			placeholder={"Enter"}
																		/>

																		<InputGroupText className="fs-6">
																			Points
																		</InputGroupText>
																	</InputGroup>
																</div>
															</div>
														</Col>
													</Row>
												</Col>
											</Col>

											<Col
												lg={4}
												className="d-flex flex-column justify-content-between py-2"
											>
												<FormImage
													label="Protocol Logo"
													image={protocolDetails.logo}
													onChange={(e) => {
														if (e.target.files[0].size / 1024 > 1024) {
															notify(
																"Please select Image less than 1MB",
																false
															);
														} else if (
															!e.target.files[0].type.startsWith("image/")
														) {
															notify("Please select a valid image", false);
														} else {
															setProtocolDetails({
																...protocolDetails,
																logo: e.target.files[0],
															});
														}
													}}
												/>

												<div className="hstack gap-3 justify-content-center">
													<button
														className="btn btn-light py-1 px-3"
														disabled={loading || saving}
														onClick={() => history("/protocols")}
													>
														Cancel
													</button>
													<button
														type="submit"
														className="btn btn-primary py-1 px-3"
														disabled={loading || saving}
													>
														{loading || saving ? "Saving..." : "Save Changes"}
													</button>
												</div>
											</Col>
										</Row>
									</Form>
								</CardBody>
							</Card>
						)}
					</Col>
				</Container>
			</div>
			<Row></Row>
		</React.Fragment>
	);
};
