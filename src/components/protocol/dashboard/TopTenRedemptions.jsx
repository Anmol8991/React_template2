import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

import { html } from "gridjs";

import { notify } from "../../../utils/toastify";

import { Grid, _ } from "gridjs-react";
import { fetchTopRedemptionList } from "../../../api/protocolApi";

const TopTenRedemptions = () => {
	const history = useNavigate();
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([]);

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
		fetchTopRedemptionList()
			.then((res) => {
				if (res.success) {
					const columnsData = [
						{
							name: html("<center>User</center>"),
							key: "user",
							id: "user",
							formatter: (user) =>
								_(
									<span className="d-flex justify-center align-items-center">
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
									<center>
										<span
											className={`badge badge-border ${
												cell === "Gift Card"
													? "text-success"
													: cell === "Event"
													? "text-warning"
													: "text-danger"
											}`}
										>
											{cell}
										</span>
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
											role="button"
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
			});
	}, []);

	return (
		<Card>
			<CardHeader className="align-items-center d-flex">
				<h4 className="card-title mb-0 flex-grow-1 text-dark">
					Top 10 redemptions
				</h4>
				<div className="flex-shrink-0">
					<button
						type="button"
						onClick={() => {
							history("/redemption");
						}}
						className="btn btn-soft-info "
					>
						view all
					</button>
				</div>
			</CardHeader>
			<Grid
				columns={columns}
				pagination={false}
				sort={true}
				style={{
					table: {
						minWidth: "1000px",
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
		</Card>
	);
};

export default TopTenRedemptions;
