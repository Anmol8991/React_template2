import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import YouTube from "react-youtube";

import { getActivityInfo } from "../../../../api/utilityApi";
import ConfirmActivity from "../../../../components/common/ConfirmActivity";
import Loader from "../../../../components/common/Loader";
import ChatWindow from "../../../../components/utilities/chatBox/ChatWindow";

const LearningContent = () => {
	const { activityId } = useParams();
	const [loading, setLoading] = useState(false);
	const [activityData, setActivityData] = useState([]);
	useEffect(() => {
		setLoading(true);
		getActivityInfo(activityId)
			.then((res) => {
				if (res.success) {
					console.log(res);
					setActivityData(res?.data[0]);
				} else {
					notify(res.message, false);
				}
			})
			.catch((e) => notify(e.message))
			.finally(() => setLoading(false));
	}, []);

	const [checked, setChecked] = useState(false);
	const [disableStatus, setDisableStatus] = useState(true);
	const [submitStatus, setSubmitStatus] = useState(true);
	const [showConfirm, setShowConfirm] = useState(false);

	const iframeRef = useRef(null);
	//detect click on iframe
	useEffect(() => {
		let interval = window.setInterval(trackClick, 100);
		let i = 0;
		function trackClick() {
			if (document.activeElement === iframeRef.current) {
				i++;
				setDisableStatus(false);
				window.focus();
			}
		}

		return () => {
			clearInterval(interval);
		};
	}, []);

	const handleAnchorClick = (event) => {
		setDisableStatus(false);
	};
	const handleCheck = (event) => {
		setChecked(!checked);
		if (event.target.checked) {
			setSubmitStatus(false);
		}
	};
	function tog_successMessage() {
		setShowModal(!showModal);
	}

	const opts = {
		// height: '540',
		// width: '720',
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

	return (
		<div className="page-content">
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Row>
						<Col>
							<Card>
								<CardHeader className="bg-light">
									<Row className="px-3 d-flex justify-content-between">
										<Col md={8}>
											<h2>{activityData?.activityName}</h2>
											<p className="text-muted">
												{activityData?.activityDescription}
												<br />
												<b>Updated Date: {activityData?.fileInfo?.date}</b>
											</p>
										</Col>
										<Col
											md={4}
											className="d-flex flex-column justify-content-center align-items-end"
										>
											<p className="d-flex fs-4 text-info align-items-center gap-1 ">
												<i className="ri-coin-fill text-warning align-middle"></i>
												<span>{activityData?.activityPoints}</span>
											</p>
											<p
												className="py-2 bg-soft-info rounded-5 px-4 fs-6"
												style={{ fontWeight: "500" }}
											>
												Learning
											</p>
										</Col>
									</Row>
								</CardHeader>
								<CardBody style={{ overflowY: "hidden" }}>
									<div className="flex-grow-1 text-muted overflow-hidden justify-content-between align-items-center d-flex-flex-wrap">
										{activityData?.media === "youtube" ? (
											<div className="d-flex justify-content-center align-items-center">
												<YouTube
													videoId={youtube_parser(activityData?.fileInfo?.url)}
													//   videoId={youtube_parser(
													//     "https://www.youtube.com/watch?v=aSlK3GhRuXA"
													//   )}
													opts={opts}
													onReady={_onReady}
													onPlay={handleAnchorClick}
													className="rounded"
												/>
											</div>
										) : (
											<iframe
												ref={iframeRef}
												src={activityData?.fileInfo?.url}
												className="rounded"
												style={{
													display: "block",
													position: "relative",
													height: "100vh",
													width: "100%",
												}}
												onClick={handleAnchorClick}
											></iframe>
										)}
									</div>
								</CardBody>
								<ConfirmActivity
									show={showConfirm}
									setShow={setShowConfirm}
									activityId={activityId}
									points={activityData?.activityPoints}
								/>
								<CardFooter className="d-flex align-items-center justify-content-between">
									<div className="text-muted p-2  d-flex aling-items-center">
										<Input
											type="checkbox"
											checked={checked}
											disabled={disableStatus}
											onClick={handleCheck}
											className="me-1 border-primary"
											id="confirmContent"
										/>{" "}
										<label
											htmlFor="confirmContent"
											className="text-dark cursor-pointer"
										>
											I have viewed the content{" "}
										</label>
										<span class="text-uppercase"></span>
									</div>
									<div className="d-flex gap-2">
										<Link
											to="#"
											className="btn btn-light  fw-medium"
											onClick={tog_successMessage}
										>
											Cancel
										</Link>
										<button
											className="btn btn-primary"
											disabled={submitStatus}
											onClick={() => {
												setShowConfirm(true);
												handleCheck(false);
											}}
										>
											Submit
										</button>
									</div>
								</CardFooter>
							</Card>
						</Col>
						{/* <Col lg={6}>
            <ChatWindow/>
            </Col> */}
					</Row>
				</Container>
			)}
		</div>
	);
};

export default LearningContent;
