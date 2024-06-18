import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ModalContainer } from "@/components/common/ModalContainer.jsx";

const TableContainer = ({ data, setActive }) => {
  const history = useNavigate();

  const onChangeChartPeriod = (e) => {
    setActive(e.target.value);
  };

  const [protocols, setprotocols] = useState(true);
  const [clients, setclients] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  return (
    <Fragment>
      {showModal && (
        <ModalContainer
          heading="Are you sure you want to delete this User?"
          handleClose={handleClose}
        />
      )}
      <div className="card-body">
        <Row className="g-3 mb-2">
          <Col>
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
          <Search setprotocols={setprotocols} setclients={setclients} />
          {/* <Search/> */}
        </Row>
        <div className="card-body">
          <div className="table-responsive  table-card">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {protocols && <th scope="col">Protocol</th>}
                  {clients && <th scope="col">Client</th>}
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  {/* <th scope="col">Phone</th> */}
                  <th scope="col">Country</th>
                  <th scope="col">status</th>
                  <th scope="col">Points Rewarded</th>
                  <th scope="col">Points Redeemed</th>
                  <th scope="col">Action</th>
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
                  .map((item, index) => {
                    function between(min, max) {
                      return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const statusCode =
                      item.status === "active" ? "success" : "danger";

                    const points = between(10, 100);
                    const phone = between(1000000000, 9999999999);
                    const amount = between(10, 100);
                    const textArray = ["UK", "USA", "Vietnam", "Canada"];
                    const randomNumber = Math.floor(
                      Math.random() * textArray.length
                    );
                    const email =
                      item.userName.toLowerCase().replace(/\s/g, "") +
                      between(1000, 9999) +
                      "@gmail.com";

                    return (
                      <tr key={index}>
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

                        <td>{email}</td>
                        {/* <td>{`+${phone}`}</td> */}
                        <td>{textArray[randomNumber]}</td>
                        <td>
                          {" "}
                          <span
                            className={
                              "badge badge-border badge-soft-" + statusCode
                            }
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="text-success">{points} k</td>

                        <td>
                          <span
                            className={
                              amount < 60
                                ? "text-info"
                                : amount > 60 && amount < 99
                                ? "text-warning"
                                : amount > 99
                                ? "text-danger"
                                : "text-danger"
                            }
                          >
                            {amount} k
                          </span>
                        </td>

                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              className="btn btn-soft-secondary btn-sm"
                            >
                              <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <li>
                                <DropdownItem
                                  onClick={() => {
                                    history(`/view-user/6454d18ba8d1b9141128abc6`);
                                  }}
                                >
                                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                  View
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem
                                  className="edit-item-btn"
                                  onClick={() => {
                                    history(`/edit-user/${item.userId}`);
                                  }}
                                >
                                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                  Edit
                                </DropdownItem>
                              </li>
                              <li onClick={() => setShowModal(true)}>
                                <DropdownItem
                                  className="remove-item-btn"
                                  data-bs-toggle="modal"
                                  href="#deleteOrder"
                                >
                                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                  Delete
                                </DropdownItem>
                              </li>
                            </DropdownMenu>
                          </UncontrolledDropdown>
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
