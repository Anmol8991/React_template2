import React, { Fragment } from "react";
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from "reactstrap";
import Search from "./Search.jsx";
import activity1 from "@/assets/images/brands/slack.png";
import wire from "@/assets/images/demo/wire.jpg";
const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
const TransactionTable = ({ data,dashboardFlag }) => {
    return (
        <Fragment>
            <div className="card-body">
                <Row className="g-3 mb-4" style={{padding:"0"}}>
                    <Search flag={dashboardFlag}/>
                </Row>

                <div className="table-responsive  table-card">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Activity</th>
                                <th scope="col">Description</th>
                                <th scope="col">Points Earned</th>
                                <th scope="col">Date</th>
                                <th scope="col">Txn Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className="text-success">
                                                <a
                                                    href="/activities/activity-detail"
                                                    style={{ pointerEvents: "auto" }}
                                                    >
                                                    {item.name == "AI Code" && (
                                                        <img
                                                        src={activity1}
                                                        alt=""
                                                        className="avatar-xxs rounded-circle me-2"
                                                        />
                                                    )}
                                                    {item.name}
                                                </a>
                                            </td>
                                            <td>{item.description}</td>
                                            <td>
                                                <span>
                                                {
                                                    <div
                                                    style={{ fontWeight: "bold" }}
                                                    className=" text-success"
                                                    >
                                                    {item.points}{" "}
                                                    </div>
                                                }
                                                </span>
                                            </td>
                                            <td>{item.date}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                        src={wire}
                                                        alt=""
                                                        className="avatar-xs rounded-circle me-2"
                                                        />
                                                        <a href={scanLink} className="text-info p-0">
                                                        {`0X4358.....4358`}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })

                            }
                        </tbody>

                    </table>
                </div>
                <Row className="justify-content-md-end justify-content-center align-items-center mt-3 p-2">
                    <Col className="col-md-auto">
                        <div className="d-flex gap-1">
                            <Button
                                color="primary"
                            >
                                {"<"}
                            </Button>
                        </div>
                    </Col>
                    <Col className="col-md-auto d-none d-md-block">
                        Page{" "}
                        <strong>
                            {1} of {10}
                        </strong>
                    </Col>
                    <Col className="col-md-auto">
                        <Input
                            type="number"
                            min={1}
                            style={{ width: 70 }}
                            max={10}
                            defaultValue={1}
                        />
                    </Col>

                    <Col className="col-md-auto">
                        <div className="d-flex gap-1">
                            <Button color="primary" >
                                {">"}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default TransactionTable;