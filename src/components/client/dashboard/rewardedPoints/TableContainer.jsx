import React, { Fragment } from "react";
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from "reactstrap";
import Search from "./Search.jsx";

const TableContainer = ({ data }) => {
    return (
        <Fragment>
            <div className="card-body">
                <Row className="g-3 mb-4" style={{padding:"0"}}>
                    <Search />
                </Row>

                <div className="table-responsive  table-card">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Activity</th>
                                <th scope="col">User</th>
                                <th scope="col">Points</th>
                                <th scope="col">Date</th>
                                {/* <th scope="col">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    function hashme(min, max) {
                                        return Math.floor(Math.random() * (max - min + 1) + min);
                                      }
                    
                                      const hash1 = hashme(1000, 9999);
                                      const hash2 = hashme(1000, 9999);
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className="text-success">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <img
                                                        src={item.activityLogo}
                                                        alt=""
                                                        className="avatar-xs rounded-circle"
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1">{item.activityName}</div>
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
                                            <td><span className="text-dark">{item.points}</span></td>
                                            <td>{item.date}</td>
                                            {/* <td>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                                                        <i className="ri-more-fill align-middle"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <li><a href="/transaction-list"><DropdownItem><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem></a></li>
                                                        <li><DropdownItem className="edit-item-btn" href="#showModal" data-bs-toggle="modal" ><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem></li>
                                                        <li>
                                                            <DropdownItem className="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                            </DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>

                                            </td> */}
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