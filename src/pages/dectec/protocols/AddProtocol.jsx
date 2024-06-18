import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../styles/custom.scss";
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
} from "reactstrap";
// import defaultLogo from "@/assets/images/demo/dectec.png";
import { PageHeader } from "@/components/common/PageHeader";
import { CustomButton } from "@/components/common/CustomButton";
import { addProtocolApi } from "../../../api/dectecApi";
import defaultLogo from "@/assets/images/default_person.png";
import { useFormik } from "formik";
import FormImage from "../../../components/common/FormImage";
import ErrorBox from "../../../components/common/ErrorBox";
import { notify } from "../../../utils/toastify";
export const AddProtocol = () => {
	const history = useNavigate();
	const [protocolName, setProtocolName] = useState("");
	const [protocolType, setProtocolType] = useState("");
	const [protocolDescription, setProtocolDescription] = useState("");
	const [values, setValues] = useState({
		protocolName: "",
		protocolType: "",
		protocolDescription: "",
		protocolLogo: null,
		feeType: null,
		fee: null,
		pointValue: null,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const addProtocol = async (e) => {
		e.preventDefault();
		setLoading(true);
		await addProtocolApi({
			name: values.protocolName,
			type: values.protocolType,
			description: values.protocolDescription,
			logo: values.protocolLogo,
			feeType: values.feeType,
			fee: values.fee,
			pointValue: values.pointValue,
		})
			.then((res) => {
				if (res.success) {
					history("/protocols");
					notify(res.message, true);
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
				setLoading(false);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Add Protocol" isLink={false} />
					<Col>
						<Card>
							<CardBody>
								<Form onSubmit={addProtocol}>
									<Row>
										<Col lg={8} className="">
											<Row>
												<Col lg={6}>
													<div className="mb-2">
														<Label
															htmlFor="protocolName"
															className="form-label fs-6"
														>
															Protocol Name{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															onChange={handleChange}
															required
															type="text"
															name="protocolName"
															pattern="^[a-zA-Z0-9@-_$#.\s]+$"
															onKeyPress={(e) =>
																!/^[a-zA-Z0-9@\-_\$\#\.\s]+$/.test(e.key) &&
																e.preventDefault()
															}
															id="protocolName"
															className="form-control bg-light"
															placeholder="Enter Protocol Name"
															value={values.protocolName}
															maxLength={100}
															minLength={3}
														/>
													</div>
												</Col>

												<Col lg={6}>
													<div className="mb-2 ">
														<Label
															htmlFor="protocolType"
															className="form-label fs-6 "
														>
															Protocol Type{" "}
															<span className="text-primary">*</span>
														</Label>
														<select
															type="select"
															required
															name="protocolType"
															id="protocolType"
															className="bg-light form-control cursor-pointer"
															defaultValue=""
															onChange={handleChange}
														>
															<option value="" disabled hidden>
																Select Protocol Type
															</option>
															<option value="HR">HR</option>
															<option value="AI">AI</option>
															<option value="Real Estate">Real Estate</option>
															<option value="Training">Training</option>
														</select>
													</div>
												</Col>
											</Row>

											<Col lg={12}>
												<div className="mb-2">
													<Label
														htmlFor="protocolDescription"
														className="form-label fs-6"
													>
														Protocol Description{" "}
														<span className="text-primary">*</span>
													</Label>
													<Input
														type="textarea"
														rows={4}
														required
														className="form-control bg-light"
														id="protocolDescription"
														name="protocolDescription"
														placeholder="Enter Protocol Description"
														onChange={handleChange}
														value={values.protocolDescription}
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
																		disabled={!values.feeType}
																		onChange={handleChange}
																		placeholder={"Enter"}
																	/>

																	<InputGroupText className="fs-6">
																		{values?.feeType
																			? values.feeType === "percentage"
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
												image={values.protocolLogo}
												onChange={(e) => {
													if (e.target.files[0].size / 1024 > 1024) {
														notify("Please select image less than 1MB", false);
													} else if (
														!e.target.files[0].type.startsWith("image/")
													) {
														notify("Please select a valid image", false);
													} else {
														setValues({
															...values,
															protocolLogo: e.target.files[0],
														});
													}
												}}
											/>
											<div className="hstack gap-3 justify-content-center">
												<button
													className="btn btn-light py-1 px-3"
													disabled={loading}
													onClick={() => history("/protocols")}
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
