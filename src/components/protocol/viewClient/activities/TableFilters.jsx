import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const TableFilters = ({ showModal, setShowModal, date, setDate }) => {
  return (
    <div
      className="position-absolute  end-0 margin-auto  "
      style={{ zIndex: 1000, top: "2rem", width: "300px" }}
    >
      <div className="w-100 bg-light  p-4 rounded-3 mt-3">
        <div className="d-flex justify-content-between w-100 pb-3 align-items-center">
          <h3
            onClick={() => setShowModal(!showModal)}
            className=""
            role="button"
          >
            <i className="bx bx-x "></i>
          </h3>
          <h3>Filters</h3>
        </div>

        <Row>
          {/* <Col xl={12} className="my-2">
            <label htmlFor="idStatus">Select Date Range</label>
            <Flatpickr
              className="form-control bg-dark-gray"
              placeholder="Select Date Range"
              options={{
                mode: "range",
                dateFormat: "d M, Y",
              }}
              onChange={(e) => setDate(e)}
            />
          </Col> */}

          <Col xl={12} className="pt-3 text-end">
            <button
              className="btn btn-outline-gray me-2 btn-sm "
              // onClick={() => setShowModal(!showModal)}
            >
              Cancel
            </button>
            <button
              className="btn btn-outline-secondary btn-sm "
              onClick={() => {
                // console.log(protocol, client, date);
              }}
            >
              Apply
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TableFilters;
