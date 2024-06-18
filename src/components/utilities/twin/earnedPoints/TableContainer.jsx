import React, { Fragment } from "react";
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
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";
import activity5 from "@/assets/images/brands/mail_chimp.png";
const TableContainer = ({ data, dashboardFlag }) => {
  return (
    <Fragment>
      <div className="card-body">
        <Row className="g-3 mb-4" style={{ padding: "0" }}>
          <Search flag={dashboardFlag} />
        </Row>

        <div className="table-responsive  table-card">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Activity</th>
                <th scope="col">Description</th>
                <th scope="col">Points Earned</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-success">
                      <a
                        href="/activities/upload-data"
                        style={{ pointerEvents: "auto" }}
                      >
                        {item.name == "AI Code" && (
                          <img
                            src={activity1}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {item.name == "Tell us about Mindplex" && (
                          <img
                            src={activity2}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {item.name == "Awareness" && (
                          <img
                            src={activity3}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {item.name == "Join our business" && (
                          <img
                            src={activity4}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {item.name == "Watch a Video" && (
                          <img
                            src={activity5}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {item.name}
                      </a>
                    </td>
                    <td>{item.description}</td>
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
                            <a href="/transaction-list">
                              <DropdownItem>
                                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                View
                              </DropdownItem>
                            </a>
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
