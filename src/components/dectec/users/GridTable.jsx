import React, { useCallback, useState, useEffect, useRef } from "react";
import { Grid, _ } from "gridjs-react";
import { html, h, Row } from "gridjs";
import { CSVLink } from "react-csv";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  UncontrolledDropdown,
} from "reactstrap";

import TableFilters from "./TableFilters";
import { useNavigate } from "react-router-dom";
import { usersListApi } from "../../../api/dectecApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FETCH_POINTS_REWARDED_URL } from "../../../api/apiUrls";
import { Dialog, DialogActions, DialogTitle, Pagination } from "@mui/material";
import Loader from "../../common/Loader";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";
import { handleStatusUpdate } from "../../../utils/apiHelper";

export const GridTable = ({ data }) => {
  const history = useNavigate();
  //   const [pointsRewardedInfo, setPointsRewardedInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
    protocolId: "",
    clientId: "",
  });
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [protocol, setProtocol] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getUserList();
  }, [pageDetails, protocol, client]);

  const getUserList = () => {
    setLoading(true);
    usersListApi(pageDetails.pageNumber, pageDetails.pageSize, protocol, client)
      .then((res) => {
        const { success, data } = res;
        if (success) {
          setUserInfo(data?.data ?? []);
          let total = roundToNearestWholeNumber(
            data.total_documents / pageDetails.pageSize
          );
          if (total === 0) total = 1;
          setTotalPages(total);

          const columnsData = [
            {
              name: html("<center>Protocol</center>"),
              key: "protocolInfo",
              id: "protocolInfo",
              formatter: (protocol) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={protocol.logo}
                    />
                    <span>{protocol.name}</span>
                  </span>
                ),
              sort: {
                compare: (a, b) => {
                  const nameA = a.name.toUpperCase();
                  const nameB = b.name.toUpperCase();

                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                },
              },
            },
            {
              name: html("<center>Client</center>"),
              key: "clientInfo",
              id: "clientInfo",
              formatter: (client) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={client.logo}
                    />
                    <span>{client.name}</span>
                  </span>
                ),
              sort: {
                compare: (a, b) => {
                  const nameA = a.name.toUpperCase();
                  const nameB = b.name.toUpperCase();

                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                },
              },
            },
            {
              name: html("<center>User</center>"),
              key: "userInfo",
              id: "userInfo",
              formatter: (user) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={user.logo}
                    />
                    <span>{user.name}</span>
                  </span>
                ),
              sort: {
                compare: (a, b) => {
                  const nameA = a.name.toUpperCase();
                  const nameB = b.name.toUpperCase();

                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                },
              },
            },
            {
              name: html("<center className='text-wrap' }>Email</center>"),
              key: "email",
              id: "email",
              formatter: (cell) => _(<span>{cell}</span>),
            },
            {
              name: html("<center className='text-wrap'>Country</center>"),
              key: "country",
              id: "country",
              formatter: (country) =>
                _(<center className="">{country}</center>),
            },
            {
              name: html("<center className='text-wrap'>Status</center>"),
              key: "status",
              id: "status",
              formatter: (status) =>
                _(
                  <center
                    className={
                      "badge badge-border badge-soft-" +
                      (status === true ? "success" : "danger")
                    }
                  >
                    {status === true ? "Active" : "Inactive"}
                  </center>
                ),
              sort: false,
            },
            {
              name: html(
                "<center className='text-wrap'>Points Rewarded</center>"
              ),
              key: "pointsRewarded",
              id: "pointsRewarded",
              formatter: (cell) =>
                _(
                  <center className="text-success">
                    {cell.prefix}
                    {cell.value} {cell.suffix}
                  </center>
                ),
              sort: {
                compare: (a, b) => {
                  const valueA = a.value;
                  const valueB = b.value;

                  if (valueA < valueB) {
                    return -1;
                  }
                  if (valueA > valueB) {
                    return 1;
                  }
                  return 0;
                },
              },
            },
            {
              name: html(
                "<center className='text-wrap'>Points Earned</center>"
              ),
              key: "pointsRedeemed",
              id: "pointsRedeemed",
              formatter: (cell) =>
                _(
                  <center
                    className={
                      cell.value < 60
                        ? "text-info"
                        : cell.value > 60 && cell.value < 99
                        ? "text-warning"
                        : cell.value > 99
                        ? "text-danger"
                        : "text-danger"
                    }
                  >
                    {cell.prefix}
                    {cell.value} {cell.suffix}
                  </center>
                ),
              sort: {
                compare: (a, b) => {
                  const valueA = a.value;
                  const valueB = b.value;

                  if (valueA < valueB) {
                    return -1;
                  }
                  if (valueA > valueB) {
                    return 1;
                  }
                  return 0;
                },
              },
            },
            {
              name: html("<center className='text-wrap'>Action</center>"),
              id: "userInfo",
              key: "userInfo",
              sort: false,
              formatter: (userInfo, entries) => {
                const userStatus = entries?._cells[5].data;
                return _(
                  <center>
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
                            onClick={(e) => {
                              history(`/view-user/${userInfo.userId}`);
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
                              history(`/edit-user/${userInfo.userId}`);
                            }}
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
                            onClick={() => {
                              handleStatusUpdate(
                                "user",
                                userInfo.userId,
                                getUserList,
                                userInfo.name,
                                userStatus
                              );
                            }}
                          >
                            <i className="ri-restart-line align-bottom me-2 text-muted"></i>{" "}
                            Update Status
                          </DropdownItem>
                        </li>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </center>
                );
              },
            },
          ];
          const rowsData = data.data.reduce((acc, curr) => {
            const value = columnsData.map((item) =>
              item?.key ? curr[item.key] : item.name
            );

            return [...acc, value];
          }, []);

          setColumns(columnsData);
          setRows(rowsData);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (event, value) => {
    setPageDetails({ ...pageDetails, pageNumber: value });
  };

  return (
    <>
      <div className="position-relative pt-3">
        <div className="table-filters end-0 d-flex" style={{ zIndex: 100 }}>
          <label className="d-flex align-items-center">
            Show
            <select
              name="example_length"
              aria-controls="example"
              className="form-select form-select-sm mx-2"
              value={pageDetails.pageSize}
              onChange={(e) =>
                setPageDetails({
                  ...pageDetails,
                  pageSize: Number(e.target.value),
                })
              }
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
            </select>
          </label>
          <div className="d-flex gap-2">
            <UncontrolledDropdown className="">
              <DropdownToggle tag="a" className="btn btn-outline-gray btn-sm ">
                <i className="bx bx-upload mx-1"></i> Export
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <CSVLink
                    {...{
                      data: userInfo?.map((data) => ({
                        ...data,
                        protocolInfo: data.protocolInfo.name,
                        clientInfo: data.clientInfo.name,
                        userInfo: data.userInfo.name,

                        pointsRedeemed: `${data.pointsRedeemed.prefix}${data.pointsRedeemed.value}${data.pointsRedeemed.suffix}`,
                        pointsRewarded: `${data.pointsRewarded.prefix}${data.pointsRewarded.value}${data.pointsRewarded.suffix}`,
                      })),
                      headers: userInfo.length ? Object.keys(userInfo[0]) : [],
                      filename: "users.csv",
                    }}
                  >
                    <DropdownItem
                      className="remove-item-btn"
                      data-bs-toggle="modal"
                    >
                      CSV
                    </DropdownItem>
                  </CSVLink>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* filters */}
            <UncontrolledDropdown className="">
              <DropdownToggle
                className=" ms-1 btn btn-soft-success border btn-sm px-1"
                style={{ height: "fit-content", lineHeight: "1.2" }}
              >
                <i className="bx bx-dots-vertical-rounded fs-5 m-0"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <TableFilters
                  protocol={protocol}
                  setProtocol={setProtocol}
                  client={client}
                  setClient={setClient}
                  date={date}
                  setDate={date}
                />
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Grid
            columns={columns}
            search={{
              selector: (cell) => cell?.name || cell?.value || cell,
            }}
            pagination={false}
            sort={true}
            style={{
              table: {
                overflow: "scroll",
                whitespace: "nowrap",
                tableLayout: "auto",
                width: "maxContent",
              },
              th: {
                whiteSpace: "nowrap",
              },
            }}
            data={rows}
          />
        )}
        <Pagination
          count={totalPages}
          color="primary"
          shape="rounded"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
          }}
          className="text-dark"
          page={pageDetails.pageNumber}
          onChange={handlePageChange}
          siblingCount={0}
          boundaryCount={1}
        />
      </div>
    </>
  );
};
