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
} from "reactstrap";

import defaultLogo from "@/assets/images/default_person.png";
import { PageHeader } from "@/components/common/PageHeader";
import { CustomButton } from "../../../components/common/CustomButton";
import { countries } from "../../../data/countryData";
import {
	addUserApi,
	fetchClientInfo,
	fetchClientList,
	fetchClientRevenue,
	fetchProtocols,
} from "../../../api/dectecApi";
import FormImage from "../../../components/common/FormImage";
import { notify } from "../../../utils/toastify";
import { generatePassword } from "../../../utils/generatePassword";

const bgGray = {
	backgroundColor: "rgba(0,0,0,0.3)",
};

export const AddUser = (props) => {
	const history = useNavigate();
	const [userValues, setUserValues] = useState({
		photo: defaultLogo,
		name: "",
		email: "",
		address: "",
		city: "",
		state: "",
		country: "",
		zipcode: "",
		clientId: "",
		protocolId: "",
		userRole: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [protocolList, setProtocolList] = useState([]);
	const [clientList, setClientList] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchProtocols()
			.then((res) => {
				if (res.success) {
					setProtocolList(res?.data);
				} else {
					setError(res.message);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
		setLoading(true);

		// fetchClientList()
		//   .then((res) => {
		//     if (res.success) {
		//       setClientList(res?.data);
		//     } else {
		//       notify(res?.message);
		//     }
		//   })
		//   .catch((error) => {
		//     console.log(error);
		//   });
	}, []);

	useEffect(() => {
		if (userValues.protocolId) {
			fetchClientRevenue(userValues.protocolId)
				.then((res) => {
					if (res.success) {
						setClientList(res?.data?.ClientRevenueDetail);
					} else {
						notify(res?.message);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userValues.protocolId]);

	const handleChange = (e) => {
		setUserValues({ ...userValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		addUserApi({
			...userValues,
			country: countries[userValues?.country]?.country ?? "",
			state: countries[userValues?.country]?.states[userValues?.state] ?? "",
		})
			.then((res) => {
				if (res.success) {
					history("/users");
					notify(res.message, true);
				} else {
					setError(res.message);
					notify(res.message, false);
				}
			})
			.catch((error) => {
				notify(error.message, false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Add User" isLink={false} />
					<Col>
						<Card>
							<CardBody>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col lg={8}>
											<Row>
												<Col lg={6}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															Name <span className="text-primary">*</span>
														</Label>
														<Input
															type="text"
															onKeyPress={(e) =>
																!/^[a-zA-Z0-9@\-_\$\#\.\s]+$/.test(e.key) &&
																e.preventDefault()
															}
															pattern="^[a-zA-Z0-9@-_$#.\s]+$"
															required
															name="name"
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter Name"
															value={userValues.name}
															onChange={handleChange}
															maxLength={100}
														/>
													</div>
												</Col>

												<Col lg={6}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6"
														>
															Email <span className="text-primary">*</span>
														</Label>
														<Input
															onChange={handleChange}
															required
															type="email"
															name="email"
															className="form-control bg-light"
															pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
															placeholder="Enter Email Eg. example@mail.com"
															id="nameInput"
															value={userValues.email}
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
															Country
														</Label>
														<select
															type="select"
															id="nameInput"
															name="country"
															className="bg-light form-control cursor-pointer"
															defaultValue={userValues.country}
															onChange={handleChange}
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
															State
														</Label>

														<select
															type="select"
															name="state"
															id="nameInput"
															className="bg-light form-control cursor-pointer"
															defaultValue={userValues.state}
															onChange={handleChange}
														>
															<option value="" disabled hidden>
																{userValues.country
																	? "Select State"
																	: "Choose Country First"}
															</option>
															{countries[userValues.country]?.states.map(
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
															City
														</Label>
														<Input
															type="text"
															name="city"
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter City"
															value={userValues.city}
															onChange={handleChange}
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
															Address
														</Label>
														<Input
															type="textarea"
															name="address"
															rows={2}
															className="form-control bg-light"
															id="lastnameInput"
															placeholder="Enter Address"
															maxLength={1000}
															onChange={handleChange}
															value={userValues.address}
														/>
													</div>
												</Col>

												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="firstnameInput"
															className="form-label fs-6 "
														>
															Zip Code
														</Label>
														<Input
															type="number"
															name="zipcode"
															className="form-control bg-light"
															id="nameInput"
															placeholder="Enter Zip Code"
															onChange={handleChange}
															value={userValues.zipcode}
														/>
													</div>
												</Col>
											</Row>
											<Row lg={12} className="d-flex justify-content-between">
												<Col lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="phonenumberInput"
															className="form-label fs-6"
														>
															Select Protocol{" "}
															<span className="text-primary">*</span>
														</Label>
														<select
															defaultValue={userValues.protocolId}
															required
															name="protocolId"
															type="select"
															onChange={handleChange}
															className=" bg-light form-control cursor-pointer"
															aria-label="Protocols"
														>
															<option value="" disabled hidden>
																Select Protocol
															</option>
															{loading && !protocolList ? (
																<select>Loading...</select>
															) : (
																protocolList.map(
																	({ protocolName, protocolId }) => (
																		<option key={protocolId} value={protocolId}>
																			{protocolName}
																		</option>
																	)
																)
															)}
														</select>
													</div>
												</Col>

												<Col lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="phonenumberInput"
															className="form-label fs-6"
														>
															Select Client{" "}
														</Label>
														<select
															defaultValue={userValues.clientId}
															name="clientId"
															type="select"
															onChange={handleChange}
															className="bg-light form-control cursor-pointer"
															aria-label="Protocols"
														>
															<option value="" disabled hidden>
																{userValues.protocolId
																	? "Select Client"
																	: "Please Select a Protocol"}
															</option>
															{loading || !clientList ? (
																<select>Loading...</select>
															) : (
																clientList?.map(({ client, clientId }) => (
																	<option key={clientId} value={clientId}>
																		{client}
																	</option>
																))
															)}
														</select>
													</div>
												</Col>

												<Col lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="phonenumberInput"
															className="form-label fs-6"
														>
															Select Role{" "}
															<span className="text-primary">*</span>
														</Label>
														<select
															defaultValue=""
															required
															name="userRole"
															type="select"
															onChange={handleChange}
															className=" bg-light form-control cursor-pointer"
															aria-label="Users"
														>
															<option value="" disabled hidden>
																Select Role
															</option>
															<option value="protocol_admin">
																Protocol Admin
															</option>
															<option value="client_admin">Client Admin</option>
															<option value="end_user">End User</option>
														</select>
													</div>
												</Col>
											</Row>
										</Col>

										<Col
											lg={4}
											className="d-flex flex-column justify-content-between py-3"
										>
											<FormImage
												label="User Image"
												image={userValues.photo}
												onChange={(e) => {
													console.log(e.target.files[0]);
													if (e.target.files[0].size / 1024 > 1024) {
														notify("Please select image less than 1MB", false);
													} else if (
														!e.target.files[0].type.startsWith("image/")
													) {
														notify("Please select a valid image", false);
													} else {
														setUserValues({
															...userValues,
															photo: e.target.files[0],
														});
													}
												}}
											/>

											<div className="hstack gap-3 justify-content-center">
												<button
													className="btn btn-light py-1 px-3"
													disabled={loading}
													onClick={() => history("/users")}
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
