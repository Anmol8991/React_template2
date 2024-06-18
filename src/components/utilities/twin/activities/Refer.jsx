import React, { useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import refer from "@/assets/images/demo/referNew.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import successLogo from "@/assets/images/demo/giphy.gif";
import ConfirmActivity from "../../../common/ConfirmActivity";

const Refer = () => {
  const navigate = useNavigate();
  const [referralDetails, setReferralDetails] = useState({
    name: "",
    email: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      html:
        "<img src=" +
        `${successLogo}` +
        ' style="width:100px ;height:100px" />' +
        '<h3 style="color:#424345">Points Earned Successfully</h3>' +
        '<p className="text-muted fs-5 mb-4">Mail has been sent to your friend.' +
        " Once he/she registers then you will get <b>10</b> Points." +
        " Complete More challenges to earn more points" +
        "</p>",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: "OK",
    });
  };
  const changeHandler = (e) => {
    setReferralDetails({ ...referralDetails, [e.target.name]: e.target.value });
  };
  return (
    <Row className="px-2 align-items-center w-100">
      <Col md={8} className="h-100 d-flex justify-content-center">
        <img
          src={refer}
          className="w-75 h-100"
          style={{ objectFit: "contain" }}
        />
      </Col>
      <Col md={4} className="h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <div className="py-2 d-flex flex-column align-items-center gap-3 w-100">
              <div className="w-100">
                <h3 htmlFor="">Refer your friends</h3>
                <p className="text-muted">
                  Invite your friends by entering their name and email, then
                  simply hit send. Once they sign-up using your referral link, you will get 10 points.
                </p>
                <div className="d-flex justify-content-between flex-column gap-3 w-100">
                  <Row lg={12} className="d-flex justify-content-between">
                    <Col>
                      <div className="">
                        <Label
                          htmlFor="firstnameInput"
                          className="form-label fs-5 "
                        >
                          Name <span className="text-primary">*</span>
                        </Label>
                        <Input
                          type="text"
                          required
                          className="form-control py-25 bg-light"
                          id="nameInput"
                          placeholder="Enter Friend's Name"
                          name="name"
                          value={referralDetails.name}
                          onChange={changeHandler}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
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
                          className="form-control  py-25 bg-light"
                          id="nameInput"
                          placeholder="Enter Friend's Email"
                          name="email"
                          value={referralDetails.email}
                          onChange={changeHandler}
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
            points={10}
            activityId={"64889133d6a78f09ba134f81"}
            taskText={"for referring"}
            apiPayload={referralDetails}
          />
          <div className="d-flex justify-content-end gap-3 mt-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-light "
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={
                referralDetails.name.length === 0 ||
                referralDetails.email.length === 0
              }
              className="btn btn-primary d-flex gap-1 align-items-center justify-content-center "
            >
              <span>Send</span>
              <i className="bx bx-send "></i>
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Refer;
