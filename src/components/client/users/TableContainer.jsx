import React, { Fragment } from "react";
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
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";

const TableContainer = ({ data }) => {
  const history = useNavigate();

  return (
    <Fragment>
      <div className="card-body">
        <Row className="g-3 mb-4">
          <Search />
        </Row>

        <div className="table-responsive  table-card">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">Earned Points</th>
                <th scope="col">Redeemed Points</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                function between(min, max) {
                  return Math.floor(Math.random() * (max - min + 1) + min);
                }

                const earnedPoints = between(1000, 10000);
                const redeemedPoints = between(1000, 10000);
                const phone = between(1000000000, 9999999999);

                const email =
                  item.userName.toLowerCase().replace(/\s/g, "") +
                  between(1000, 9999) +
                  "@gmail.com";
                  const countries = ["Arkansas (AR)","California (CA)","Montana(MT)","Nebraska(NE)",];
                  const randomNumber = Math.floor(Math.random()*countries.length);

                const statusClass = [`danger`, `warning`, `success`, `primary`];

                return (
                  <tr key={index}>
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
                    <td>{countries[randomNumber]}</td>
                    <td
                      className={
                        earnedPoints < 6000
                          ? "text-info"
                          : earnedPoints > 6000 && earnedPoints < 8000
                          ? "text-warning"
                          : earnedPoints > 8000
                          ? "text-danger"
                          : "text-info"
                      }
                    >
                      {earnedPoints}
                    </td>
                    <td
                      className={
                        redeemedPoints < 6000
                          ? "text-info"
                          : redeemedPoints > 6000 && redeemedPoints < 8000
                          ? "text-warning"
                          : redeemedPoints > 8000
                          ? "text-danger"
                          : "text-info"
                      }
                    >
                      {redeemedPoints}
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
                                history("/view-user");
                              }}
                            >
                              <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                              View
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              className="edit-item-btn"
                              href="#showModal"
                              data-bs-toggle="modal"
                            >
                              <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                              Edit
                            </DropdownItem>
                          </li>
                          <li>
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
      </div>
    </Fragment>
  );
};

export default TableContainer;
