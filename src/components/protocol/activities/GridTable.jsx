import React, { useCallback, useState, useEffect, useRef } from "react";
import { Grid, _ } from "gridjs-react";
import { html, h, Row } from "gridjs";
import { CSVLink } from "react-csv";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
	Button,
	Card,
	CardBody,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	Modal,
	ModalBody,
	UncontrolledDropdown,
} from "reactstrap";

import TableFilters from "./TableFilters";
import { useNavigate } from "react-router-dom";
import { usersListApi } from "../../../api/dectecApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dialog, DialogActions, DialogTitle, Pagination } from "@mui/material";
import Loader from "../../common/Loader";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";
import { handleStatusUpdate } from "../../../utils/apiHelper";
import { activitiesData, userData, date } from "@/data/dashboardData";
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";
import { fetchActivityInfo } from "../../../api/protocolApi.js";

const typeColors = {
	"6475a0831200b9733fe76993": "text-info",
	"6475a2e45351db307b68e843": "text-success",
	"6475a2705351db307b68e841": "text-warning",
	"64885fc87dba91b657b076c2": "text-danger",
};
export const GridTable = () => {
	const history = useNavigate();
	//   const [pointsRewardedInfo, setPointsRewardedInfo] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const [pageDetails, setPageDetails] = useState({
		pageNumber: 1,
		pageSize: 10,
	});
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const [protocol, setProtocol] = useState("");
	const [client, setClient] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		getActivitiesList();
	}, [pageDetails, client]);

	const getActivitiesList = () => {
		setLoading(true);
		fetchActivityInfo(pageDetails.pageNumber, pageDetails.pageSize, client)
			.then(({ success, data: response, message }) => {
				console.log({ response });
				if (success) {
					if (response?.total_documents) {
						let total = roundToNearestWholeNumber(
							response.total_documents / pageDetails.pageSize
						);
						if (total === 0) total = 1;
						setTotalPages(total);
					}
					const columnsData = [
						{
							name: html("<center>Client Info</center>"),
							key: "clientInfo",
							id: "clientInfo",
							formatter: (clientInfo) =>
								_(
									<span className="d-flex align-items-center">
										<img
											className="avatar-xs rounded-circle mx-4"
											src={clientInfo.clientLogo}
										/>
										{clientInfo.clientName}
									</span>
								),
						},
						{
							name: html("<center>Activity Info</center>"),
							key: "activityInfo",
							id: "activityInfo",
							formatter: (activityInfo) =>
								_(
									<span className="d-flex align-items-center">
										<img
											className="avatar-xs rounded-circle mx-4"
											src={activityInfo.activityLogo}
										/>
										{activityInfo.activityName}
									</span>
								),
						},
						{
							name: html("<center>Activity Type</center>"),
							key: "categoryInfo",
							id: "categoryInfo",
							formatter: (categoryInfo) =>
								_(
									<center className="d-flex align-items-center ">
										<span
											className={`badge badge-border ${
												typeColors[categoryInfo.categoryId] ?? "text-white"
											}`}
										>
											{categoryInfo.categoryName}
										</span>
									</center>
								),
						},
						{
							name: html("<center>Points</center>"),
							key: "activityPoints",
							id: "activityPoints",
							formatter: (activityPoints) =>
								_(
									<center className="d-flex align-items-center justify-content-center">
										<span>{activityPoints}</span>
									</center>
								),
						},

						{
							name: html("<center>Limit</center>"),
							key: "limit",
							id: "limit",
							formatter: (name) =>
								_(
									<center className="d-flex align-items-center justify-content-center">
										<span>{name ? name : 0}</span>
									</center>
								),
						},

						{
							name: html("<center>Date</center>"),
							key: "activityDate",
							id: "activityDate",
							formatter: (activityDate) =>
								_(
									<center className="d-flex align-items-center justify-content-center">
										<span>{activityDate ? activityDate : "06/23/2023"}</span>
									</center>
								),
						},

						{
							name: html("<center className='text-wrap'>Action</center>"),
							id: "action",
							key: "action",
							sort: false,
							formatter: (clientInfo, entries) => {
								console.log({ entries });
								const clientId = entries?._cells[0].data.clientId;
								const clientName = entries?._cells[0].data.client;
								return _(
									<center>
										<UncontrolledDropdown>
											<DropdownToggle
												tag="a"
												className="btn btn-soft-secondary btn-sm"
											>
												<i className="ri-more-fill align-middle"></i>
											</DropdownToggle>
											<DropdownMenu className="dropdown-menu-end">
												<li>
													<DropdownItem>
														<i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
														View
													</DropdownItem>
												</li>
												<li>
													<DropdownItem
														className="edit-item-btn"
														data-bs-toggle="modal"
													>
														<i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
														Edit
													</DropdownItem>
												</li>
												<li>
													<DropdownItem
														className="remove-item-btn"
														data-bs-toggle="modal"
													>
														<i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
														Delete
													</DropdownItem>
												</li>
											</DropdownMenu>
										</UncontrolledDropdown>
									</center>
								);
							},
						},
					];
					const rowsData = (response?.data ?? response).reduce((acc, curr) => {
						const value = columnsData.map((item) => {
							return item?.key ? curr[item.key] : item.name;
						});
						return [...acc, value];
					}, []);

					setColumns(columnsData);
					setRows(rowsData);
				} else {
					setError(message);
				}
			})
			.catch((error) => {
				setError("Some Error Occurred");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handlePageChange = (event, value) => {
		setPageDetails({ ...pageDetails, pageNumber: value });
	};

	return (
		<>
			<div className="position-relative pt-3">
				<div className="table-filters end-0 d-flex" style={{ zIndex: 100 }}>
					<label className="d-flex align-items-center">
						Show
						<select
							name="example_length"
							aria-controls="example"
							className="form-select form-select-sm mx-2"
							value={pageDetails.pageSize}
							onChange={(e) =>
								setPageDetails({
									...pageDetails,
									pageSize: Number(e.target.value),
								})
							}
						>
							<option value="2">2</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="50">50</option>
						</select>
					</label>
					<div className="d-flex gap-2">
						{/* filters */}
						{/* <UncontrolledDropdown className="">
							<DropdownToggle
								className=" ms-1 btn btn-soft-success border btn-sm px-1"
								style={{ height: "fit-content", lineHeight: "1.2" }}
							>
								<i className="bx bx-dots-vertical-rounded fs-5 m-0"></i>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-end">
								<TableFilters
									protocol={protocol}
									setProtocol={setProtocol}
									client={client}
									setClient={setClient}
									date={date}
									setDate={date}
								/>
							</DropdownMenu>
						</UncontrolledDropdown> */}
					</div>
				</div>

				{loading ? (
					<Loader />
				) : (
					<Grid
						columns={columns}
						search={{
							selector: (cell) => cell?.name || cell?.value || cell,
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
			</div>
		</>
	);
};
