import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { html } from "gridjs";
import React, { useCallback, useEffect, useState } from "react";
import { fetchRedemptionList } from "@/api/dectecApi";
import { notify } from "../../../utils/toastify";
import { Grid, _ } from "gridjs-react";
import Loader from "../../common/Loader";
import TableFilters from "./TableRedemptionFilters";
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
import TableRedemptionFilters from "./TableRedemptionFilters";

const GridRedemptionTable = ({ client, protocol }) => {
  const [redemptions, setRedemptions] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);
  // const [protocol, setProtocol] = useState(protocolid);
  // const [client, setClient] = useState(clientid);

  const [enduserId, setEnduserId] = useState(null);
  const [date, setDate] = useState(null);
  const handleCopyClick = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
      setTimeout(() => {
        notify("Copied to clipboard", true);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      notify("Failed to copy", false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRedemptionList(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      protocol,
      client
    )
      .then((res) => {
        if (res.success) {
          let total = roundToNearestWholeNumber(
            res?.data?.total_documents / pageDetails.pageSize
          );
          if (total === 0) total = 1;
          setTotalPages(total);
          setRedemptions(res?.data?.data);
          const columnsData = [
            {
              name: html("<center className='text-wrap' }>Points</center>"),
              key: "totalPoints",
              id: "totalPoints",
              formatter: (cell) =>
                _(<center className="text-success">{cell}</center>),
            },
            {
              name: html("<center className='text-wrap'>Amount</center>"),
              key: "totalAmount",
              id: "totalAmount",
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
                    ${cell}
                  </center>
                ),
            },
            {
              name: html("<center className='text-center'>Type</center>"),
              key: "type",
              id: "type",
              formatter: (cell) =>
                _(
                  <center>
                    <span
                      className={
                        cell === "Gift card"
                          ? "badge badge-border badge-soft-success"
                          : cell === "Event"
                          ? "badge badge-border badge-soft-warning"
                          : "badge badge-border badge-soft-info"
                      }
                    >
                      {cell}
                    </span>
                  </center>
                ),
            },
            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "transactionDate",
              id: "transactionDate",
              formatter: (cell) => _(<center>{cell}</center>),
            },
            {
              name: html("<center className='text-wrap'>Trx Hash</center>"),
              key: "hash",
              id: "hash",
              formatter: (hash) => {
                return _(
                  <center className="text-info cursor-pointer">
                    {truncateString(hash)}
                    <span
                      role="button"
                      className="fa-layers text-gray fa-fw ms-1 p-0"
                    >
                      <FontAwesomeIcon
                        icon={faCopy}
                        onClick={() => handleCopyClick(hash)}
                      />
                    </span>
                  </center>
                );
              },
              sort: false,
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
          <UncontrolledDropdown className="">
            <DropdownToggle tag="a" className="btn btn-outline-gray btn-sm ">
              <i className="bx bx-upload mx-1"></i> Export
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <li>
                <DropdownItem>PDF</DropdownItem>
              </li>
              <li>
                <DropdownItem>CSV</DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>{" "}
          {/* <UncontrolledDropdown className="">
            <DropdownToggle
              className=" ms-1 btn btn-soft-success border btn-sm px-1"
              style={{ height: "fit-content", lineHeight: "1.2" }}
            >
              <i className="bx bx-dots-vertical-rounded fs-5 m-0"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <TableRedemptionFilters
                // protocol={protocol}
                // setProtocol={setProtocol}
                // client={client}
                // setClient={setClient}
                date={date}
                setDate={setDate}
              />
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Grid
            columns={columns}
            search={{
              selector: (cell) =>
                cell?.protocolName ||
                cell?.clientName ||
                cell?.userName ||
                cell?.value ||
                cell,
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

export default GridRedemptionTable;
