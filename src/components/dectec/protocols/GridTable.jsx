import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastify";
import { useState, useEffect, useCallback } from "react";
import {
  updateProtocolStatus,
  fetchProtocolInfo,
} from "../../../api/dectecApi";
import { Pagination } from "@mui/material";
import Loader from "../../common/Loader";
import TableFilters from "./TableFilters";
import { roundToNearestWholeNumber } from "../../../utils/commonHelper";
import { handleStatusUpdate } from "../../../utils/apiHelper";

export const GridTable = () => {
  const history = useNavigate();
  const [protocolsData, setProtocolsData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [protocol, setProtocol] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getProtocols();
  }, [pageDetails, protocol]);

  const getProtocols = () => {
    setLoading(true);
    fetchProtocolInfo(pageDetails.pageNumber, pageDetails.pageSize, protocol)
      .then((res) => {
        const { success, data } = res;
        if (success) {
          if (data.total_documents) {
            let total = roundToNearestWholeNumber(
              data.total_documents / pageDetails.pageSize
            );
            if (total === 0) total = 1;
            setTotalPages(total);
          }

          setProtocolsData(data?.data ?? []);
          const columnsData = [
            {
              name: html("<center>Protocol</center>"),
              key: "protocolInfo",
              id: "protocolInfo",
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

              formatter: (protocolInfo) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={protocolInfo.protocolLogo}
                    />
                    {protocolInfo.name}
                  </span>
                ),
            },
            {
              name: html("<center className='text-wrap'>Description</center>"),
              key: "protocolDescription",
              id: "protocolDescription",
            },
            {
              name: html("<center className='text-wrap'>Type</center>"),
              key: "protocolType",
              id: "protocolType",
              formatter: (protocolType) => _(<center>{protocolType}</center>),
            },
            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "date",
              id: "date",
              formatter: (date) => _(<center>{date}</center>),
            },
            {
              name: html("<center className='text-wrap'>Action</center>"),
              key: "action",
              id: "action",
              sort: false,
              formatter: (protocolInfo, entries) => {
                const protocolId = entries?._cells[0].data.protocolId;
                const protocolName = entries?._cells[0].data.name;
                console.log(entries, "ll");
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
                            onClick={() => {
                              history(`/view-protocol/${protocolId}`);
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
                              history(`/edit-protocol/${protocolId}`);
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
                                "protocol",
                                protocolId,
                                getProtocols,
                                protocolName
                              );
                            }}
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
          const rowsData =
            data?.data ??
            data.reduce((acc, curr) => {
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
                      data: protocolsData?.map((data) => ({
                        ...data,
                        protocolInfo: data.protocolInfo.name,
                      })),
                      headers: protocolsData.length
                        ? Object.keys(protocolsData[0])
                        : [],
                      filename: "protocols.csv",
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
