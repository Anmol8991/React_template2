import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { ToastContainer } from "react-toastify";

import FeatherIcon from "feather-icons-react";
import { activitiesList } from "@/data/utility/data";
import { categoriesApi } from "@/api/dectecApi";
import Loader from "../../common/Loader";
import { truncateDescription } from "../../../utils/commonHelper";

const List = () => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const activebtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };
  useEffect(() => {
    setLoading(true);
    categoriesApi()
      .then((res) => {
        if (res.success) {
          setCategoryData(res?.data);
        } else {
          setError(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = categoryData.filter(
    (item) =>
      item.categoryInfo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.categoryDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initialExpandedStates = Array(3).fill(false);
  const [expanded, setExpanded] = useState(initialExpandedStates);

  const handleToggle = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Row className="g-4 mb-3">
        <div className="col-sm-auto"></div>
        <div className="col-sm-4 ms-auto">
          <div className="d-flex justify-content-sm-end gap-2">
            <div className="search-box ms-2 col-sm-7">
              <Input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <i className="ri-search-line search-icon"></i>
            </div>

            {/* <select
              className="form-control w-md"
              data-choices
              data-choices-search-false
            >
              <option value="All">All</option>
              <option value="inprogress">Completed</option>
              <option value="Completed">inprogress</option>
            </select> */}
          </div>
        </div>
      </Row>

      <div className="row d-flex flex-wrap gap-3 justify-content-center">
        {(filteredData || []).map((item, index) => (
          // <React.Fragment key={index}>
          //   <Col xxl={3} sm={6} className="project-card">
          //     <Card className="card-height-100">
          //       <CardBody className=" card-animate">
          //         <div className="d-flex flex-column h-100">
          //           <div className="d-flex">
          //             <div className="flex-grow-1">
          //               <p className="text-muted mb-4"></p>
          //             </div>
          //             <div className="flex-shrink-0">
          //               <div className="d-flex gap-1 align-items-center">
          //                 <button
          //                   type="button"
          //                   className={`btn avatar-xs mt-n1 p-0 favourite-btn shadow-none `}
          //                   onClick={(e) => activebtn(e.target)}
          //                 >
          //                   {/* <span className="avatar-title bg-transparent fs-15">
          //                     <i className="ri-star-fill"></i>
          //                   </span> */}
          //                 </button>
          //                 <UncontrolledDropdown direction="start">
          //                   <DropdownToggle
          //                     tag="button"
          //                     className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15 shadow-none"
          //                   >
          //                     <FeatherIcon
          //                       icon="more-horizontal"
          //                       className="icon-sm"
          //                     />
          //                   </DropdownToggle>

          //                   <DropdownMenu className="dropdown-menu-end">
          //                     <DropdownItem href={"/activities/activity-detail/"+item.activityId}>
          //                       <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
          //                       View
          //                     </DropdownItem>
          //                     <div className="dropdown-divider"></div>
          //                   </DropdownMenu>
          //                 </UncontrolledDropdown>
          //               </div>
          //             </div>
          //           </div>
          //           <div
          //             className="d-flex mb-2"
          //             onClick={() => {
          //               item.link && history("/activities/activity-detail");
          //             }}
          //           >
          //             <div className="flex-shrink-0 me-3">
          //               <div className="avatar-sm">
          //                 <span
          //                   className={
          //                     "avatar-title rounded p-2 bg-soft-primary"
          //                   }
          //                 >
          //                   <img
          //                     src={item.activityLogo}
          //                     alt=""
          //                     className="img-fluid p-1"
          //                   />
          //                 </span>
          //               </div>
          //             </div>
          //             <div className="flex-grow-1">
          //               <h5 className="mb-1 fs-15">
          //                 <Link to="#" className="text-dark">
          //                   {item.activityName}
          //                 </Link>
          //               </h5>
          //               <p className="text-muted text-truncate-two-lines mb-3">
          //                 {item.activityDescription}
          //               </p>
          //             </div>
          //           </div>
          //           {/* <div className="mt-auto">
          //             <div className="d-flex mb-2">
          //               <div className="flex-grow-1">
          //                 <div>Tasks</div>
          //               </div>
          //               <div className="flex-shrink-0">
          //                 <div>
          //                   <i className="ri-list-check align-bottom me-1 text-muted"></i>{" "}
          //                   {item.number}
          //                 </div>
          //               </div>
          //             </div>
          //             <div className="progress progress-sm animated-progess">
          //               <div
          //                 className="progress-bar bg-success"
          //                 role="progressbar"
          //                 aria-valuenow="34"
          //                 aria-valuemin="0"
          //                 aria-valuemax="100"
          //                 style={{ width: item.progressBar }}
          //               ></div>
          //             </div>
          //           </div> */}
          //         </div>
          //       </CardBody>
          //       <div className="card-footer bg-transparent border-top-dashed py-2">
          //         <div className="d-flex align-items-center">
          //           <div className="flex-grow-1">
          //             <div className="avatar-group">Points : {item.activityPoints}</div>
          //           </div>
          //           <div className="flex-shrink-0">
          //             <div className="text-muted">
          //               <i className="ri-calendar-event-fill me-1 align-bottom"></i>{" "}
          //               {item.activityDate}
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </Card>
          //   </Col>
          // </React.Fragment>
          <div
            className="card explore-box card-animate rounded p-0"
            style={{ height: "280px", width: "300px" }}
          >
            {/* <div className="bookmark-icon position-absolute top-0 end-0 p-2">
              <button
                type="button"
                className="btn btn-icon active"
                data-bs-toggle="button"
                aria-pressed="true"
              >
                <i className="mdi mdi-cards-heart fs-16"></i>
              </button>
            </div> */}
            <div
              className="explore-place-bid-img w-100"
              style={{ height: "50%" }}
            >
              <img
                src={item.categoryInfo.logo}
                alt=""
                className="img-fluid card-img-top explore-img h-100 w-100 object-fit-cover"
              />
              <div className="bg-overlay"></div>
            </div>
            <CardBody>
              {/* <p className="fw-medium mb-0 float-end">
                <i className="bx bx-coin-stack text-warning align-middle"></i>{" "}
                {item.activityPoints}{" "}
              </p> */}
              <h5 className="mb-1">
                {item.categoryInfo.name === "Learning" ? (
                  <Link
                    to={`/activities/activity-page/${item.categoryInfo.id}`}
                    className="text-dark"
                  >
                    {item.categoryInfo.name}
                  </Link>
                ) : item.activityName === "Refer a friend" ? (
                  <Link
                    to={`/activities/refer-activity/${item.categoryInfo.id}`}
                    className="text-dark"
                  >
                    {item.categoryInfo.name}
                  </Link>
                ) : item.categoryInfo.name === "Events" ? (
                  <Link
                    to={`/activities/event-activity/${item.categoryInfo.id}`}
                    className="text-dark"
                  >
                    {item.categoryInfo.name}
                  </Link>
                ) : (
                  <Link
                    to={`/activities/activity-detail/${item.categoryInfo.id}`}
                    className="text-dark"
                  >
                    {item.categoryInfo.name}
                  </Link>
                )}
              </h5>
              <p className="text-muted mb-0">
                {expanded[index]
                  ? item.categoryDescription
                  : truncateDescription(item.categoryDescription)}
                <span
                  className="text-info float-end cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  {expanded[index] ? "See less" : "See more"}
                </span>
              </p>
            </CardBody>
            <div className="card-footer border-top border-top-dashed">
              <div className="d-flex align-items-center justify-content-center">
                {/* <div className="flex-grow-1 fs-6 d-flex align-items-center gap-2">
                  <i className="bx bx-calendar-event text-info fs-3"></i>
                  <span>
                    Expires on <br />
                    {item.activityDate}
                  </span>
                </div> */}
                <h5 className="flex-shrink-0 fs-14 text-primary mb-0">
                  {item.categoryInfo.name === "Learning" ? (
                    <Link
                      to={"/activities/activity-page/" + item.categoryInfo.id}
                      className="btn btn-success"
                    >
                      <i className="ri-coin-fill align-bottom me-1"></i> Earn
                      Points
                    </Link>
                  ) : item.categoryInfo.name === "Refer a friend" ? (
                    <Link
                      to={`/activities/refer-activity/${item.categoryInfo.id}`}
                      className="btn btn-success"
                    >
                      <i className="ri-coin-fill align-bottom me-1"></i> Earn
                      Points
                    </Link>
                  ) : item.categoryInfo.name === "Events" ? (
                    <Link
                      to={`/activities/event-activity/${item.categoryInfo.id}`}
                      className="btn btn-success"
                    >
                      <i className="ri-coin-fill align-bottom me-1"></i> Earn
                      Points
                    </Link>
                  ) : (
                    <Link
                      to={"/activities/activity-detail/" + item.categoryInfo.id}
                      className="btn btn-success"
                    >
                      <i className="ri-coin-fill align-bottom me-1"></i> Earn
                      Points
                    </Link>
                  )}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default List;
