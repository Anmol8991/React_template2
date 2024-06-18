import React, { Fragment, useState } from "react";
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
import { ModalContainer } from "@/components/common/ModalContainer.jsx";
import perk from "@/assets/images/demo/perk.png";
import sophiaDao from "@/assets/images/demo/sophiaDao.png";
import dereal from "@/assets/images/demo/dereal.jpg";
import dope from "@/assets/images/demo/dope.png";
import devnet from "@/assets/images/demo/devnet.png";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";

const TableContainer = ({ data }) => {
  const history = useNavigate()
  const protocolImages = [perk, sophiaDao, devnet, dope, dereal];
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  return (
    <Fragment>
      {showModal && (
        <ModalContainer
          heading="Are you sure you want to delete this Protocol?"
          handleClose={handleClose}
        />
      )}
      <Row className="g-3  mt-3">
        <Col lg={3} sm={4}>
          <label htmlFor="search-bar-0">Search</label>
          <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
            <input
              id="search-bar-0"
              type="text"
              className="form-control search /"
              placeholder=" Search here....."
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
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={protocolImages[i]}
                          alt=""
                          className="avatar-xs rounded-circle me-2"
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>{item.protocolDescription}</td>

                    <td>{item.protocolType}</td>
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
                                history(`/view-protocol/${item.protocolId}`);
                              }}
                            >
                              <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                              View
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              className="edit-item-btn"
                              onClick={() => {
                                history(`/edit-protocol/${item.protocolId}`);
                              }}
                              data-bs-toggle="modal"
                            >
                              <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
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
      </div>
    </Fragment>
  );
};

export default TableContainer;
