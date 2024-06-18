import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { fetchClientList, fetchProtocols } from "../../../api/dectecApi";
import { notify } from "../../../utils/toastify";

const TableFilters = ({
  protocol,
  setProtocol,
  setClient,
  date,
  setDate,
  client,
}) => {
  const categories = [
    "Learn to Earn",
    "Refer a Friend",
    "Attend an event",
    "Upload a Document",
  ];

  return (
    <>
      <div style={{ zIndex: 1000, top: "2rem", width: "300px" }}>
        <div className="w-100 bg-light  p-4 rounded-3 mt-3">
          <h3>Filters</h3>

          <Row>
            <Col xl={12} className="my-2">
              <label htmlFor="idStatus">Activity Types</label>
              <div className="">
                <select
                  className="form-control text-gray cursor-pointer"
                  data-choices
                  data-choices-search-false
                  name="choices-single-default"
                  id="idStatus"
                  value={protocol}
                  defaultValue=""
                  onChange={(e) => setProtocol(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Type
                  </option>
                  {categories.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>

            <Col xl={12} className="pt-3 text-end">
              <button
                className="btn d-flex align-items-center btn-outline-info me-2 btn-sm"
                onClick={() => {
                  setProtocol("");
                  setClient("");
                }}
              >
                <i className="bx bx-x fs-4"></i>
                Clear Filters
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TableFilters;
