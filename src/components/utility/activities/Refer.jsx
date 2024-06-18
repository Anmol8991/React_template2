import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import refer from "@/assets/images/demo/refer.png";
const Refer = () => {
  return (
    <div className="d-flex justify-content-around align-items-center  w-100">
      <div className="w-50">
        <img src={refer} className="w-100 rounded" />
      </div>

      <div className="h-100 d-flex flex-column justify-content-between">
        <div>
          <h2>Referral</h2>
          <p className="text-muted w-75">
            Invite your friends to TWIN. If they sign up, you will get 10 points
            for referral.
          </p>
        </div>

        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="py-2 d-flex flex-column align-items-center gap-3 w-100">
            {/* <div className="w-100">
              <label htmlFor="">Share Link</label>
              <div className="d-flex justify-content-between gap-2 w-100">
                <div className="w-75">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={"https://lorem.com/refer?89SDF8SD78/"}
                  />
                </div>
                <div >
                  <button className="btn btn-info d-flex align-items-center gap-1">
                    <i className="bx bx-share-alt"></i> Copy
                  </button>
                </div>
              </div>
            </div> */}
            {/* <div className="text-center">OR</div> */}
            <div className="w-100">
              <h5 htmlFor="">Send Invitation</h5>
              <p className="text-muted">Invite your friend via email</p>
              <div className="d-flex justify-content-between flex-column gap-3 w-100">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Enter Friend's Name"
                />
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 align-items-center">
          <button className="btn btn-primary fs-3 d-flex gap-1 align-items-center justify-content-center fs-5 w-100">
            <span>Send</span>
            <i className="bx bx-send fs-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refer;
