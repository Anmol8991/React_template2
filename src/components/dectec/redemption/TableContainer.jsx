import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Search from "./Search";
import wire from "@/assets/images/demo/wire.jpg";

const TableContainer = ({ data, setActive, setType }) => {
  const onChangeChartPeriod = (e) => {
    setActive(e.target.value);
  };

  const [protocols, setprotocols] = useState(true);
  const [clients, setclients] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

  return (
    <Fragment>
      <div className="card-body">
        <Row className="g-3 mb-2">
          <Col lg={2} sm={4}>
            <label htmlFor="search-bar-0">Search</label>
            <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
              <input
                id="search-bar-0"
                type="text"
                className="form-control search /"
                placeholder=" Search here....."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
          <Search
            setprotocols={setprotocols}
            setclients={setclients}
            setType={setType}
          />
        </Row>
        <div className="card-body">
          <div className="table-responsive  table-card">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {protocols && <th scope="col">Protocol</th>}
                  {clients && <th scope="col">Client</th>}
                  <th scope="col">Name</th>
                  <th scope="col">Points </th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Trx Hash</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter(
                    ({ protocolName, clientName, userName }) =>
                      protocolName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      clientName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      userName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => {
                    function between(min, max) {
                      return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const points = between(100, 1000);
                    const amount = between(10, 15);

                    function hashme(min, max) {
                      return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const hash1 = hashme(1000, 9999);
                    const hash2 = hashme(1000, 9999);

                    return (
                      <tr key={item.points}>
                        {protocols && (
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.protocolImg}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />
                              {item.protocolName}
                            </div>
                          </td>
                        )}
                        {clients && (
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.clientImg}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />
                              {item.clientName}
                            </div>
                          </td>
                        )}
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.userImg}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {item.userName}
                          </div>
                        </td>

                        <td className="text-success">{points}</td>

                        <td>
                          <span
                            className={
                              amount < 12
                                ? "text-info"
                                : amount > 11 && amount < 13
                                ? "text-warning"
                                : amount > 13
                                ? "text-danger"
                                : "text-danger"
                            }
                          >
                            ${amount}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span
                            className={
                              "badge badge-border badge-soft-" +
                              item.statusClass
                            }
                          >
                            {item.type}
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
      </div>
    </Fragment>
  );
};

export default TableContainer;
