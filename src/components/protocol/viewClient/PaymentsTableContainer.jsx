import React, { Fragment } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import Search from "./Search";

const PaymentsTableContainer = ({ data }) => {
  return (
    <Fragment>
      <div className="card-body">
        <Row className="g-3 mb-4">
          <Col>
            <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
              <input
                id="search-bar-0"
                type="text"
                className="form-control search /"
                placeholder={"search here....."}
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
          <Search />
        </Row>

        <div className="table-responsive  table-card">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Points Bought</th>
                <th scope="col">Amount Paid ($)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.pointsBought}>
                    <td>
                      <span
                        className={
                          item.pointsBought < 6000
                            ? "text-info"
                            : item.pointsBought > 6000 &&
                              item.pointsBought < 9999
                            ? "text-warning"
                            : item.pointsBought > 9999
                            ? "text-danger"
                            : "text-danger"
                        }
                      >
                        {item.pointsBought}
                      </span>
                    </td>
                    <td>{item.amountPaid}</td>
                    <td>{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Row className="justify-content-md-end justify-content-center align-items-center mt-5 p-2">
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button color="primary">{"<"}</Button>
            </div>
          </Col>
          <Col className="col-md-auto d-none d-md-block  ">
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
              <Button color="primary">{">"}</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default PaymentsTableContainer;
