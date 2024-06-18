import React, { Fragment } from "react";
import { Button, Col, Input, Row } from "reactstrap";

const PaymentTable = ({ data }) => {
    return (
        <Fragment>
            <div className="card-body">
                <Row style={{padding:"0"}}>
                    <Col lg={8} className="mb-4" style={{padding:"0"}}>
                        <Col>
                            <label htmlFor="rows">Search</label>
                            <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
                                <input
                                    id="search-bar-0"
                                    type="text"
                                    className="form-control search /"
                                    placeholder={"Search here....."}
                                />
                                <i className="bx bx-search-alt search-icon"></i>
                            </div>
                        </Col>
                    </Col>
                    <Col lg={2}>
                        <label htmlFor="rows">Rows</label>
                        <div className="input-light">
                            <select
                                className="form-control"
                                data-choices
                                data-choices-search-false
                                name="choices-single-default"
                                id="rows"
                            >
                                <option defaultValue="clients">10</option>
                                <option value="Open">50</option>
                                <option value="Inprogress">100</option>
                                <option value="Closed">500</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <label htmlFor="rows">Clear</label>
                        <button type="button" className="btn btn-danger"> <i className="ri-filter-fill me-1 align-bottom"></i>
                        </button>
                    </Col>
                </Row>
                <div className="table-responsive  table-card">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Points Bought</th>
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    const date = new Date(item.date);
                                    const formattedDate = date.toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                      });
                                    return (
                                        <tr key={index}>
                                            <th>{index+1}</th>
                                            <td><span className={item.points < 600 ? "text-info" : item.points > 600 && item.points < 999 ? "text-warning" : item.points > 999 ? "text-danger" : "text-danger"}>{item.points}</span></td>
                                            <td>{item.amount}</td>
                                            <td><span className="text-warning">{formattedDate}</span></td>
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

export default PaymentTable;