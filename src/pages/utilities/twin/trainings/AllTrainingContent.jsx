import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { PageHeader } from "@/components/common/PageHeader";
import { useLocation } from "react-router-dom";
import UserChatWindow from "../../../../components/utilities/chatBox/UserChatWindow.jsx";
import demoImage from "../../../../assets/images/users/avatar-10.jpg";

const AllTrainingContent = () => {
	const location = useLocation();
	const data = location.state?.data;
	console.log(data.item);

	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg={6}>
						<Card style={{ height: "600px" }}>
							<CardHeader className="bg-light">
								<div className="d-flex w-full  justify-content-between gap-3 align-items-center ">
									<div>
										<div className="d-flex gap-2">
											<img
												className="rounded-circle header-profile-user"
												src={
													data.item.authorProfile
														? data.item.authorProfile
														: demoImage
												}
												alt=""
											/>
											<h2>{data.item.authorName}</h2>
										</div>
										<p className="text-muted">
											Selected Documents : {data.item.filesUploaded.length}
										</p>
									</div>

									<span
										className="p-2 cursor-pointer bg-soft-info rounded-circle d-flex justify-content-center align-items-center"
										style={{ height: "2.5rem", width: "2.5rem" }}
									>
										<i class="bx bxs-share-alt fs-3 text-info"></i>
									</span>
								</div>
							</CardHeader>
							<CardBody>
								<div
									style={{
										overflowY: "scroll",
										overflowX: "hidden",
										position: "relative",
										height: "400px",
									}}
									className="relative"
								>
									<div className=" d-flex flex-column gap-2">
										{data.item.filesUploaded?.map((file) => {
											const getFileExtension = (filename) => {
												const lastDotIndex = filename.lastIndexOf(".");
												if (lastDotIndex === -1) {
													return null; // No file extension found
												}
												return filename.substr(lastDotIndex + 1);
											};

											const fileExtension = getFileExtension(file.fileName);
											const { fileType, color } = (() => {
												switch (fileExtension) {
													case "pdf":
														return { fileType: "file-pdf", color: "warning" };

													case "docx":
														return { fileType: "file-doc", color: "success" };

													case "doc":
														return { fileType: "file-doc", color: "success" };

													case "txt":
														return { fileType: "file-txt", color: "info" };

													case "csv":
														return {
															fileType: "file",
															color: "danger",
														};
													default:
														return { fileType: "file", color: "warning" };
												}
											})();

											return (
												<div className="d-flex w-full gap-3 align-items-center border p-2 rounded">
													<span
														className={`p-2 bg-soft-${color} rounded-circle d-flex justify-content-center align-items-center`}
													>
														<i
															class={`bx bxs-${fileType} fs-2 text-${color}`}
														></i>
													</span>

													<div className="pt-3">
														<h6
															style={{
																fontWeight: "bold",
															}}
														>
															{file.fileName}
														</h6>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col lg={6}>
						<UserChatWindow
							brainName={data?.item?.brainName}
							filesData={data?.item?.filesUploaded}
							height={"600px"}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AllTrainingContent;
