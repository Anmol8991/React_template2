import React, { useEffect, useState } from "react";
import { Grid, _ } from "gridjs-react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "@/utils/commonHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { html } from "gridjs";
import { notify } from "../../../utils/toastify";
import { fetchUploadList } from "../../../api/utilityApi";
import Loader from "../../common/Loader";
import { Pagination } from "@mui/material";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";

const scanLink = "https://mumbai.polygonscan.com/tx/";

export const DataUploadsTable = () => {
	document.title = "DataUploads | TwinProtocol ";
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [pageDetails, setPageDetails] = useState({
		pageNumber: 1,
		pageSize: 10,
	});

	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		fetchUploadList(pageDetails.pageNumber, pageDetails.pageSize, "user")
			.then(({ success, data: response, message }) => {
				if (success) {
					if (response[0]?.total_documents) {
						let total = roundToNearestWholeNumber(
							response[0]?.total_documents / pageDetails.pageSize
						);
						console.log("===========", total);
						if (total === 0) total = 1;
						setTotalPages(total);
					}
					const columnsData = [
						{
							name: html("<center>File Name</center>"),
							key: "fileInfo",
							id: "fileInfo",
							formatter: (cell) => {
								return _(
									<center
										onClick={() => navigate("/upload-detail/" + cell.fileId)}
										className="text-info cursor-pointer"
									>
										{cell.fileName}
									</center>
								);
							},
							sort: {
								compare: (a, b) => {
									const nameA = a.toUpperCase();
									const nameB = b.toUpperCase();

									if (nameA < nameB) {
										return -1;
									}
									if (nameA > nameB) {
										return 1;
									}
									return 0;
								},
							},
						},
						{
							name: html("<center className='text-wrap'>File Type</center>"),
							key: "fileType",
							id: "fileType",
							formatter: (cell) => _(<center>{cell.toUpperCase()}</center>),
						},
						{
							name: html(
								"<center className='text-wrap'>Points Earned</center>"
							),
							key: "earnedPoints",
							id: "earnedPoints",
							formatter: (cell) =>
								_(<center className="text-success">{cell}</center>),
							sort: {
								compare: (a, b) => {
									const valueA = a;
									const valueB = b;

									if (valueA < valueB) {
										return -1;
									}
									if (valueA > valueB) {
										return 1;
									}
									return 0;
								},
							},
						},
						{
							name: html(
								"<center className='text-wrap'>Uploaded Date</center>"
							),
							id: "uploadDate",
							key: "uploadDate",
							formatter: (cell) => _(<center>{cell ? cell : ""}</center>),
						},
						{
							name: html("<center className='text-wrap'>Trx Hash</center>"),
							key: "trxHashCode",
							id: "trxHashCode",
							formatter: (hash) => {
								return _(
									<center className="cursor-pointer">
										<a
											href={scanLink + hash}
											target="_blank"
											rel="noopener noreferrer"
											className="text-info"
										>
											{truncateString(hash)}
										</a>
										<span
											role="button"
											className="fa-layers text-gray fa-fw ms-1 p-0"
										>
											<FontAwesomeIcon
												icon={faCopy}
												onClick={() => handleCopyClick(hash)}
											/>
										</span>
									</center>
								);
							},
							sort: false,
						},
					];
					const rowsData = (response[0]?.data ?? response).reduce(
						(acc, curr) => {
							const value = columnsData.map((item) => {
								return item?.key ? curr[item.key] : item.name;
							});
							return [...acc, value];
						},
						[]
					);

					setColumns(columnsData);
					setRows(rowsData);
				} else {
					notify(message, false);
				}
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	}, [pageDetails]);

	const handlePageChange = (event, value) => {
		setPageDetails({ ...pageDetails, pageNumber: value });
	};

	const handleCopyClick = async (hash) => {
		try {
			await navigator.clipboard.writeText(hash);
			setTimeout(() => {
				notify("Copied to clipboard", true);
			}, 1000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
			notify("Failed to copy", false);
		}
	};
	return (
		<div className="page-content pt-4">
			<Container fluid>
				<Col className="mx-2">
					<Card>
						<CardHeader>
							<h4 className="card-title mb-0 flex-grow-1 fs-4">
								{" "}
								<i className="bx bx-history"></i> Data Uploads
								{/* <button
                type="button"
                className="btn btn-soft-info btn-sm float-end"
              >
                <i className="ri-file-list-3-line align-bottom"></i> Export
                Report
              </button> */}
							</h4>
						</CardHeader>
					</Card>
					{/* </Col> */}
				</Col>
				<Col className="m-2">
					<Card>
						<CardBody>
							{loading ? (
								<Loader />
							) : (
								<Grid
									columns={columns}
									search={{
										selector: (cell) => cell?.fileName || cell,
									}}
									pagination={false}
									sort={true}
									style={{
										table: {
											overflow: "scroll",
											whitespace: "nowrap",
											tableLayout: "auto",
											width: "maxContent",
										},
										th: {
											whiteSpace: "nowrap",
										},
									}}
									onError={(error) => {
										console.log(error, "check");
									}}
									data={rows}
								/>
							)}
							<Pagination
								count={totalPages}
								color="primary"
								shape="rounded"
								style={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "15px",
								}}
								className="text-dark"
								page={pageDetails.pageNumber}
								onChange={handlePageChange}
								siblingCount={0}
								boundaryCount={1}
							/>
						</CardBody>
					</Card>
				</Col>
			</Container>
		</div>
	);
};
