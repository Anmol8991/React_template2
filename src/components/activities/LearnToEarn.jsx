import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

import Loader from "@/components/common/Loader";

import LearnToEarnModal from "@/components/common/LearnToEarnModal";
import { truncateDescription } from "../../utils/commonHelper";

const LearnToEarn = ({ data }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [selectedTrainingData, setSelectedTrainingData] = useState([]);
	const [selectedActivityId, setSelectedActivityId] = useState("");

	const opts = {
		height: "100",
		width: "150",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0, //1
		},
	};

	function _onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}

	function youtube_parser(url) {
		if (url == null) return "";

		let regex =
			/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
		return regex.exec(url)[3];
	}

	const [modal_large, setmodal_large] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const tog_large = (item) => {
		const data = {
			vid: item?.fileInfo?.fileUrl,
			// vid:"https://en.wikipedia.org/wiki/Machine_learning",
			title: item?.activityName,
			points: item?.activityPoints,
		};
		setSelectedTrainingData(data);
		setSelectedActivityId(item.activityId);
		setShowModal(!showModal);
	};

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredData = data?.filter(
		(item) =>
			item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.activityDescription.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (loading) {
		return <Loader />;
	}

	return (
		<React.Fragment>
			<Card>
				<CardBody>
					<Row className="d-flex justify-content-end py-3 w-100 align-items-center gap-2 gap-lg-0">
						<Col lg={12} className="d-flex justify-content-lg-end">
							<div className="search-box">
								<Input
									type="text"
									className="form-control"
									placeholder="Search..."
									onChange={handleSearch}
									value={searchQuery}
								/>
								<i className="ri-search-line search-icon"></i>
							</div>
						</Col>
					</Row>
					{showModal && (
						<LearnToEarnModal
							showModal={showModal}
							setShowModal={setShowModal}
							modalData={selectedTrainingData}
							activityId={selectedActivityId}
						/>
					)}

					<Row>
						{(filteredData || []).map((item, key) => (
							<Col xxl={3} sm={4} key={key}>
								<Card>
									<CardBody className="p-4 bg-light shadow-lg">
										<div className="d-flex">
											<div className="flex-grow-1 text-muted overflow-hidden">
												<h5 className="fs-14 text-truncate">
													<Link to="/register-event" className="text-dark">
														{item.activityName}
													</Link>
												</h5>
												<p
													style={{
														display: "-webkit-box",
														WebkitBoxOrient: "vertical",
														WebkitLineClamp: 2,
														overflow: "hidden",
														textOverflow: "ellipsis",
														height: "38px",
													}}
												>
													{truncateDescription(item.activityDescription)}
												</p>
											</div>
										</div>

										<div className="d-flex mt-4">
											<div className="flex-grow-1">
												<div className="d-flex align-items-center gap-2 justify-content-between">
													<Button
														className="btn-info"
														// onClick={() => tog_large(item)}
														onClick={() =>
															navigate("/learning-content/" + item.activityId)
														}
													>
														View Content
													</Button>

													<div>
														<i className="ri-coin-fill align-bottom me-1 text-warning"></i>
														{item.activityPoints}
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
						))}
					</Row>
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default LearnToEarn;
