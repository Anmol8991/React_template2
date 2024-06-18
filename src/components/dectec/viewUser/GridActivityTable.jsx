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
import { activitiesApi } from "@/api/dectecApi";
import { Pagination } from "@mui/material";
import TableActivityFilters from "./TableActivityFilters";

export const GridActivityTable = ({ client }) => {
  const history = useNavigate();
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
    pageSize: 5,
    protocolId: "",
  });

  const [applyFilters, setApplyFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    activitiesApi(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      pageDetails.protocolId,
      client
    )
      .then((res) => {
        const { success, data } = res;
        if (success) {
          if (data.total_documents) {
            let total = Math.floor(data.total_documents / pageDetails.pageSize);
            if (total == 0) total = 1;
            setTotalPages(total);
          }

          const columnsData = [
            {
              name: html("<center>Name</center>"),
              key: "activityInfo",
              id: "activityInfo",

              formatter: (activityInfo) =>
                _(
                  <span>
                    <img
                      className="avatar-xs rounded-circle me-2"
                      src={activityInfo.activityLogo}
                    />
                    {activityInfo.activityName}
                  </span>
                ),
              sort: {
                compare: (a, b) => {
                  const nameA = a.activityName.toUpperCase();
                  const nameB = b.activityName.toUpperCase();
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
              key: "activityDescription",
              id: "activityDescription",
              width: "600px",
            },
            {
              name: html("<center className='text-wrap'>Points</center>"),
              key: "activityPoints",
              id: "activityPoints",
              formatter: (activityPoints) =>
                _(<center>{activityPoints}</center>),
            },
            {
              name: html("<center className='text-wrap'>Date</center>"),
              key: "activityDate",
              id: "activityDate",
              formatter: (activityDate) => _(<center>{activityDate}</center>),
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
  }, [pageDetails, applyFilters, client]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handlePageChange = (event, value) => {
    setPageDetails({ ...pageDetails, pageNumber: value });
  };
  return (
    <>
      {/* {showModal && (
        <TableActivityFilters
          setShowModal={setShowModal}
          setApplyFilters={setApplyFilters}
          applyFilters={applyFilters}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          date={date}
          setDate={date}
        />
      )} */}
      <div className="position-relative pt-3">
        <div className="position-absolute end-0 d-flex" style={{ zIndex: 100 }}>
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
          <UncontrolledDropdown className="">
            <DropdownToggle tag="a" className="btn btn-outline-gray btn-sm ">
              <i className="bx bx-upload mx-1"></i> Export
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <li>
                <DropdownItem onClick={() => {}}>
                  {/* <CSVLink
                    {...{
                      data: data,
                      headers: [],
                      filename: "Clue_Mediator_Report.csv",
                    }}
                  >
                    PDF
                  </CSVLink> */}
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  href="#deleteOrder"
                >
                  {/* <CSVLink
                    {...{
                      data: data,
                      headers: [],
                      filename: "Clue_Mediator_Report.csv",
                    }}
                  >
                    CSV
                  </CSVLink> */}
                </DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* <span
            className=" mx-1 btn btn-soft-success border btn-sm px-1"
            style={{ height: "fit-content", lineHeight: "1.2" }}
            onClick={handleOpenModal}
          >
            <i className="bx bx-dots-vertical-rounded fs-5 m-0"></i>
          </span> */}
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
