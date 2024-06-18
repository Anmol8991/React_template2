import React, { useCallback, useState, useEffect, useRef } from "react";
import { Grid, _ } from "gridjs-react";
import { html, h, Row } from "gridjs";
import { CSVLink } from "react-csv";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastify";

import { fetchTopRedemptionList } from "../../../api/protocolApi";
import { Pagination } from "@mui/material";
import Loader from "../../common/Loader";

import { handleStatusUpdate } from "../../../utils/apiHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";

const GridTable = () => {
	const history = useNavigate();
	const [rows, setRows] = useState([]);
	const [redemptions, setRedemptions] = useState([]);
	const [columns, setColumns] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [pageDetails, setPageDetails] = useState({
		pageNumber: 1,
		pageSize: 10,
	});
	const [loading, setLoading] = useState(false);
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
	useEffect(() => {
		setLoading(true);
		fetchTopRedemptionList(pageDetails.pageNumber, pageDetails.pageSize)
			.then((res) => {
				if (res.success) {
					let total = roundToNearestWholeNumber(
						res?.data.total_documents / pageDetails.pageSize
					);
					setRedemptions(res.data?.data ?? []);
					if (total === 0) total = 1;
					setTotalPages(total);
					const columnsData = [
						{
							name: html("<center>User</center>"),
							key: "user",
							id: "user",
							formatter: (user) =>
								_(
									<span className="d-flex align-items-center">
										<img
											className="avatar-xs rounded-circle me-2"
											src={user.userImage}
										/>
										<span>{user.userName}</span>
									</span>
								),
							sort: true,
						},

						{
							name: html("<center className='text-wrap' }>Points</center>"),
							key: "totalPoints",
							id: "totalPoints",
							formatter: (cell) =>
								_(<center className="text-info">{cell}</center>),
							sort: true,
						},
						{
							name: html("<center className='text-wrap'>Amount</center>"),
							key: "totalAmount",
							id: "totalAmount",
							formatter: (cell) => _(<center className="">${cell}</center>),
							sort: true,
						},
						{
							name: html("<center className='text-center'>Type</center>"),
							key: "type",
							id: "type",
							formatter: (cell) =>
								_(
									<center
										className={`badge badge-border ${
											cell === "Gift Card"
												? "text-success"
												: cell === "Event"
												? "text-warning"
												: "text-danger"
										}`}
									>
										<span>{cell}</span>
									</center>
								),
							sort: true,
						},
						{
							name: html("<center className='text-wrap'>Date</center>"),
							key: "transactionDate",
							id: "transactionDate",
							formatter: (cell) => _(<center>{cell}</center>),
							sort: true,
						},
						{
							name: html("<center className='text-wrap'>Trx Hash</center>"),
							key: "hash",
							id: "hash",
							formatter: (hash) => {
								return _(
									<center className="text-info cursor-pointer">
										<span
											onClick={() => {
												window.open(
													`https://mumbai.polygonscan.com/tx/${hash}`,
													"_blank"
												);
											}}
										>
											{hash.slice(0, 4)}...{hash.slice(-4)}
										</span>
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
					const rowsData = res?.data?.data.reduce((acc, curr) => {
						const value = columnsData.map((item) =>
							item?.key ? curr[item.key] : item.name
						);

						return [...acc, value];
					}, []);

					setColumns(columnsData);
					setRows(rowsData);
				} else {
					notify(res.message, false);
				}
			})
			.catch((err) => {
				notify(err.message, false);
			})
			.finally(() => setLoading(false));
	}, [pageDetails]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
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
							<UncontrolledDropdown className="">
								<DropdownToggle
									tag="a"
									className="btn btn-outline-gray btn-sm "
								>
									<i className="bx bx-upload mx-1"></i> Export
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-end">
									<li>
										<DropdownItem
											className="remove-item-btn"
											data-bs-toggle="modal"
										>
											<CSVLink
												{...{
													data: redemptions?.map((data) => ({
														...data,
														protocol: data.protocol.protocolName,
														client: data.client.clientName,
														user: data.user.userName,
														amount: `${data.amount.prefix}${data.amount.value}${data.amount.suffix}`,
														point: `${data.point.prefix}${data.point.value}${data.point.suffix}`,
													})),
													headers: redemptions.length
														? Object.keys(redemptions[0])
														: [],
													filename: "redemptions.csv",
												}}
											>
												CSV
											</CSVLink>
										</DropdownItem>
									</li>
								</DropdownMenu>
							</UncontrolledDropdown>
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
			)}
		</>
	);
};

export default GridTable;
