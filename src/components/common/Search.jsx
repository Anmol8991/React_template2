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

const Search = () => {
  const [isStatus, setisStatus] = useState("All");

  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }

  return (
    <React.Fragment>
      <Col lg={3} sm={4}>
        <Flatpickr
          className="form-control"
          placeholder="Select Date Range"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />
      </Col>

      <Col xxl={1} sm={4}>
        <button type="button" className="btn btn-primary w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
        </button>
      </Col>
    </React.Fragment>
  );
};

export default Search;
