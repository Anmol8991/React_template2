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
import { fetchActivityPoints } from "@/api/dectecApi";
import { Pagination } from "@mui/material";
import Loader from "@/components/common/Loader";
import { roundToNearestWholeNumber } from "@/utils/commonHelper";
// import TableActivityHistoryFilters from "./TableActivityHistoryFilters";
export const GridActivityHistoryTable = () => {
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
  const [date, setDate] = useState("");
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchActivityPoints(pageDetails.pageNumber, pageDetails.pageSize)
      .then(({ success, data: response, message }) => {
        if (success) {
          if (response?.total_documents) {
            let total = roundToNearestWholeNumber(
              response.total_documents / pageDetails.pageSize
            );
            if (total === 0) total = 1;
            setTotalPages(total);
          }
          setPointsData(response?.data);
          const columnsData = [
            {
              name: html("<center>Activity Type</center>"),
              key: "categoryInfo",
              id: "categoryInfo",
              formatter: (cell) =>
                _(
                  <span className="d-flex align-items-center">
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={cell.logo}
                    />
                    <span>{cell.name}</span>
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
              name: html("<center className='text-wrap'>Description</center>"),
              key: "description",
              id: "description",
            },
            {
              name: html(
                "<center className='text-wrap'>Points Earned</center>"
              ),
              key: "points",
              id: "points",
              formatter: (cell) =>
                _(
                  <center className="text-success">{`${cell.value}${cell.suffix}`}</center>
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
              id: "action",
              key: "categoryInfo",
              sort: false,
              formatter: (cell) => {
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
                              history(`/transaction-list/${cell.id}`);
                            }}
                          >
                            <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                            View
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
  }, [pageDetails]);

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
                      data: pointsData?.map((data) => ({
                        ...data,
                        categoryInfo: data.categoryInfo.name,
                        description: data.description,
                        points: `${data.points.value}${data.points.suffix}`,
                      })),
                      headers: pointsData.length
                        ? Object.keys(pointsData[0])
                        : [],
                      filename: "activity-points.csv",
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
            {/* <UncontrolledDropdown className="">
              <DropdownToggle
                className=" ms-1 btn btn-soft-success border btn-sm px-1"
                style={{ height: "fit-content", lineHeight: "1.2" }}
              >
                <i className="bx bx-dots-vertical-rounded fs-5 m-0"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <TableActivityHistoryFilters
                  date={date}
                  setDate={date}
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
              selector: (cell) =>
                cell?.name || cell?.description || cell?.value || cell,
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
            onError={(error) => {
              console.log(error, "check");
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
