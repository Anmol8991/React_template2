import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const Search = ({ index }) => {
  const [isStatus, setisStatus] = useState("All");

  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }

  const EarnedPoints = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Challenge Name", value: "Challenge Name" },
        { label: "Points", value: "Points" },
      ],
    },
  ];
  const RedeemedPoints = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Gift Card", value: "Gift Card" },
        { label: "Donation", value: "Donation" },
        { label: "Attend event", value: "Attend event" },
      ],
    },
  ];
  const Activities = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Name", value: "Name" },
        { label: "Description", value: "Description" },
        { label: "Points", value: "Points" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col lg={4} sm={4}>
        <label htmlFor="rows">Search</label>
        <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
          <input
            id="search-bar-0"
            type="text"
            className="form-control search /"
            placeholder={" Search here....."}
          />
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </Col>
      <Col lg={4} sm={3}>
        <label htmlFor="rows">Select Date Range</label>
        <Flatpickr
          className="form-control bg-light border-light"
          id="datepicker-publish-input"
          placeholder="Select Date Range"
          options={{
            altInput: true,
            altFormat: "F j, Y",
            mode: "range",
            dateFormat: "d.m.y",
          }}
        />
      </Col>
      {/* <Col sm={4} xxl={3}>
        <div className="input-light">
          <Select
            value={isStatus}
            onChange={() => {
              handleisStatus();
            }}
            options={
              index === 2
                ? EarnedPoints
                : index === 3
                ? RedeemedPoints
                : Activities
            }
            name="choices-single-default"
            id="idStatus"
          ></Select>
        </div>
      </Col> */}
      <Col lg={2} sm={2}>
        <label htmlFor="rows">Rows</label>
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="rows"
          >
            <option defaultValue="clients">10</option>
            <option value="Open">50</option>
            <option value="Inprogress">100</option>
            <option value="Closed">500</option>
          </select>
        </div>
      </Col>
      <Col lg={2} sm={2}>
        <label htmlFor="rows">Clear</label>
        <br />
        <button type="button" className="btn btn-danger ">
          {" "}
          <i className="ri-filter-fill me-1 align-bottom"></i>
        </button>
      </Col>
    </React.Fragment>
  );
};

export default Search;
