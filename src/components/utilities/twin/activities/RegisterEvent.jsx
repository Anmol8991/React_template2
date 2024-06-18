import React, { useState } from "react";
import registerEventImg from "../../../../assets/images/demo/registerEvent.png";
import { Col, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ConfirmActivity from "../../../common/ConfirmActivity";
import { useUserContext } from "../../../../hooks/useUserContext";

const RegisterEvent = ({ data }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useUserContext();
  const [firstName, lastName] = user?.name?.split(" ")
  return (
    <Row className="px-2 align-items-center w-100">
      <Col md={6} className="h-100 d-flex flex-column justify-content-between">
        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="py-2 d-flex flex-column align-items-center gap-3 w-100">
            <div className="w-100">
              <h3 htmlFor="">Register for this event</h3>
              <p className="text-muted">
                Fill this form with your details and submit it in order to
                attend this event.
              </p>
              <div className="d-flex justify-content-between flex-column gap-3 w-100">
                <Row lg={12} className="d-flex justify-content-between">
                  <Col md={6} lg={6}>
                    <div className="">
                      <Label
                        htmlFor="firstnameInput"
                        className="form-label fs-5 "
                      >
                        First Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        type="text"
                        required
                        className="form-control py-25 bg-light"
                        id="nameInput"
                        placeholder="Enter Your First Name"
                        value={firstName}
                      />
                    </div>
                  </Col>

                  <Col md={6} lg={6}>
                    <div className="">
                      <Label
                        htmlFor="firstnameInput"
                        className="form-label fs-5 "
                      >
                        Last Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        type="text"
                        required
                        className="form-control  py-25 bg-light"
                        id="nameInput"
                        placeholder="Enter Your Last Name"
                        value={lastName}
                      />
                    </div>
                  </Col>
                </Row>
                <Row lg={12} className="d-flex justify-content-between">
                  <Col md={6} lg={6}>
                    <div className="">
                      <Label
                        htmlFor="firstnameInput"
                        className="form-label fs-5 "
                      >
                        Email <span className="text-primary">*</span>
                      </Label>
                      <Input
                        type="email"
                        required
                        className="form-control py-25 bg-light"
                        id="nameInput"
                        placeholder="Enter Your Email"
                        value={user.email}
                      />
                    </div>
                  </Col>

                  <Col md={6} lg={6}>
                    <div className="">
                      <Label
                        htmlFor="firstnameInput"
                        className="form-label fs-5 "
                      >
                        Phone No
                      </Label>
                      <Input
                        type="text"
                        required
                        className="form-control  py-25 bg-light"
                        id="nameInput"
                        placeholder="Enter Your Phone No"
                      />
                    </div>
                  </Col>
                </Row>
                <Row lg={12} className="d-flex justify-content-between">
                  <Col>
                    <div className="mb-3">
                      <Label
                        htmlFor="firstnameInput"
                        className="form-label fs-5 "
                      >
                        Address
                      </Label>
                      <Input
                        type="textarea"
                        required
                        className="form-control py-25 bg-light"
                        id="nameInput"
                        placeholder="Enter Your Address"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <ConfirmActivity
          show={showConfirm}
          setShow={setShowConfirm}
          points={data?.activityPoints}
          activityId={data?.activityId}
        />
        <div className="d-flex gap-3 justify-content-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-light "
          >
            Cancel
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-primary "
          >
            Register
          </button>
        </div>
      </Col>
      <Col md={6} className="h-100 d-flex justify-content-center">
        <img
          src={registerEventImg}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
        />
      </Col>
    </Row>
  );
};

export default RegisterEvent;
