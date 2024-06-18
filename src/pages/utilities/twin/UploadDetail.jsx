import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Modal,
  ModalBody,
  CardHeader,
  ModalHeader,
} from "reactstrap";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { notify } from "../../../utils/toastify";
import Loader from "../../../components/common/Loader";
import { fetchUploadFileDetail } from "../../../api/utilityApi";
import { truncateString } from "../../../utils/commonHelper";

const UploadDetail = () => {
  const { fileId } = useParams();
  document.title = "Upload Detail | TwinProtcol ";
  const iframeRef = useRef(null);

  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUploadFileDetail(fileId)
      .then((res) => {
        if (res.success) {
          console.log({ res });
          setFileData(res?.data[0]);
        } else {
          notify(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
        notify(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div id="invoiceList" className="card p-2">
                <div className="border-0 card-header">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1 text-dark">
                      Blockchain training data upload
                    </h5>
                  </div>
                </div>
              </div>
              <Row className="d-flex justify-content-between">
                <Col lg={6} className="project-card">
                  <Card style={{ height: "500px" }}>
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="text-info">{fileData?.fileName}</h5>

                        <a
                          target="_blank"
                          href={fileData?.fileUrl}
                          rel="noopener noreferrer"
                          className="btn btn-soft-info btn-sm text-dark d-flex gap-1 align-items-center"
                        >
                          <i className="bx bx-link-external fs-5"></i> View File
                          {"  "}
                        </a>
                      </div>
                    </CardHeader>
                    <CardBody className="">
                      <div className="bg-light p-3 h-100 w-100 rounded">
                        <object
                          ref={iframeRef}
                          className="rounded"
                          data={fileData?.fileUrl}
                          style={{
                            display: "block",
                            position: "relative",
                            height: "100%",
                            width: "100%",
                          }}
                        ></object>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card
                    className="rounded pb-2"
                    style={{
                      minHeight: "500px",
                      maxHeight: "max-content",
                    }}
                  >
                    <CardHeader className="fs-5">
                      <h5>File Details</h5>
                    </CardHeader>
                    <CardBody className=" d-flex justify-content-center align-items-center">
                      <div className="w-100 border-2 rounded border-start border-bottom border-end">
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">File Name</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.fileName}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">File Type</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.fileType?.toUpperCase()}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">File Size</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.fileSize?.toUpperCase()}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">Uploaded Date</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.uploadDate}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">Points Earned</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.pointsEarned}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">Activity Name</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.activityName}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">Activity Type</span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {fileData?.categoryName}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-4 flex-wrap gap-1 align-items-center border-2 border-top bg-light">
                          <span className="font-weight-600">
                            Transaction Hash
                          </span>
                          <span className="text-info white-bg border py-1 px-3 rounded-5">
                            {truncateString(fileData?.trxHashCode)}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UploadDetail;
