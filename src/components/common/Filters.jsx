import React from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import { Flatpickr } from "react-flatpickr";

const Filters = () => {
  return (
    <React.Fragment>
      <Modal tabIndex="-1" isOpen={true} toggle={() => {}} top-right>
        <ModalBody>
          {/* <Col lg={2} sm={4}>
            <label htmlFor="idStatus">Select Date Range</label>
            <Flatpickr
              className="form-control"
              placeholder="Select Date Range"
              options={{
                mode: "range",
                dateFormat: "d M, Y",
              }}
            />
          </Col> */}
          <Col lg={2} sm={4}>
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
                <option value="Open">PERK</option>
                <option value="Inprogress">SophiaDao</option>
                <option value="Closed">DOPE</option>
                <option value="New">DeReal</option>
                <option value="New">DVNet</option>
              </select>
            </div>
          </Col>

          <Col lg={2} sm={4}>
            <label htmlFor="idStatus">Clients</label>
            <div className="input-light">
              <select
                className="form-control"
                data-choices
                data-choices-search-false
                name="choices-single-default"
                id="idStatus"
              >
                <option defaultValue="clients">Clients</option>
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Filters;
