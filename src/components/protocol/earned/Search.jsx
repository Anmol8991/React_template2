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
import ExportButtons from "@/components/common/ExportButtons";

const Search = () => {
  const [isStatus, setisStatus] = useState("All");
  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }
  return (
    <React.Fragment>
      <Col lg={2} sm={4}>
        <label htmlFor="rows">Search</label>
        <div className={"search-box "}>
          <input
            id="search-bar-0"
            type="text"
            className="form-control search /"
            placeholder={" Search here....."}
          />
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </Col>
      <Col lg={3} sm={4}>
        <label htmlFor="rows">Select Date Range</label>
        <Flatpickr
          className="form-control"
          placeholder="Select Date Range "
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />

        {/* <input className="form-control flatpickr-input" placeholder="Select Date Range " value="" type="text" readonly="readonly"></input> */}
        {/* <a className="flatpickr-input" title="toggle" data-toggle>
                    <i className="bx bx-calendar"></i>
                </a> */}
        {/* <i className="bx bx-calendar"></i> */}
      </Col>
      <Col lg={3} sm={4}>
        <label htmlFor="rows">Clients</label>
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option defaultValue="clients">All</option>
            <option value="Open">Individual</option>
            <option value="Open">AI Code</option>
            <option value="Inprogress">Huddle</option>
            <option value="Closed">Arrow Tech</option>
            <option value="New">Space Tech</option>
            <option value="New">Green Law</option>
          </select>
        </div>
      </Col>
      <Col lg={1} sm={4}>
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
      <Col lg={1} sm={4}>
        <label htmlFor="rows">Clear</label>
        <button type="button" className="btn btn-danger">
          {" "}
          <i className="ri-filter-fill me-1 align-bottom"></i>
        </button>
      </Col>
      <Col lg={2}>
        <ExportButtons />
      </Col>
    </React.Fragment>
  );
};

export default Search;
