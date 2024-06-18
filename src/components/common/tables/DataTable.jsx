import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import wire from "@/assets/images/demo/wire.jpg";
import { date } from "@/data/dashboardData";
import { recentOrders } from "@/data/viewActivityData";
import huddleLogo from "@/assets/images/companies/img-1.png";
import biswap from "@/assets/images/demo/biswap.jpg";
import ActionButton from "../ActionButton";
import Search from "../Search";


const DataTable = ({ tableData, tableFilter, pagination }) => {
  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

  return (
    <CardBody>
      {tableFilter && (
        <Row className="g-3 mb-4">
          <Col>
            <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
              <input
                id="search-bar-0"
                type="text"
                className="form-control search /"
                placeholder={" search here....."}
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
          <Search />
        </Row>
      )}
      <div className="table-responsive table-card">
        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
          <thead className="text-muted table-light">
            <tr>
              {tableData.map(({ title }, i) => (
                <th key={i} scope="col">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData[0].data.map((tr, i) => (
              <tr key={i}>
                {tableData.map((td, tdI) => (
                  <td key={tdI}>
                    <div key={i} className="d-flex align-items-center">
                      {td.data[i].img && (
                        <div className="flex-shrink-0 me-2">
                          <img
                            src={td.data[i].img}
                            alt=""
                            className="avatar-xs rounded-circle"
                          />
                        </div>
                      )}
                      <div className={`flex-grow-1 `}>
                        {td.title === "Trx Hash" ? (
                          <div className="d-flex align-items-center gap-2">
                            <a href={scanLink} className="text-info p-0">
                              {td.data[i].value.slice(0, 4) +
                                "...." +
                                td.data[i].value.slice(-4)}
                            </a>
                            <span
                              role="button"
                              className="fa-layers text-gray fa-fw p-0"
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </span>
                          </div>
                        ) : td.data[i].value === "actionBtn" ? (
                          <ActionButton />
                        ) : /\b(Amount|Points|Earned)\b/.test(td.title) ? (
                          <span
                            className={
                              td.data[i].value < 6000
                                ? "text-info"
                                : td.data[i].value > 6000 &&
                                  td.data[i].value < 9999
                                ? "text-warning"
                                : td.data[i].value > 9999
                                ? "text-danger"
                                : "text-danger"
                            }
                          >
                            {td.data[i].value}
                          </span>
                        ) : /\b(Status|Type)\b/.test(td.title) ? (
                          <span className="badge badge-border">
                            {td.data[i].value}
                          </span>
                        ) : (
                          td.data[i].value
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Row className="justify-content-md-end justify-content-center align-items-center mt-3 p-2">
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button color="primary">{"<"}</Button>
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
              <Button color="primary">{">"}</Button>
            </div>
          </Col>
        </Row>
      )}
    </CardBody>
  );
};

export default DataTable;
