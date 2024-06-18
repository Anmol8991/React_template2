import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Search from "./Search.jsx";
import { ModalContainer } from "@/components/common/ModalContainer.jsx";

const TableContainer = ({ data }) => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  return (
    <Fragment>
      {showModal && (
        <ModalContainer
          heading="Are you sure you want to delete this Client?"
          handleClose={handleClose}
        />
      )}
      <div className="card-body">
        <Row className="g-3 mb-2 ">
          <Col>
            <label htmlFor="search-bar-0">Search</label>
            <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
              <input
                id="search-bar-0"
                type="text"
                className="form-control search /"
                placeholder={" Search here....."}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
          <Search />
        </Row>
        <div className="card-body">
          <div className="table-responsive  table-card">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Protocol</th>
                  <th scope="col">Client</th>
                  <th scope="col">Points Bought</th>
                  <th scope="col">Points Rewarded</th>
                  <th scope="col">Amount Paid ($)</th>
                  <th scope="col">Points Remaining</th>
                  <th scope="col">Added Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ?.filter(
                    ({ protocolName, client }) =>
                      protocolName
                        ?.toLowerCase()
                        .includes(searchQuery?.toLowerCase()) ||
                      client?.toLowerCase().includes(searchQuery?.toLowerCase())
                  )
                  .map((item, i) => {
                    function between(min, max) {
                      return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const pointsRewarded = item?.pointsRewarded?.value ?? 0;
                    const pointsBought = item?.pointsBought?.value ?? 0;
                    const pointsRemaining = item?.pointsRemaining?.value ?? 0;
                    const amountPaid = item?.amountPaid?.value ?? 0;

                    return (
                      <tr key={i}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              // src={item.protocolLogo}
                              src={item.protocolLogo}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {item.protocolName}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.clientLogo}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {item.client}
                          </div>
                        </td>

                        <td>{pointsBought}</td>
                        <td>{pointsRewarded}</td>
                        <td>
                          <span
                            className={
                              amountPaid < 6000
                                ? "text-info"
                                : amountPaid > 6000 && amountPaid < 9999
                                ? "text-warning"
                                : amountPaid > 9999
                                ? "text-danger"
                                : "text-danger"
                            }
                          >
                            {amountPaid}
                          </span>
                        </td>
                        <td className="text-success">{pointsRemaining}</td>
                        <td>{item.date}</td>

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
                                    history(`/view-client/${item.clientId}`);
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
                                    history(`/edit-client/${item.clientId}`);
                                  }}
                                  data-bs-toggle="modal"
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
            <Col className="col-md-auto d-none d-md-block ">
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
