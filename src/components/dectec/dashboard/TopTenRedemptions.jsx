import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { recentOrders } from "@/data/dectec/data/data";
import CountUp from "react-countup";
import { html } from "gridjs";

import wire from "@/assets/images/demo/wire.jpg";
import { notify } from "../../../utils/toastify";
import { fetchTopRedemptionList } from "../../../api/dectecApi";
import { Grid, _ } from "gridjs-react";

const TopTenRedemptions = () => {
	const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
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
							name: html("<center>Protocol</center>"),
							key: "protocol",
							id: "protocol",
							formatter: (protocol) =>
								_(
									<span className="d-flex align-items-center">
										<img
											className="avatar-xs rounded-circle me-2"
											src={protocol.protocolLogo}
										/>
										<span>{protocol.protocolName}</span>
									</span>
								),
							sort: true,
						},
						{
							name: html("<center>Client</center>"),
							key: "client",
							id: "client",
							formatter: (client) =>
								_(
									<span className="d-flex align-items-center">
										<img
											className="avatar-xs rounded-circle me-2"
											src={client.clientLogo}
										/>
										<span>{client.clientName}</span>
									</span>
								),
							sort: true,
						},
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
								_(<center className="text-success">{cell}</center>),
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
											cell === "GiftCard"
												? "text-info"
												: cell === "Event"
												? "text-warning"
												: "text-danger"
										}`}
									>
										{cell}
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
			{/* <Card>
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

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">Protocol</th>
                  <th scope="col">Client</th>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">points</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Trx Hash</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders || []).map((item, key) => {
                  function hashme(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                  }

                  const hash1 = hashme(1000, 9999);
                  const hash2 = hashme(1000, 9999);
                  return (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={item.protocolImg}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.protocolName}</div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={item.clientImg}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.clientName}</div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={item.userImg}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.userName}</div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            "badge badge-border badge-soft-" + item.statusClass
                          }
                        >
                          {item.type}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark">
                          <CountUp
                            start={0}
                            prefix={""}
                            suffix={""}
                            separator={","}
                            end={2 * Number(item.points / 10)}
                            decimals={0}
                            duration={4}
                          />
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <CountUp
                            start={0}
                            prefix={"$"}
                            suffix={""}
                            separator={","}
                            end={item.amount / 15}
                            decimals={1}
                            decimal={"."}
                            duration={4}
                          />
                        </span>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center">
                            <img
                              src={wire}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            <a href={scanLink} className="text-info p-0">
                              {`0X${hash1}.....${hash2}`}
                            </a>
                          </div>

                          <span
                            role="button"
                            className="fa-layers text-gray fa-fw p-0"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card> */}
		</Card>
	);
};

export default TopTenRedemptions;
