import React, { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Modal,
	ModalBody,
} from "reactstrap";
// import Flatpickr from "react-flatpickr";
import Dropzone, { useDropzone } from "react-dropzone";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Alert, Button, Card, CardBody, Col, Container, Input,  ModalHeader, PopoverBody, PopoverHeader, Row, UncontrolledPopover, UncontrolledTooltip } from 'reactstrap';
import { Link } from "react-router-dom";

import successLogo from "@/assets/images/demo/giphy.gif";

import {
	activitiesApi,
	uploadActivityApi,
	viewProfileInfo,
} from "@/api/dectecApi";
import { notify } from "@/utils/toastify";
import Loader from "@/components/common/Loader";
import Swal from "sweetalert2";
import image from "@/assets/images/demo/uploadImg.svg";
import ConfirmActivity from "../../../../components/common/ConfirmActivity";
import { earnPoints } from "../../../../api/utilityApi";

const UploadData = () => {
	const history = useNavigate();
	const { activityId } = useParams();

	const [activityData, setActivityData] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [fileUploaded, setfileUploaded] = useState("");

	const [userWallet, setWallet] = useState("");
	const [showConfirm, setShowConfirm] = useState(false);

	const [pageDetails, setPageDetails] = useState({
		pageNumber: 1,
		pageSize: 5,
		protocolId: "",
		clientId: "",
	});

	const [modal_successMessage, setmodal_successMessage] = useState(false);
	function tog_successMessage() {
		setmodal_successMessage(!modal_successMessage);
	}

	const [selectedFiles, setselectedFiles] = useState([]);

	function handleAcceptedFiles(files) {
		if (files[0].size > 10000000) {
			notify("Please select file less than 10MB", false);
		} else if (
			!files[0].type.startsWith("application/") &&
			!files[0].type.startsWith("text/")
		) {
			notify("Please select a valid file", false);
		} else {
			Object.assign(files[0], {
				preview: URL.createObjectURL(files[0]),
				formattedSize: formatBytes(files[0].size),
			});
			setselectedFiles(files);
			setfileUploaded(files[0]);
		}
	}

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: {
				"image/jpeg": [],
				"image/png": [],
			},
		});

	/**
	 * Formats the size
	 */
	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	}

	useEffect(() => {
		setLoading(true);
		activitiesApi(
			pageDetails.pageNumber,
			pageDetails.pageSize,
			pageDetails.protocolId,
			pageDetails.clientId,
			activityId
		)
			.then((res) => {
				if (res.success) {
					console.log(res.data[0], "jj");
					setActivityData(res?.data[0]);
				} else {
					setError(message);
					console.log(message);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		viewProfileInfo().then(({ success, message, data }) => {
			if (success) {
				const { walletId } = data[0];
				setWallet(walletId);
				setLoading(false);
			} else {
				setError(message);
				setLoading(false);
			}
		});
	}, []);

	const handleSubmit = (points) => {
		setLoading(true);
		earnPoints({
			activityId,
			file: fileUploaded,
		})
			.then((res) => {
				console.log(res);
				if (res.success) {
					setselectedFiles([]);
					setfileUploaded("");
					Swal.fire({
						html:
							"<img src=" +
							`${successLogo}` +
							' style="width:100px ;height:100px" />' +
							'<h3 style="color:#424345">Points Earned Successfully</h3>' +
							'<p className="text-muted fs-5 mb-4">You have earned <b>' +
							`${points}` +
							"</b> for uploading the file" +
							". Complete More challenges to earn more points" +
							"</p>",
						showCloseButton: true,
						showCancelButton: false,
						focusConfirm: false,
						confirmButtonText: "OK",
					}).then((result) => {
						if (result.isConfirmed) {
							history("/activities/activity-list");
						} else {
							setselectedFiles([]);
						}
					});
					setLoading(false);
				} else {
					console.log(res.message);
					setError(res.message);
					notify(res.message, true);
				}
			})
			.catch((error) => {
				console.log(error);
				setError(error.message);
				notify(error.message, true);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<Row className="">
						<Card id="invoiceList">
							{/* <CardHeader className="bg-light"> */}
							<Row className="bg-light pt-3 px-3 d-flex justify-content-between">
								<Col md={8}>
									<h3>{activityData?.activityName}</h3>
									<p className="text-muted">
										{activityData?.activityDescription}.
									</p>
								</Col>
								<Col
									md={4}
									className="d-flex flex-column justify-md-content-center align-items-end"
								>
									<p className="d-flex fs-4 text-info align-items-center gap-1 ">
										<i className="ri-coin-fill text-warning align-middle"></i>
										<span>{activityData?.activityPoints} Points</span>
									</p>
									<p
										className="py-2 bg-soft-info rounded-5 px-4 fs-6"
										style={{ fontWeight: "500" }}
									>
										Upload Training Data
									</p>
								</Col>
							</Row>
							{/* </CardHeader> */}
							<CardBody>
								<div className="" style={{ padding: "10px" }}>
									<Row className="px-2 align-items-center w-100">
										<Col md={6} className="h-100 d-flex justify-content-center">
											<img
												src={image}
												className="w-50 h-100"
												style={{ objectFit: "cover" }}
											/>
										</Col>
										<Col
											md={6}
											className="h-100 d-flex flex-column justify-content-between"
										>
											<div>
												<div className="d-flex flex-column gap-2 align-items-center">
													<div className="py-2 d-flex flex-column align-items-center gap-3 w-100">
														<div className="w-100">
															<h4>
																Upload File (PDF, DOCX,DOC, TXT, CSV, JSON,
																only)
															</h4>
															<div className="d-flex justify-content-between flex-column gap-3 w-100">
																{loading ? (
																	<Loader />
																) : (
																	<Dropzone
																		onDrop={(acceptedFiles) => {
																			handleAcceptedFiles(acceptedFiles);
																		}}
																		maxFiles={1}
																		accept={[
																			".doc",
																			".docx",
																			".pdf",
																			".txt",
																			".csv",
																			".json",
																			"application/msword",
																			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
																			"application/pdf",
																			"application/json",
																			"application/csv",
																			"text/plain",
																		]}
																		excludeAcceptAllOption={true}
																		multiple={false}
																	>
																		{({ getRootProps, getInputProps }) => (
																			<div className="dropzone dz-clickable">
																				<div
																					className="dz-message needsclick"
																					{...getRootProps()}
																				>
																					<div className="mb-3">
																						<i className="display-4 text-muted ri-upload-cloud-2-fill" />
																					</div>
																					<p className="fs-5 text-muted">
																						Drop file here or click to upload.
																					</p>
																				</div>
																			</div>
																		)}
																	</Dropzone>
																)}
															</div>
															<div
																className="list-unstyled mb-0"
																id="file-previews"
															>
																{selectedFiles?.map((f, i) => {
																	return (
																		<Card
																			className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
																			key={i + "-file"}
																		>
																			<div className="p-2">
																				<Row className="align-items-center">
																					<Col className="col-auto">
																						<p className="mb-0">
																							<b>File:</b> {f.name}
																						</p>
																					</Col>
																					<Col></Col>
																				</Row>
																			</div>
																		</Card>
																	);
																})}
															</div>
														</div>
													</div>
												</div>
												<ConfirmActivity
													show={showConfirm}
													setShow={setShowConfirm}
													confirm={handleSubmit}
													points={activityData?.activityPoints}
													activityName={activityData?.activityName}
													activityId={activityId}
													file={fileUploaded}
													setfileUploaded={setfileUploaded}
													setselectedFiles={setselectedFiles}
												/>
												<div className="d-flex gap-3 justify-content-end">
													<Link to={"/dashboard"} className="btn btn-light ">
														Cancel
													</Link>
													<button
														disabled={loading || fileUploaded.length === 0}
														className="btn btn-primary"
														onClick={() => setShowConfirm(true)}
													>
														{loading ? "Uploading..." : "Upload"}
													</button>
												</div>
											</div>
										</Col>
									</Row>
								</div>
							</CardBody>
						</Card>
						{/* <ActivityHistoryTable/>  */}
						<Modal
							id="success-Payment"
							tabIndex="-1"
							isOpen={modal_successMessage}
							toggle={() => {
								tog_successMessage();
							}}
							centered
						>
							<ModalBody className="text-center p-5">
								<div className="text-end">
									<button
										type="button"
										onClick={() => {
											tog_successMessage();
										}}
										className="btn-close text-end"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="mt-2">
									<img
										src={successLogo}
										style={{ width: "150px", height: "150px" }}
									/>
									<h4 className="mb-3 mt-2 text-dark">
										Points Earned Successfully
									</h4>
									<p className="text-muted fs-15 mb-4">
										You have earned {activityData?.activityPoints} points for
										your activity. Complete More challenges to earn more points
									</p>
									<div className="hstack gap-2 justify-content-center">
										<button
											className="btn btn-primary"
											onClick={() => history("/dashboard")}
										>
											Go To dashboard
										</button>
										<p className="text-align-middle m-2">Redirecting in....</p>
										{/* <button className="btn btn-soft-success" ><i className="ri-links-line align-bottom"></i> Go to dashboard</button> */}
									</div>
								</div>
							</ModalBody>
						</Modal>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};
export default UploadData;
