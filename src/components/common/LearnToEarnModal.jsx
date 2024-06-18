import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, Input, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import successLogo from "@/assets/images/demo/giphy.gif";
import YouTube from "react-youtube";

import Swal from "sweetalert2";
import ConfirmActivity from "./ConfirmActivity";

const LearnToEarnModal = ({
  showModal,
  setShowModal,
  modalData,
  activityId,
}) => {
  const history = useNavigate();
  const [checked, setChecked] = useState(false);
  const [disableStatus, setDisableStatus] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const iframeRef = useRef(null);
  //detect click on iframe
  useEffect(() => {
    let interval = window.setInterval(trackClick, 100);
    let i = 0;
    function trackClick() {
      if (document.activeElement === iframeRef.current) {
        i++;
        setDisableStatus(false);
        window.focus();
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAnchorClick = (event) => {
    setDisableStatus(false);
  };
  const handleCheck = (event) => {
    setChecked(!checked);
    if (event.target.checked) {
      setSubmitStatus(false);
    }
  };
  function tog_successMessage() {
    setShowModal(!showModal);
  }

  const docs = [
    { uri: modalData.vid }, // Remote file
  ];

  const opts = {
    // height: '540',
    // width: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, //1
    },
  };

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  function youtube_parser(url) {
    if (url == null) return "";

    let regex =
      /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(url)[3];
  }

  return (
    <Modal size="lg" isOpen={showModal} scrollable>
      <ModalBody>
        <div className="modal-header px-3  py-1 d-flex align-items-center justify-content-between">
          <h3 className="modal-title" id="myLargeModalLabel">
            {modalData.title}
          </h3>

          <div className="d-flex align-items-center gap-2">
            <h5>
              <i className="ri-coin-fill align-bottom me-1 text-warning"></i>
              {modalData.points}
            </h5>
            <button
              type="button"
              className="btn-close mb-1"
              data-bs-dismiss="modal"
              onClick={tog_successMessage}
              aria-label="Close"
            ></button>
          </div>
        </div>
        <p className="text-dark text-wrap px-3">{modalData.updatedTime}</p>
        <div className="flex-grow-1 text-muted overflow-hidden justify-content-between align-items-center d-flex-flex-wrap">
          {modalData.media === "youtube" ? (
            <div className="d-flex align-items-center text-muted text-truncate mb-0 justify-content-center">
              <div className="w-100 p-3 justify-content-center d-flex bg-light my-2 rounded">
                {/* <img src={item.logo} alt="" height="50" class="rounded shadow" /> */}
                <div className="h-50 rounded shadow ">
                  <YouTube
                    videoId={youtube_parser(modalData.vid)}
                    opts={opts}
                    onReady={_onReady}
                    onPlay={handleAnchorClick}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center text-muted text-truncate mb-0 justify-content-center">
              <div className="w-100 p-3 justify-content-center d-flex bg-light my-1 rounded">
                <div className="h-50 rounded shadow " style={{ width: "200%" }}>
                  <iframe
                    ref={iframeRef}
                    src={modalData.vid}
                    style={{
                      display: "block",
                      position: "relative",
                      height: "80vh",
                      width: "100%",
                    }}
                    onClick={handleAnchorClick}
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          <div className="align-items-center justify-content-around">
            {/* <p className="text-dark text-wrap px-3">{modalData.updatedTime}</p> */}
          </div>
        </div>
      </ModalBody>
      <ConfirmActivity
        show={showConfirm}
        setShow={setShowConfirm}
        activityId={activityId}
        points={modalData.points}
        setLearningModal={setShowModal}
      />
      <ModalFooter className="d-flex align-items-center justify-content-between">
        <div className="text-muted p-2  d-flex aling-items-center">
          <Input
            type="checkbox"
            checked={checked}
            disabled={disableStatus}
            onClick={handleCheck}
            className="me-1 border-primary"
            id="confirmContent"
          />{" "}
          <label htmlFor="confirmContent" className="text-dark cursor-pointer">
            I have viewed the content{" "}
          </label>
          <span class="text-uppercase"></span>
        </div>
        <div className="d-flex gap-2">
          <Link
            to="#"
            className="btn btn-light  fw-medium"
            onClick={tog_successMessage}
          >
            Cancel
          </Link>
          <button
            className="btn btn-primary"
            disabled={submitStatus}
            onClick={() => setShowConfirm(true)}
          >
            Submit
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default LearnToEarnModal;
