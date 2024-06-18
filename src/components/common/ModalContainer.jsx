import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";

export const ModalContainer = (props) => {
  return (
    <React.Fragment>
      <Modal tabIndex="-1" isOpen={true} toggle={() => {}} centered>
        <ModalBody className="text-center px-3">
          <div className="">
            <button
              type="button"
              onClick={() => props?.handleClose()}
              className="btn-close float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-2">
            {/* <lord-icon
              src="https://cdn.lordicon.com/tqywkdcz.json"
              trigger="hover"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon> */}
            <Card className="">
              <CardBody className="p-2">
                <Row style={{ textAlign: "left" }}>
                  <Col lg={12} className="my-3 py-3">
                    <h3>{props.heading}</h3>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => props?.handleClose()}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-soft-dark"
                        onClick={() => props?.handleClose()}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
