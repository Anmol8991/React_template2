import React, { useCallback, useState, useEffect } from "react";
import { Grid, _ } from "gridjs-react";
import { html, h } from "gridjs";
import { CSVLink } from "react-csv";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import ErrorBox from "../../common/ErrorBox";
import { Pagination } from "@mui/material";
import Loader from "../../common/Loader";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";
import { handleStatusUpdate, handleEdit } from "../../../utils/apiHelper";
import { fetchClientInfo } from "../../../api/protocolApi.js";
export const GridTable = ({ data }) => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    getClients();
  }, [pageDetails, client]);

  const getClients = () => {
    setLoading(true);
    fetchClientInfo(pageDetails.pageNumber, pageDetails.pageSize, client)
      .then(({ success, data: response, message }) => {
        if (success) {
          if (response?.total_documents) {
            let total = roundToNearestWholeNumber(
              response.total_documents / pageDetails.pageSize
            );
            if (total === 0) total = 1;
            setTotalPages(total);
          }
          setClientsData(response?.data);
          const columnsData = [
            {
              name: html("<center>Client Info</center>"),
              key: "clientInfo",
              id: "clientInfo",
              formatter: (info) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={info.clientLogo}
                    />
                    <span>{info.client}</span>
                  </span>
                ),

              sort: {
                compare: (a, b) => {
                  const nameA = a.client.toUpperCase();
                  const nameB = b.client.toUpperCase();

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
              name: html(
                "<center className='text-wrap'>Points Bought</center>"
              ),
              key: "pointsBought",
              id: "pointsBought",
              formatter: (cell) =>
                _(
                  <center>{`${cell.prefix}${cell.value}${cell.suffix}`}</center>
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
                "<center className='text-wrap'>Points Rewarded</center>"
              ),
              key: "pointsRewarded",
              id: "pointsRewarded",
              formatter: (cell) =>
                _(
                  <center>{`${cell.prefix}${cell.value}${cell.suffix}`}</center>
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
              name: html("<center className='text-wrap'>Amount Paid</center>"),
              key: "amountPaid",
              id: "amountPaid",
              formatter: (cell) =>
                h(
                  "center",
                  {
                    className: "text-warning",
                  },
                  `${cell.prefix}${cell.value}${cell.suffix}`
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
                "<center className='text-wrap''>Points Remaining</center>"
              ),
              key: "pointsRemaining",
              id: "pointsRemaining",

              formatter: (cell) =>
                h(
                  "center",
                  {
                    className: "text-success",
                  },
                  `${cell.prefix}${cell.value}${cell.suffix}`
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
              name: html("<center className='text-wrap'>Date</center>"),
              key: "date",
              id: "date",
              formatter: (cell) => _(<center>{cell}</center>),
            },
            {
              name: html("<center className='text-wrap'>Action</center>"),
              id: "action",
              key: "action",
              sort: false,
              formatter: (clientInfo, entries) => {
                const clientId = entries?._cells[0].data.clientId;
                const clientName = entries?._cells[0].data.client;

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
                              history(`/view-client/${clientId}`);
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
                              // handleEdit("client", clientId, clientName);
                              history(`/edit-client/${clientId}`);
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
                            onClick={() =>
                              handleStatusUpdate(
                                "client",
                                clientId,
                                getClients,
                                clientName
                              )
                            }
                          >
                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                            Delete
                          </DropdownItem>
                        </li>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </center>
                );
              },
            },
          ];
          const rowsData = (response?.data ?? response).reduce((acc, curr) => {
            const value = columnsData.map((item) => {
              return item?.key ? curr[item.key] : item.name;
            });
            return [...acc, value];
          }, []);

          setColumns(columnsData);
          setRows(rowsData);
        } else {
          setError(message);
        }
      })
      .catch((error) => {
        setError("Some Error Occurred");
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
            Show{" "}
            <select
              name="example_length"
              aria-controls="example"
              className="form-select form-select-sm mx-2 cursor-pointer"
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
                      data: clientsData?.map((data) => ({
                        ...data,
                        clientInfo: data.clientInfo.client,
                        pointsBought: `${data.pointsBought.prefix}${data.pointsBought.value}${data.pointsBought.suffix}`,
                        pointsRewarded: `${data.pointsRewarded.prefix}${data.pointsRewarded.value}${data.pointsRewarded.suffix}`,
                        pointsRemaining: `${data.pointsRemaining.prefix}${data.pointsRemaining.value}${data.pointsRemaining.suffix}`,
                        amountPaid: `${data.amountPaid.prefix}${data.amountPaid.value}${data.amountPaid.suffix}`,
                      })),
                      headers: clientsData.length
                        ? Object.keys(clientsData[0])
                        : [],
                      filename: "clients.csv",
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
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Grid
            columns={columns}
            search={{
              selector: (cell) => cell?.client || cell?.value || cell,
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
