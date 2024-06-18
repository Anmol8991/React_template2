import React, { useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { sendEmailOtp, verifyOtp } from "../../api/authApi";
import { notify } from "../../utils/toastify";

const ForgotPassswordModal = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    sendEmailOtp({ email: forgotPasswordEmail })
      .then((res) => {
        if (res.success) {
          setEnableOtpField(true);
          notify(res.message, true);
        } else {
          notify(res.message, false);
        }
      })
      .catch((err) => {
        notify(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetPassword = () => {
    setLoading(true);
    const credentials = new URLSearchParams();
    credentials.append("email", forgotPasswordEmail);
    credentials.append("otp", otp);
    credentials.append("flag", "forgot");
    verifyOtp(credentials)
      .then((res) => {
        if (res.success) {
          notify(res.message, true);
          setShowModal(false);
        } else {
          setResetPasswordError(res.message);
        }
      })
      .catch((error) => {
        notify(error.message, false);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setResetPasswordError("");
        }, 5000);
      });
  };

  return (
    <Modal
      id="showModal"
      tabIndex="-1"
      isOpen={showModal}
      toggle={() => {
        setShowModal(!showModal);
      }}
      centered
    >
      <ModalHeader className="w-100">Reset Password</ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-4">
          <form className="d-flex gap-2">
            <input
              className="form-control py-2"
              type="email"
              placeholder="Enter Registered Email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <button
              onClick={sendOtp}
              disabled={forgotPasswordEmail === ""}
              className="btn btn-outline-secondary btn-sm fs-6"
            >
              {loading ? (
                <span>
                  <Spinner size="sm" /> Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          <form>
            <input
              type="text"
              maxLength="6"
              className="form-control mb-2 py-3"
              placeholder="Enter OTP Received on Your Email"
              disabled={!enableOtpField}
              onChange={(e) => setOtp(e.target.value)}
              onPaste={(e) => e.preventDefault()}
            />
            {resetPasswordError && (
              <span className="text-danger text-end mt-2">
                {resetPasswordError}
              </span>
            )}
          </form>
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-danger"
          color="secondary"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleResetPassword}
          disabled={!enableOtpField || !otp}
          className="btn btn-primary"
        >
          Send New Password
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ForgotPassswordModal;
