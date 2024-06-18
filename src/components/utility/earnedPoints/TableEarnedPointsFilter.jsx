import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const TableEarnedPointsFilters = ({ date, setDate }) => {
  return (
    <>
      <div style={{ zIndex: 1000, top: "2rem", width: "300px" }}>
        <div className="w-100 bg-light  p-4 rounded-3">
          <h3>Filters</h3>

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

export default TableEarnedPointsFilters;
