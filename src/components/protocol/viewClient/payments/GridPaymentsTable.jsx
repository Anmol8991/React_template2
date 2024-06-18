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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { clientPaymentsApi } from "../../../../api/protocolApi.js";
import { Pagination } from "@mui/material";
import TableFilters from "../payments/TableFilters";

export const GridPaymentsTable = ({ updatePayments }) => {
  const history = useNavigate();
  const { clientId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  // const [protocol, setProtocol] = useState("");
  // const [protocolInfo, setProtocolInfo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
    protocolId: "",
  });

  const [applyFilters, setApplyFilters] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setLoading(true);
    clientPaymentsApi({ ...pageDetails, clientId })
      .then((res) => {
        const { success, data } = res;
        if (success) {
          if (data.total_documents) {
            let total = Math.floor(data.total_documents / pageDetails.pageSize);
            if (total == 0) total = 1;
            setTotalPages(total);
          }
          setPayments(res?.data?.data);
          const columnsData = [
            {
              name: html("<center>Points Bought</center>"),
              key: "points",
              id: "points",

              formatter: (points) =>
                _(
                  <center>
                    <span
                      className={
                        points.value < 30
                          ? "text-info"
                          : points.value > 60 && points.value < 99
                          ? "text-warning"
                          : points.value > 99
                          ? "text-danger"
                          : "text-danger"
                      }
                    >
                      {points.prefix} {points.value} {points.suffix}
                    </span>
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
                "<center className='text-wrap'>Amount Paid ($)</center>"
              ),
              key: "amount",
              id: "amount",
              formatter: (amount) =>
                _(
                  <center>
                    <span className="text-success">
                      {amount.prefix} {amount.value} {amount.suffix}
                    </span>
                  </center>
                ),
            },
            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "date",
              id: "date",
              formatter: (date) => _(<center>{date}</center>),
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
  }, [pageDetails, applyFilters, updatePayments]);

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
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                  >
                    <CSVLink
                      className="w-100"
                      {...{
                        data: payments?.map((data) => ({
                          ...data,
                          protocolInfo: data.protocolInfo.name,
                          clientInfo: data.clientInfo.name,
                          amount: `${data.amount.prefix}${data.amount.value}${data.amount.suffix}`,
                          points: `${data.points.prefix}${data.points.value}${data.points.suffix}`,
                        })),
                        headers: payments.length
                          ? Object.keys(payments[0])
                          : [],
                        filename: "payments.csv",
                      }}
                    >
                      CSV
                    </CSVLink>
                  </DropdownItem>
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
                <TableFilters
                  setShowModal={setShowModal}
                  setApplyFilters={setApplyFilters}
                  applyFilters={applyFilters}
                  showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  date={date}
                  setDate={date}
                />
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </div>
        </div>

        <Grid
          columns={columns}
          search={{
            selector: (cell) => cell?.name || cell?.value || cell,
          }}
          pagination={false}
          sort={true}
          style={{
            table: {
              minWidth: "100%",
              overflow: "scroll",
              whitespace: "nowrap",
              tableLayout: "auto",
              width: "auto",
            },
            th: {
              whiteSpace: "nowrap",
            },
          }}
          data={rows}
        />
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
