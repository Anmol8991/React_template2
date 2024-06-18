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
  const [protocolList, setProtocolList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const protocolId = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))?._id
    : "";
  useEffect(() => {
    fetchClientList(protocolId)
      .then((res) => {
        if (res.success) {
          setClientList(res?.data);
        } else {
          notify(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ zIndex: 1000, top: "2rem", width: "300px" }}>
        <div className="w-100 bg-light  p-4 rounded-3 mt-3">
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

            <Col xl={12} className="my-2">
              <label htmlFor="idStatus">Clients</label>
              <div className="">
                <select
                  className="form-control text-gray cursor-pointer"
                  data-choices
                  data-choices-search-false
                  name="choices-single-default"
                  id="idStatus"
                  value={client}
                  defaultValue=""
                  onChange={(e) => setClient(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Clients
                  </option>
                  {clientList.map(({ _id: clientId, name: clientName }) => (
                    <option key={clientId} value={clientId}>
                      {clientName}
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
