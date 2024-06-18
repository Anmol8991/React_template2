import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const TableFilters = ({
  protocol,
  setProtocol,
  client,
  setClient,
  date,
  setDate,
}) => {
  const [protocolList, setProtocolList] = useState([]);
  const [clientList, setClientList] = useState([]);

  // useEffect(() => {
  //   fetchProtocols()
  //     .then((res) => {
  //       if (res.success) {
  //         setProtocolList(res?.data);
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   fetchClientList()
  //     .then((res) => {
  //       if (res.success) {
  //         setClientList(res?.data);
  //       } else {
  //         notify(res?.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <>
      <div style={{ zIndex: 1000, top: "2rem", width: "300px" }}>
        <div className="w-100 bg-light  p-4 rounded-3">
          <h3>Filters</h3>

          <Row>
            <Col xl={12} className="my-2">
              <label htmlFor="idStatus">Protocols</label>
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
                    Protocols
                  </option>
                  {protocolList.map(({ protocolName, protocolId }) => (
                    <option key={protocolId} value={protocolId}>
                      {protocolName}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
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
