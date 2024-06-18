import React, { useCallback, useState, useEffect } from "react";
import { Grid, _ } from "gridjs-react";
import { html, h, Row } from "gridjs";
import { CSVLink } from "react-csv";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";

import TableFilters from "./TableFilters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import Loader from "../../../common/Loader";
import { fetchPointsRewarded } from "../../../../api/dectecApi";
import {
  roundToNearestWholeNumber,
  truncateString,
} from "../../../../utils/commonHelper";

export const GridTable = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [protocol, setProtocol] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchPointsRewarded(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      protocol,
      client
    )
      .then((res) => {
        const { success, data } = res;
        if (success) {
          let total = roundToNearestWholeNumber(
            data.total_documents / pageDetails.pageSize
          );
          if (total === 0) total = 1;
          setRewards(data?.data ?? []);
          setTotalPages(total);
          const columnsData = [
            {
              name: html("<center>User</center>"),
              key: "userInfo",
              id: "userInfo",
              formatter: (user) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={user.profile}
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
              name: html("<center className='text-wrap' >Points</center>"),
              key: "pointsEarned",
              id: "pointsEarned",
              formatter: (cell) =>
                _(
                  <center className="text-success">{`${cell.prefix}${cell.value}${cell.suffix}`}</center>
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
              name: html("<center className='text-wrap'>Activity</center>"),
              key: "activityInfo",
              id: "activityInfo",
              formatter: (activity) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={activity.logo}
                    />
                    <span>{activity.name}</span>
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
              name: html("<center className='text-wrap'>Trx Hash</center>"),
              key: "transactionHash",
              id: "transactionHash",
              formatter: (hash) => {
                return _(
                  <center className="text-info cursor-pointer">
                    {truncateString(hash)}
                    <span
                      role="button"
                      className="fa-layers text-gray fa-fw ms-1 p-0"
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </span>
                  </center>
                );
              },
              sort: false,
            },

            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "date",
              id: "date",
              formatter: (cell) => _(<center className="">{cell}</center>),
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
  }, [pageDetails, protocol, client, date]);
  const handlePageChange = (event, value) => {
    setPageDetails({ ...pageDetails, pageNumber: value });
  };

  return (
    <Card className="px-3">
      <CardHeader className="border-1">
        <div className="d-flex align-items-center">
          <h5 className="card-title mb-0 flex-grow-1 text-dark">
            Rewarded Points History
          </h5>
        </div>
      </CardHeader>
      <div className="position-relative pt-3">
        <div className="table-filters end-0 d-flex" style={{ zIndex: 100 }}>
          <label className="d-flex align-items-center">
            Show
            <select
              name="example_length"
              aria-controls="example"
              className="form-select form-select-sm mx-2 cursor-pointer "
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
            {/* <UncontrolledDropdown className="">
              <DropdownToggle tag="a" className="btn btn-outline-gray btn-sm ">
                <i className="bx bx-upload mx-1"></i> Export
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                  >
                    <CSVLink
                      {...{
                        data: rewards?.map((data) => ({
                          ...data,
                          protocolInfo: data.protocolInfo.name,
                          clientInfo: data.clientInfo.name,
                          userInfo: data.userInfo.name,
                          activityInfo: data.activityInfo.name,
                          pointsEarned: `${data.pointsEarned.prefix}${data.pointsEarned.value}${data.pointsEarned.suffix}`,
                        })),
                        headers: rewards.length ? Object.keys(rewards[0]) : [],
                        filename: "rewards.csv",
                      }}
                    >
                      CSV
                    </CSVLink>
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {/* filters */}
            {/* <UncontrolledDropdown className="">
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
                  setDate={setDate}
                />
              </DropdownMenu>
            </UncontrolledDropdown> */}
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
                maxWidth: "calc(100% - 300px)",
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
    </Card>
  );
};
