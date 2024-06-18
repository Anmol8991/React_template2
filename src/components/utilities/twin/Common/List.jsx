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
import Loader from "../../../common/Loader";
import {
  getActivityRoutes,
  truncateDescription,
} from "../../../../utils/commonHelper";

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
          console.log(message);
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
      <Row className="mb-4">
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
          </div>
        </div>
      </Row>

      <div className="row d-flex flex-wrap gap-3 justify-content-center">
        {(filteredData || []).map((item, index) => (
          <div
            className="card shadow-lg explore-box card-animate rounded p-0"
            style={{ height: "280px", width: "300px" }}
          >
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
              <p className="fw-medium mb-0 float-end">
                <i className="bx bx-coin-stack text-warning align-middle"></i>{" "}
                {item.activityPoints}{" "}
              </p>
              <h5 className="mb-1">
                <Link
                  className="text-dark"
                  to={getActivityRoutes(item?.categoryInfo)}
                >
                  {item?.categoryInfo?.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {expanded[index]
                  ? item.categoryDescription
                  : truncateDescription(item.categoryDescription)}
                <span
                  className="text-info fw-bold float-end cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  {expanded[index] ? "See less" : "See more"}
                </span>
              </p>
            </CardBody>
            <div className="card-footer border-top border-top-dashed">
              <div className="d-flex align-items-center justify-content-center">
                <h5 className="flex-shrink-0 fs-14 text-primary mb-0 w-100">
                  <Link
                    className="btn btn-success w-100"
                    to={getActivityRoutes(item?.categoryInfo)}
                  >
                    <i className="ri-coin-fill align-bottom me-1"></i> Earn
                    Points
                  </Link>
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
