import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "reactstrap";

import { PageHeader } from "@/components/common/PageHeader";

import { addProtocolApi } from "../../../api/dectecApi";
import defaultImage from "@/assets/images/defaultImage.png";
import FormImage from "../../../components/common/FormImage";
import ErrorBox from "../../../components/common/ErrorBox";
import { notify } from "../../../utils/toastify";
import DatePicker from "react-datepicker";
import {
  addActivityApi,
  fetchClientListByProtocolId,
} from "../../../api/protocolApi.js";

export const AddActivity = () => {
  const history = useNavigate();
  const activitiesList = [
    {
      name: "Attend an Event",
      type: "multi",
      description:
        "Engage in gatherings for knowledge, networking, and opportunities",
      id: "6475a2705351db307b68e841",
    },
    {
      name: "Upload a Document",
      type: "multi",
      description: "Upload AI code documents/files",
      id: "6475a2e45351db307b68e843",
    },
  ];
  const [activities, setActivities] = useState({
    name: "",
    categoryId: "",
    description: "",
    point: "",
    clientId: "",
    logo: null,
    limit: "",
  });
  const [currentActivityType, setCurrentActivityType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

	const handleChange = (e) => {
		console.log(e);
		setActivities(() => ({ ...activities, [e.target.name]: e.target.value }));
	};

  const handleDateChange = (name, date) => {
    setActivities({ ...activities, [name]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ activities });
    setLoading(true);
    addActivityApi({
      ...activities,
    })
      .then((res) => {
        if (res.success) {
          history("/activities");
          notify(res.message, true);
        } else {
          console.log(res.message, res);
          setError(res.message);
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

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    fetchClientListByProtocolId(
      JSON.parse(localStorage.getItem("user_data")).protocolId
    )
      .then((res) => {
        console.log({ res });
        if (res.success) {
          setClientList(res?.data);
        } else {
          notify(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

	const ActivityCard = () => {
		const index = 0;
		return (
			<div className="col-md-12">
				<Card>
					<CardBody>
						<Row>
							<Row>
								<Col lg={8}>
									<Row>
										<Col lg={6} className="mb-2">
											<Label
												htmlFor="activityType"
												className="form-label fs-6 "
											>
												Select Activity Type{" "}
												<span className="text-primary">*</span>
											</Label>

											<select
												type="select"
												required
												name="categoryId"
												key="categoryId"
												id="activityType"
												className=" bg-light form-control cursor-pointer"
												value={activities.categoryId}
												onChange={handleChange}
											>
												<option value="" disabled hidden>
													Select Activity Type
												</option>
												{activitiesList?.map(({ name, id }) => (
													<option id={name} value={id}>
														{name}
													</option>
												))}
											</select>
										</Col>
										<Col lg={6} className="mb-2">
											<Label htmlFor="activityName" className="form-label fs-6">
												Activity Name <span className="text-primary">*</span>
											</Label>
											<Input
												key="name"
												required
												type="text"
												name="name"
												value={activities.name}
												onChange={handleChange}
												id="activityName"
												className="form-control  bg-light"
												placeholder="Enter Activity Name"
												maxLength={100}
												minLength={3}
											/>
										</Col>
									</Row>
									<Row>
										<Col md={4} lg={4} className="mb-2">
											<Label
												htmlFor="activityPoints"
												className="form-label fs-6"
											>
												Points <span className="text-primary">*</span>
											</Label>
											<Input
												required
												type="number"
												name="point"
												key="point"
												id="activityPoints"
												className="form-control  bg-light"
												placeholder="Enter Points"
												value={activities.point}
												onChange={handleChange}
											/>
										</Col>

										<Col md={4} lg={4} className="mb-2">
											<Label
												htmlFor="activityLimit"
												className="form-label fs-6"
											>
												Activity Frequency Limit{" "}
												<span className="text-primary">*</span>
											</Label>
											<Input
												required
												type="number"
												name="limit"
												key="limit"
												id="activityLimit"
												className="form-control  bg-light"
												placeholder="Enter Limit"
												onChange={handleChange}
												value={activities.limit}
											/>
										</Col>
										<Col md={4} lg={4}>
											<div className="mb-2">
												<Label
													htmlFor="phonenumberInput"
													className="form-label fs-6"
												>
													Select Client <span className="text-primary">*</span>
												</Label>
												<select
													value={activities.clientId ? activities.clientId : ""}
													name="clientId"
													key="clientId"
													type="select"
													required
													onChange={handleChange}
													className="bg-light form-control cursor-pointer"
													aria-label="Protocols"
												>
													<option value="" disabled hidden>
														Select Client
													</option>
													{!clientList ? (
														<select>Loading...</select>
													) : (
														clientList?.map(({ _id, name }) => (
															<option key={_id} value={_id}>
																{name}
															</option>
														))
													)}
												</select>
											</div>
										</Col>
									</Row>

									{activities?.categoryId &&
										activitiesList[0].id === activities?.categoryId && (
											<Row>
												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="eventStartDateTime"
															className="form-label fs-6"
														>
															Event Start Date{" "}
															<span className="text-primary">*</span>
														</Label>
														<DatePicker
															name="eventStartDateTime"
															key="eventStartDateTime"
															id="eventStartDateTime"
															required={
																activities?.categoryId
																	? activitiesList[0].id ===
																	  activities?.categoryId
																		? true
																		: false
																	: false
															}
															dateFormat="DD/MM/YYYY"
															className="form-control  bg-light"
															value={
																activities.eventStartDateTime
																	? activities.eventStartDateTime
																	: new Date()
															}
															onChange={(date) => {
																console.log({ date });
																handleDateChange(
																	"eventStartDateTime",
																	date.toLocaleDateString()
																);
															}}
															placeholder="MM/DD/YYYY"
														/>
													</div>
												</Col>
												<Col md={4} lg={4}>
													<div className="mb-2">
														<Label
															htmlFor="eventEndDateTime"
															className="form-label fs-6"
														>
															Event End Date{" "}
															<span className="text-primary">*</span>
														</Label>
														<DatePicker
															name="eventEndDateTime"
															key="eventEndDateTime"
															required={
																activities?.categoryId
																	? activitiesList[0].id ===
																	  activities?.categoryId
																		? true
																		: false
																	: false
															}
															id="eventEndDateTime"
															className="form-control  bg-light"
															value={
																activities.eventEndDateTime
																	? activities.eventEndDateTime
																	: null
															}
															dateFormat="MM/DD/YYYY"
															onChange={(date) => {
																handleDateChange(
																	"eventEndDateTime",
																	date.toLocaleDateString()
																);
															}}
															placeholder="MM/DD/YYYY"
														/>
													</div>
												</Col>
												<Col md={4} lg={4} className="mb-2">
													<Label
														htmlFor="activityLocation"
														className="form-label fs-6"
													>
														Event Location{" "}
														<span className="text-primary">*</span>
													</Label>
													<Input
														required={
															activities?.categoryId
																? activitiesList[0].id ===
																  activities?.categoryId
																	? true
																	: false
																: false
														}
														type="text"
														name="location"
														key="location"
														value={activities.location}
														onChange={handleChange}
														id="activityLocation"
														className="form-control  bg-light"
														placeholder="Event Location"
														maxLength={100}
														minLength={3}
													/>
												</Col>
											</Row>
										)}
									<div className="mb-2">
										<Label
											htmlFor="activityDescription"
											className="form-label fs-6"
										>
											Activity Description{" "}
											<span className="text-primary">*</span>
										</Label>
										<Input
											type="textarea"
											rows={3}
											onChange={handleChange}
											required
											className="form-control pt-3 bg-light"
											placeholder="Enter Activity Description"
											name="description"
											key="description"
											id="activityDescription"
											value={activities.description}
											maxLength={500}
											minLength={20}
										/>
									</div>
								</Col>

								<Col
									lg={4}
									className="d-flex flex-column justify-content-between py-4"
								>
									<FormImage
										label="Activity Image"
										image={activities.logo}
										onChange={(e) => {
											if (e.target.files[0].size / 1024 > 1024) {
												notify("Please select image less than 1MB", false);
											} else if (!e.target.files[0].type.startsWith("image/")) {
												notify("Please select a valid image", false);
											} else {
												setActivities({
													...activities,
													logo: e.target.files[0],
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
						</Row>
					</CardBody>
				</Card>
			</div>
		);
	};
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader pageHeading="Add Activity" isLink={false} />
					<Form onSubmit={handleSubmit}>
						<div className="col-md-12">
							<Card>
								<CardBody>
									<Row>
										<Row>
											<Col lg={8}>
												<Row>
													<Col lg={6} className="mb-2">
														<Label
															htmlFor="activityType"
															className="form-label fs-6 "
														>
															Select Activity Type{" "}
															<span className="text-primary">*</span>
														</Label>

														<select
															type="select"
															required
															name="categoryId"
															key="categoryId"
															id="activityType"
															className=" bg-light form-control cursor-pointer"
															value={activities.categoryId}
															onChange={handleChange}
														>
															<option value="" disabled hidden>
																Select Activity Type
															</option>
															{activitiesList?.map(({ name, id }) => (
																<option id={name} value={id}>
																	{name}
																</option>
															))}
														</select>
													</Col>
													<Col lg={6} className="mb-2">
														<Label
															htmlFor="activityName"
															className="form-label fs-6"
														>
															Activity Name{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															key="name"
															required
															type="text"
															name="name"
															value={activities.name}
															onChange={handleChange}
															id="activityName"
															className="form-control  bg-light"
															placeholder="Enter Activity Name"
															maxLength={100}
															minLength={3}
														/>
													</Col>
												</Row>
												<Row>
													<Col md={4} lg={4} className="mb-2">
														<Label
															htmlFor="activityPoints"
															className="form-label fs-6"
														>
															Points <span className="text-primary">*</span>
														</Label>
														<Input
															required
															type="number"
															name="point"
															key="point"
															id="activityPoints"
															className="form-control  bg-light"
															placeholder="Enter Points"
															value={activities.point}
															onChange={handleChange}
														/>
													</Col>

													<Col md={4} lg={4} className="mb-2">
														<Label
															htmlFor="activityLimit"
															className="form-label fs-6"
														>
															Activity Frequency Limit{" "}
															<span className="text-primary">*</span>
														</Label>
														<Input
															required
															type="number"
															name="limit"
															key="limit"
															id="activityLimit"
															className="form-control  bg-light"
															placeholder="Enter Limit"
															onChange={handleChange}
															value={activities.limit}
														/>
													</Col>
													<Col md={4} lg={4}>
														<div className="mb-2">
															<Label
																htmlFor="phonenumberInput"
																className="form-label fs-6"
															>
																Select Client{" "}
																<span className="text-primary">*</span>
															</Label>
															<select
																value={
																	activities.clientId ? activities.clientId : ""
																}
																name="clientId"
																key="clientId"
																type="select"
																required
																onChange={handleChange}
																className="bg-light form-control cursor-pointer"
																aria-label="Protocols"
															>
																<option value="" disabled hidden>
																	Select Client
																</option>
																{!clientList ? (
																	<select>Loading...</select>
																) : (
																	clientList?.map(({ _id, name }) => (
																		<option key={_id} value={_id}>
																			{name}
																		</option>
																	))
																)}
															</select>
														</div>
													</Col>
												</Row>

												{activities?.categoryId &&
													activitiesList[0].id === activities?.categoryId && (
														<Row>
															<Col md={4} lg={4}>
																<div className="mb-2">
																	<Label
																		htmlFor="eventStartDateTime"
																		className="form-label fs-6"
																	>
																		Event Start Date{" "}
																		<span className="text-primary">*</span>
																	</Label>
																	<DatePicker
																		name="eventStartDateTime"
																		key="eventStartDateTime"
																		id="eventStartDateTime"
																		required={
																			activities?.categoryId
																				? activitiesList[0].id ===
																				  activities?.categoryId
																					? true
																					: false
																				: false
																		}
																		dateFormat="DD/MM/YYYY"
																		className="form-control  bg-light"
																		value={
																			activities.eventStartDateTime
																				? activities.eventStartDateTime
																				: new Date()
																		}
																		onChange={(date) => {
																			console.log({ date });
																			handleDateChange(
																				"eventStartDateTime",
																				date.toLocaleDateString()
																			);
																		}}
																		placeholder="MM/DD/YYYY"
																	/>
																</div>
															</Col>
															<Col md={4} lg={4}>
																<div className="mb-2">
																	<Label
																		htmlFor="eventEndDateTime"
																		className="form-label fs-6"
																	>
																		Event End Date{" "}
																		<span className="text-primary">*</span>
																	</Label>
																	<DatePicker
																		name="eventEndDateTime"
																		key="eventEndDateTime"
																		required={
																			activities?.categoryId
																				? activitiesList[0].id ===
																				  activities?.categoryId
																					? true
																					: false
																				: false
																		}
																		id="eventEndDateTime"
																		className="form-control  bg-light"
																		value={
																			activities.eventEndDateTime
																				? activities.eventEndDateTime
																				: null
																		}
																		dateFormat="MM/DD/YYYY"
																		onChange={(date) => {
																			handleDateChange(
																				"eventEndDateTime",
																				date.toLocaleDateString()
																			);
																		}}
																		placeholder="MM/DD/YYYY"
																	/>
																</div>
															</Col>
															<Col md={4} lg={4} className="mb-2">
																<Label
																	htmlFor="activityLocation"
																	className="form-label fs-6"
																>
																	Event Location{" "}
																	<span className="text-primary">*</span>
																</Label>
																<Input
																	required={
																		activities?.categoryId
																			? activitiesList[0].id ===
																			  activities?.categoryId
																				? true
																				: false
																			: false
																	}
																	type="text"
																	name="location"
																	key="location"
																	value={activities.location}
																	onChange={handleChange}
																	id="activityLocation"
																	className="form-control  bg-light"
																	placeholder="Event Location"
																	maxLength={100}
																	minLength={3}
																/>
															</Col>
														</Row>
													)}
												<div className="mb-2">
													<Label
														htmlFor="activityDescription"
														className="form-label fs-6"
													>
														Activity Description{" "}
														<span className="text-primary">*</span>
													</Label>
													<Input
														type="textarea"
														rows={3}
														onChange={handleChange}
														required
														className="form-control pt-3 bg-light"
														placeholder="Enter Activity Description"
														name="description"
														key="description"
														id="activityDescription"
														value={activities.description}
														maxLength={500}
														minLength={20}
													/>
												</div>
											</Col>

											<Col
												lg={4}
												className="d-flex flex-column justify-content-between py-4"
											>
												<FormImage
													label="Activity Image"
													image={activities.logo}
													onChange={(e) => {
														if (e.target.files[0].size / 1024 > 1024) {
															notify(
																"Please select image less than 1MB",
																false
															);
														} else if (
															!e.target.files[0].type.startsWith("image/")
														) {
															notify("Please select a valid image", false);
														} else {
															setActivities({
																...activities,
																logo: e.target.files[0],
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
									</Row>
								</CardBody>
							</Card>
						</div>
					</Form>
				</Container>
			</div>
			<Row></Row>
		</React.Fragment>
	);
};
