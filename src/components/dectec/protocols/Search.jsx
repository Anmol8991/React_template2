import React, { useState } from "react";
import { Col } from "reactstrap";

import Flatpickr from "react-flatpickr";

import ExportButtons from "@/components/common/ExportButtons";
import { CustomButton } from "../../common/CustomButton";

const Search = () => {
  const [isStatus, setisStatus] = useState("All");
  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }
  return (
    <React.Fragment>
      <Col lg={2} sm={4}>
        <label htmlFor="idStatus">Select Date Range</label>
        <Flatpickr
          className="form-control"
          placeholder="Select Date Range"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />
      </Col>

      <Col lg={3} sm={4}>
        <label htmlFor="idStatus">Protocols</label>
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option defaultValue="protocols">Protocols</option>
            <option value="PERK">PERK</option>
            <option value="SophiaDao">SophiaDao</option>
            <option value="DOPE">DOPE</option>
            <option value="DeReal">DeReal</option>
            <option value="DVNet">DVNet</option>
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
      <Col xs={3} sm={2} lg={1}>
        <label htmlFor="idStatus">Clear</label>
        <CustomButton
          btnText=""
          btnClassNames="btn btn-danger w-75"
          btnIcon={<i className="ri-filter-fill me-1 align-bottom" />}
        />
      </Col>
      <Col lg={2}>
        <ExportButtons />
      </Col>
    </React.Fragment>
  );
};

export default Search;
