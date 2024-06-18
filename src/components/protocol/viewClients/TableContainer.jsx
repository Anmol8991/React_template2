import React, { Fragment } from "react";
import { Button, Col, Input, Row } from "reactstrap";
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
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Points</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className="text-success">{item.Name}</td>
                                            <td>{item.Description}</td>
                                            <td><span className={item.points < 6000 ? "text-info" : item.points > 6000 && item.points < 9999 ? "text-warning" : item.points > 9999 ? "text-danger" : "text-danger"}>{item.points}</span></td>
                                            <td>{item.date}</td>

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