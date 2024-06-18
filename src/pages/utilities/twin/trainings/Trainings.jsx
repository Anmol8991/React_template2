import React, { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Col,
	Container,
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	FormGroup,
	Input,
	Button,
} from "reactstrap";
import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";
import { fetchUploadList } from "../../../../api/utilityApi";
import { notify } from "../../../../utils/toastify";
import Loader from "../../../../components/common/Loader";
import demoImage from "../../../../assets/images/users/avatar-10.jpg";

const Trainings = () => {
	const [searchValue, setSearchValue] = useState("");
	const [trainingData, setTrainingData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchUploadList(1, 10, "all")
			.then((res) => {
				if (res.success) {
					setTrainingData(res.data.data);
				} else {
					notify(res.message, false);
				}
			})
			.catch((e) => {
				console.log(e);
				notify(e.message, false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	const filteredData = trainingData.filter((item) =>
		item.authorName.toLowerCase().includes(searchValue.toLowerCase())
	);

	const [open, setOpen] = useState("");
	const toggle = (id) => {
		console.log(`togol togol togol`);
		console.log({ id });
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
			console.log({ id: id.authorName });
		}
	};

	useEffect(() => {
		console.log(`open open open`);
		if (open) {
			setSelectedFiles({
				authorName: open.authorName,
				_id: open._id,
				brainName: open.brainName,
				filesUploaded: [],
			});
		} else {
			setSelectedFiles({
				authorName: null,
				_id: null,
				brainName: null,
				filesUploaded: [],
			});
		}
	}, [open]);

	const [selectedFiles, setSelectedFiles] = useState({
		authorName: null,
		_id: null,
		brainName: null,
		filesUploaded: [],
	});
	console.log({ selectedFiles });

	const handleFileAdd = (file) => {
		setSelectedFiles((prevState) => ({
			...prevState,
			filesUploaded: [...prevState.filesUploaded, file],
		}));
	};

	const handleFileRemove = (file) => {
		setSelectedFiles((prevState) => ({
			...prevState,
			filesUploaded: prevState.filesUploaded.filter((f) => f !== file),
		}));
	};

	return (
		<div className="page-content">
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Col>
						<PageHeader
							pageHeading="User Trainings [Admin Only]"
							isLink={false}
							searchBar
							searchValue={searchValue}
							searchOnChange={handleSearch}
						/>
						<Card>
							<CardBody>
								<Accordion open={open} toggle={toggle}>
									{filteredData?.map((item) => {
										return (
											<AccordionItem>
												<AccordionHeader className="m-0" targetId={item}>
													<div className="border-2 d-flex justify-content-between w-100 border-red-600 w-full">
														<div className="d-flex gap-2 align-items-center">
															<img
																className="rounded-circle header-profile-user"
																src={
																	item.authorProfile
																		? item.authorProfile
																		: demoImage
																}
																alt="NavHeader Avatar"
															/>
															<div
																style={{
																	fontWeight: "bold",
																}}
															>
																{item.authorName}
															</div>
														</div>
													</div>
												</AccordionHeader>
												<AccordionBody accordionId={item} className="m-0">
													<div className="d-flex w-100 bg-light border-0 rounded-xl  p-3 justify-content-between align-items-center mb-2">
														<div className="d-flex gap-1   align-items-center">
															<div
																className="text-dark"
																style={{
																	fontWeight: "500",
																}}
															>
																Selected :{" "}
															</div>
															<div
																style={{
																	fontWeight: "bolder",
																}}
																className="text-dark"
															>
																{selectedFiles.filesUploaded.length}
															</div>
														</div>

														<Link
															to={"/all-trainings/" + item._id}
															state={{
																data: {
																	item:
																		selectedFiles.filesUploaded.length > 0
																			? selectedFiles
																			: item,
																},
															}}
															className="btn btn-info"
														>
															Ask your Twin
														</Link>
													</div>

													<div className=" d-flex flex-column gap-2">
														{item.filesUploaded?.map((file) => {
															const fileIsChecked = (e) => {
																console.log({ e: e.target.checked });
																const { checked } = e.target;
																if (checked) {
																	handleFileAdd(file);
																} else {
																	handleFileRemove(file);
																}
															};

															const getFileExtension = (filename) => {
																const lastDotIndex = filename.lastIndexOf(".");
																if (lastDotIndex === -1) {
																	return null; // No file extension found
																}
																return filename.substr(lastDotIndex + 1);
															};

															const fileExtension = getFileExtension(
																file.fileName
															);
															const { fileType, color } = (() => {
																switch (fileExtension) {
																	case "pdf":
																		return {
																			fileType: "file-pdf",
																			color: "warning",
																		};

																	case "docx":
																		return {
																			fileType: "file-doc",
																			color: "success",
																		};

																	case "doc":
																		return {
																			fileType: "file-doc",
																			color: "success",
																		};

																	case "txt":
																		return {
																			fileType: "file-txt",
																			color: "info",
																		};

																	case "csv":
																		return {
																			fileType: "file",
																			color: "danger",
																		};

																	default:
																		return {
																			fileType: "file",
																			color: "warning",
																		};
																}
															})();

															return (
																<div className="d-flex w-full justify-content-between align-items-center border p-2 rounded">
																	<div className="d-flex gap-3 align-items-center">
																		<Input
																			type="checkbox"
																			checked={selectedFiles.filesUploaded.includes(
																				file
																			)}
																			className={`form-check-input ${
																				selectedFiles.filesUploaded.includes(
																					file
																				)
																					? "text-success border border-success rounded-circle"
																					: "border border-2 border-dark rounded-circle"
																			}`}
																			onChange={fileIsChecked}
																		/>
																		<div className="d-flex w-full gap-3 align-items-center rounded">
																			<span
																				className={`p-2 bg-soft-${color} rounded-circle d-flex justify-content-center align-items-center`}
																			>
																				<i
																					class={`bx bxs-${fileType} fs-2 text-${color}`}
																				></i>
																			</span>

																			<div className="pt-3">
																				<h6
																					className="text-dark"
																					style={{
																						fontWeight: "bold",
																					}}
																				>
																					{file.fileName}
																				</h6>
																			</div>
																		</div>
																	</div>
																	<Link
																		to={"/trainings/" + file.fileId}
																		state={{
																			data: {
																				...file,
																				brainName: item.brainName,
																			},
																		}}
																		className="btn  btn-soft-info"
																	>
																		View Content
																	</Link>
																</div>
															);
														})}
													</div>
												</AccordionBody>
											</AccordionItem>
										);
									})}
								</Accordion>
							</CardBody>
						</Card>
					</Col>
				</Container>
			)}
		</div>
	);
};

export default Trainings;
