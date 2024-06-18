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

const Events = ({ data }) => {
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

  if (loading) {
    return <Loader />;
  }

  const projects = [
    {
      id: 1,
      title: "Blockchain Event 2023",
      updatedTime: "Date & Time: March 8-9, 2023, 10AM-5PM ",
      Location: "San Francisco, CA",
      badgeText: "Scheduled",
      badgeClass: "info",
      member: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
      cardBorderColor: "info",
      points: "50",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5z64wVgk5VK5M6W1AgUZ91ZyTuezgiviO72qqN_Kkg&usqp=CAU&ec=48665698",
      btnText: "Watch video",
      agreeText: "I want to attend",
      mediaType: "youtube",
    },
    {
      id: 2,
      title: "InnovateX",
      updatedTime: "Date & Time: Jan 8-9, 2023, 10AM-5PM ",
      Location: "San Francisco, CA",
      badgeText: "Attended",
      badgeClass: "success",
      member: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/",
      cardBorderColor: "success",
      points: "20",
      logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Deep-Learning-vs-Machine-Learning.jpg",
      btnText: "View content",
      agreeText: "I want to attend",
      mediaType: "doc",
    },
    {
      id: 3,
      title: "TechConvergence",
      updatedTime: "Date & Time: Sept 8-9, 2022, 10AM-5PM ",
      Location: "San Francisco, CA",
      badgeText: "Expired",
      badgeClass: "danger",
      member: "https://www.youtube.com/watch?v=7DEVfUk2zCk&pp=ygUJbWV0YXZlcnNl",
      cardBorderColor: "danger",
      points: "30",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7rpeo9KR34nJ3KvUBC1hGzKYW2JpaQFwWZEyCFKUQQ&usqp=CAU&ec=48665698",
      btnText: "Watch video",
      agreeText: "I want to attend",
      mediaType: "youtube",
    },
    {
      id: 4,
      title: "FutureForward Summit",
      updatedTime: "Date & Time: Sept 8-9, 2022, 10AM-5PM ",
      Location: "San Francisco, CA",
      badgeText: "Not attended",
      badgeClass: "primary",
      member: "https://en.wikipedia.org/wiki/Computer_multitasking",
      cardBorderColor: "primary",
      points: "30",
      logo: "https://assets.website-files.com/634681057b887c6f4830fae2/6367ddb19488542def3d98f8_6259f5f38337c78e782688ff_multitasking.png",
      btnText: "View content",
      agreeText: "I want to attend",
      mediaType: "doc",
    },
  ];
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
                <Card className="bg-transparent">
                  <CardBody className="p-4 bg-light shadow-lg">
                    <div className="d-flex">
                      <div className="flex-grow-1 text-muted overflow-hidden">
                        <h5 className="fs-14 text-truncate">
                          <Link
                            to={
                              item.eventInfo.expired ? "#" : "/register-event"
                            }
                            className="text-dark"
                          >
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
                        <div className="d-flex justify-content-between align-items-start">
                          <p className="mt-1">
                            Start Date:{" "}
                            {new Date(
                              item.eventInfo.eventStartDateTime
                            ).toLocaleDateString("en-US")}{" "}
                            <br />
                            End Date:{" "}
                            {new Date(
                              item.eventInfo.eventEndDateTime
                            ).toLocaleDateString("en-US")}
                          </p>
                          {item.eventInfo.expired ? (
                            <span className="badge badge-border text-danger">
                              Expired
                            </span>
                          ) : (
                            <span className="badge badge-border text-info">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex mt-4">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <>
                            <Button
                              disabled={item.eventInfo.expired}
                              className="btn-info"
                              onClick={() =>
                                history(`/register-event/${item.activityId}`)
                              }
                            >
                              Register event
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

export default Events;
