import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledCollapse, UncontrolledDropdown } from "reactstrap";
import Search from "./Search.jsx";
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";
import wire from "@/assets/images/demo/wire.jpg";

const TableContainer = ({ data }) => {
    const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
    return (
        <Fragment>
            <div className="card-body">
                <Row>
                    <Col lg={12} style={{padding:"0"}}>
                        <UncontrolledCollapse toggler="#filter-collapse" defaultOpen>
                            <Row className="mb-2">
                                <Search/>
                            </Row>
                        </UncontrolledCollapse>
                    </Col>
                </Row>
                <div className="table-responsive  table-card">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Client</th>
                                <th scope="col">Name</th>
                                <th scope="col">Points </th>
                                <th scope="col">Amount($)</th>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Trx Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                function between(min, max) {
                                    return Math.floor(
                                        Math.random() * (max - min + 1) + min
                                    );
                                }

                                const points = between(100, 999);
                                const amount = between(100, 1000);


                                function hashme(min, max) {
                                    return Math.floor(
                                        Math.random() * (max - min + 1) + min
                                    );
                                }

                                const hash1 = hashme(1000, 9999);
                                const hash2 = hashme(1000, 9999);

                                return (
                                    <tr key={index}>

                                        <td>
                                            {item.clientImg && item.clientName ?
                                                <div className="d-flex align-items-center">
                                                    <img src={item.clientImg} alt="" className="avatar-xs rounded-circle me-2" />{item.clientName}
                                                </div>
                                                : <div className="d-flex align-items-center">
                                                    <img src={sophia} alt="" className="avatar-xs rounded-circle me-2" />Individual
                                                </div>
                                            }

                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img src={item.userImg} alt="" className="avatar-xs rounded-circle me-2" />{item.userName}
                                            </div></td>

                                        <td className="text-success">{points}</td>

                                        <td><span className={amount < 600 ? "text-info" : amount > 600 && amount < 999 ? "text-warning" : amount > 999 ? "text-danger" : "text-danger"}>{amount / 100}</span></td>
                                        <td>    <span className={"badge badge-border badge-soft-" + item.statusClass}>{item.type}</span></td>
                                        <td>{item.date}</td>
                                        <td  >
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="d-flex align-items-center">
                                                    <img src={wire} alt="" className="avatar-xs rounded-circle me-2" /><a href={scanLink} className="text-info p-0" >
                                                        {`0X${hash1}.....${hash2}`}
                                                    </a>
                                                </div>

                                                <span role="button" className="fa-layers text-gray fa-fw p-0" >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                </span>
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

export default TableContainer;