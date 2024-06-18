import React, { useState, useEffect, useRef } from "react";
import { Grid, _ } from "gridjs-react";
import { html } from "gridjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { DropdownToggle, UncontrolledDropdown } from "reactstrap";

import { useNavigate } from "react-router-dom";

import { Pagination } from "@mui/material";

import Loader from "../../../common/Loader";
import { viewActivityUsersData } from "../../../../data/viewActivityData";

export const ActivityHistoryTable = () => {
  const history = useNavigate();

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
    const columnsData = [
      {
        name: html("<center>User Info</center>"),
        key: "userInfo",
        id: "userInfo",
        formatter: (userInfo) =>
          _(
            <span className="d-flex align-items-center">
              <img
                className="avatar-xs rounded-circle mx-4"
                src={userInfo.userImg}
              />
              {userInfo.userName}
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
        name: html("<center>Date</center>"),
        key: "date",
        id: "date",
        formatter: (name) =>
          _(
            <center className="d-flex align-items-center justify-content-center">
              <span>{name}</span>
            </center>
          ),
      },

      {
        name: html("<center>Trx Hash</center>"),
        key: "trxHash",
        id: "trxHash",
        formatter: (name) =>
          _(
            <center className="d-flex align-items-center justify-content-center text-info">
              <span>{name}</span>
              <span role="button" className="fa-layers text-gray fa-fw p-0">
                <FontAwesomeIcon icon={faCopy} />
              </span>
            </center>
          ),
      },
    ];
    const rowsData = viewActivityUsersData.reduce((acc, curr) => {
      const value = columnsData.map((item) =>
        item?.key ? curr[item.key] : item.name
      );

      return [...acc, value];
    }, []);

    setColumns(columnsData);
    setRows(rowsData);
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
          count={2}
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
