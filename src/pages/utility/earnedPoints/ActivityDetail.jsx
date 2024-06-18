import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Progress,
  Modal,
  ModalBody,
} from "reactstrap";
// import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Alert, Button, Card, CardBody, Col, Container, Input,  ModalHeader, PopoverBody, PopoverHeader, Row, UncontrolledPopover, UncontrolledTooltip } from 'reactstrap';
import { Link } from "react-router-dom";
// import activityBg from "@/assets/images/demo/twinbg2.webp";
import activityBg from "@/assets/images/demo/sophiaBg2.jpg";
import successLogo from "@/assets/images/demo/giphy.gif";
import activity1 from "@/assets/images/brands/slack.png";
import classnames from "classnames";
import { ActivityHistoryTable } from "@/components/utility/earnedPoints/ActivityHistoryTable";
import {
  activitiesApi,
  uploadActivityApi,
  viewProfileInfo,
} from "@/api/dectecApi";
import { notify } from "../../../utils/toastify";
import Loader from "../../../components/common/Loader";

const ActivityDetail = () => {
  const history = useNavigate();
  const { activityId } = useParams();
  // let history = useHistory();
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [activeTab1, setactiveTab1] = useState("1");
  const [justifyTab, setjustifyTab] = useState("1");
  const [activityData, setActivityData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileUploaded, setfileUploaded] = useState("");
  const [points, setPoints] = useState("");
  const [userWallet, setWallet] = useState("");
  const [pageDetails, setPageDetails] = useState({
    pageNumber: 1,
    pageSize: 5,
    protocolId: "",
    clientId: "",
  });

  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }

  const [defaultCounter, setdefaultCounter] = useState(50);
  const [defaultCounterBoxes, setdefaultCounterBoxes] = useState(1);

  function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
  }

  function countDown(id, prev_data_attr) {
    if (prev_data_attr > 0) {
      id(prev_data_attr - 1);
    }
  }
  const [modal_successMessage, setmodal_successMessage] = useState(false);
  function tog_successMessage() {
    setmodal_successMessage(!modal_successMessage);
  }

  function setTimer(modal_successMessage) {
    setmodal_successMessage(modal_successMessage);
    setTimeout(() => {
      history("/activities/activity-list");
    }, 3000);
  }
  const [selectedFiles, setselectedFiles] = useState([]);
  //   const [fileArr, setFileArr] = useState([]);

  function handleAcceptedFiles(files) {
    // let file_arr = selectedFiles;
    // file_arr.push(files[0]);//one file at a time
    //for multiple uploads
    // files.map(file =>
    //   Object.assign(file, {
    //     preview: URL.createObjectURL(file),
    //     formattedSize: formatBytes(file.size),
    //   })
    // );
    //for single upload
    Object.assign(files[0], {
      preview: URL.createObjectURL(files[0]),
      formattedSize: formatBytes(files[0].size),
    });
    setselectedFiles(files);
    setfileUploaded(files[0]);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  useEffect(() => {
    setLoading(true);
    activitiesApi(
      pageDetails.pageNumber,
      pageDetails.pageSize,
      pageDetails.protocolId,
      pageDetails.clientId,
      activityId
    )
      .then((res) => {
        if (res.success) {
          console.log(res.data[0], "jj");
          setActivityData(res?.data[0]);
        } else {
          setError(message);
          console.log(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    viewProfileInfo().then(({ success, message, data }) => {
      if (success) {
        const { walletId } = data[0];
        setWallet(walletId);
        setLoading(false);
      } else {
        setError(message);
        setLoading(false);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadActivityApi({
      activityId,
      file: fileUploaded,
      points: activityData.activityPoints,
      walletId: userWallet,
    })
      .then((res) => {
        console.log(res);
        if (res.success) {
          console.log(res);
          setTimer(true);
          // notify("File uploaded successfully!", true);
          // history("/activities/activity-list");
          // location.reload();
        } else {
          console.log(res.message);
          setError(res.message);
          notify(res.message, true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        notify(error.message, true);
      })
      .finally(() => {
        // setSaving(false);
      });
  };

  return (
    <Row className="m-2">
      <Card>
        <CardBody>
          <div className="" style={{ padding: "10px" }}>
            <Form onSubmit={handleSubmit}>
              <div className="text-center">
                <h5>Code Upload Form </h5>
                <hr></hr>
              </div>
              <div>
                <div className="mb-2">
                  <Row>
                    <img
                      src={activityBg}
                      alt=""
                      style={{ height: "150px", objectFit: "cover" }}
                      className="img-fluid"
                    />
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Card className="card-body mb-0 mt-2 bg-soft-warning">
                        <div className="d-flex mb-2 align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src={activity1}
                              alt=""
                              className="avatar-sm rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <h5 className="card-title mb-1">
                              {activityData.activityName}
                            </h5>
                            <p className="text-muted mb-0">
                              {activityData.activityDescription}
                            </p>
                          </div>
                        </div>
                        {/* <h6 className="mb-1">$15,548</h6>
                            <p className="card-text text-muted">Expense Account</p>
                            <Link to="#" className="btn btn-primary btn-sm">See Details</Link> */}
                      </Card>
                      <Card>
                        <CardHeader className="card-header">
                          <h4 className="card-title mb-0">Code Upload</h4>
                        </CardHeader>
                        <CardBody>
                          <p className="text-success">
                            {activityData.activityName} to earn{" "}
                            <strong className="text-warning">
                              {activityData.activityPoints} SOPH
                            </strong>{" "}
                            points
                          </p>
                          {loading ? (
                            <Loader />
                          ) : (
                            <Dropzone
                              onDrop={(acceptedFiles) => {
                                handleAcceptedFiles(acceptedFiles);
                              }}
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone dz-clickable">
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <div className="mb-3">
                                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                    </div>
                                    <h4>Drop file here or click to upload.</h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                          )}
                          <div
                            className="list-unstyled mb-0"
                            id="file-previews"
                          >
                            {selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        {/* <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong><button data-dz-remove="" className="btn btn-sm btn-danger" style={{float:'right'}}>Delete</button>
                                        </p> */}
                                        {/* <div className="flex-shrink-0 ms-3">                                                        
                                            <button data-dz-remove="" className="btn btn-sm btn-danger">Delete</button>
                                        </div> */}
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <button
                    type="submit"
                    className="mx-auto px-auto btn btn-primary waves-effect waves-light"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Information"}
                  </button>
                  {/*onClick={() => setTimer(true)}*/}
                </div>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
      {/* <ActivityHistoryTable/>  */}
      <Modal
        id="success-Payment"
        tabIndex="-1"
        isOpen={modal_successMessage}
        toggle={() => {
          tog_successMessage();
        }}
        centered
      >
        <ModalBody className="text-center p-5">
          <div className="text-end">
            <button
              type="button"
              onClick={() => {
                tog_successMessage();
              }}
              className="btn-close text-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-2">
            <img
              src={successLogo}
              style={{ width: "150px", height: "150px" }}
            />
            <h4 className="mb-3 mt-2">Points Earned Successfully</h4>
            <p className="text-muted fs-15 mb-4">
              You have earned {activityData.activityPoints} points for your
              activity. Complete More challenges to earn more points
            </p>
            <div className="hstack gap-2 justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => history("/dashboard")}
              >
                Go To dashboard
              </button>
              <p className="text-align-middle m-2">Redirecting in....</p>
              {/* <button className="btn btn-soft-success" ><i className="ri-links-line align-bottom"></i> Go to dashboard</button> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Row>
  );
};
export default ActivityDetail;
