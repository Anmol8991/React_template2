import React, { Fragment } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import Search from "./Search.jsx";

const TableContainer = ({ data }) => {
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
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Points</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-success">{item.Name}</td>
                    <td>{item.Description}</td>
                    <td>
                      <span
                        className={
                          item.points < 6000
                            ? "text-info"
                            : item.points > 6000 && item.points < 9999
                            ? "text-warning"
                            : item.points > 9999
                            ? "text-danger"
                            : "text-danger"
                        }
                      >
                        {item.points}
                      </span>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TableContainer;
