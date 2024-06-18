import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
  Modal,
  ModalBody,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/common/Loader";
import successLogo from "@/assets/images/demo/giphy.gif";
import { truncateDescription } from "../../utils/commonHelper";

const UploadsCard = ({ data }) => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [selectedTrainingData, setSelectedTrainingData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter(
    (item) =>
      item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.activityDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="d-flex pt-2 pb-3">
            <span className="d-flex justify-content-between w-100 align-items-center">
              <Col lg={12} className="d-flex justify-content-lg-end">
                <div className="search-box">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={handleSearch}
                    value={searchQuery}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Col>
            </span>
          </div>
          <Row>
            {(filteredData || []).map((item, key) => (
              <Col xxl={3} sm={4} key={key}>
                <Card className={``}>
                  <CardBody className="p-4 bg-light shadow-lg">
                    <div className="d-flex">
                      <div className="flex-grow-1 text-muted overflow-hidden">
                        <h5 className="fs-14 text-truncate">
                          <Link to="/register-event" className="text-dark">
                            {item.activityName}
                          </Link>
                        </h5>
                        <p
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "38px",
                          }}
                        >
                          {truncateDescription(item.activityDescription)}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex mt-4">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <>
                            <Button
                              className="btn-info"
                              onClick={() =>
                                history(
                                  `/activities/upload-data/${item.activityId}`
                                )
                              }
                            >
                              Upload Data
                            </Button>
                            <div>
                              <i className="ri-coin-fill align-bottom me-1 text-warning"></i>
                              {item.activityPoints}
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default UploadsCard;
