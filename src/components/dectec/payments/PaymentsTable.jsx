import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { html } from "gridjs";
import React, { useCallback, useEffect, useState } from "react";
import { clientPaymentsApi } from "../../../api/dectecApi";
import { notify } from "../../../utils/toastify";
import { Grid, _ } from "gridjs-react";
import Loader from "../../common/Loader";
import TableFilters from "./TableFilters";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Pagination } from "@mui/material";
import { CSVLink } from "react-csv";
import { useRef } from "react";
import {
  roundToNearestWholeNumber,
  truncateString,
} from "../../../utils/commonHelper";

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState(null);
  useEffect(() => {
    setLoading(true);
    clientPaymentsApi({
      ...pageDetails,
      protocolId: protocol,
      clientId: client,
    })
      .then((res) => {
        if (res.success) {
          let total = roundToNearestWholeNumber(
            res?.data?.total_documents / pageDetails.pageSize
          );
          if (total === 0) total = 1;
          setTotalPages(total);
          setPayments(res?.data?.data);
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
              name: html("<center className='text-wrap' }>Points</center>"),
              key: "points",
              id: "points",
              formatter: (point) =>
                _(
                  <center className="text-warning">
                    {point?.prefix}
                    {point?.value?.toFixed(point?.decimals)}
                    {point?.suffix}
                  </center>
                ),
            },
            {
              name: html("<center className='text-wrap'>Amount</center>"),
              key: "amount",
              id: "amount",
              formatter: (amount) =>
                _(
                  <center className="text-info">
                    {amount.prefix}
                    {amount?.value?.toFixed(amount.decimals)}
                    {amount.suffix}
                  </center>
                ),
            },

            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "date",
              id: "date",
              formatter: (date) =>
                _(<center className="text-success">{date}</center>),
            },
          ];
          const rowsData = res?.data?.data.reduce((acc, curr) => {
            const value = columnsData.map((item) =>
              item?.key ? curr[item.key] : item.name
            );

            return [...acc, value];
          }, []);

          setColumns(columnsData);
          setRows(rowsData);
        } else {
          notify(res.message, false);
        }
      })
      .catch((err) => {
        notify(err.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageDetails, protocol, client]);

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
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                  >
                    <CSVLink
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
                  setDate={setDate}
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

export default PaymentsTable;
