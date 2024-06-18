import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import RedeemedAmount from "@/components/utilities/twin/Dashboard/RedeemedAmount";
import ClientRevenue from "@/components/utilities/twin/Dashboard/ClientRevenue";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ActivityHistoryTable } from "@/components/utility/earnedPoints/ActivityHistoryTable";
import { RedemptionHistoryTable } from "@/components/utility/Redemption/RedemptionHistoryTable";
import { lastActivity } from "@/data/utility/data";
import { dashboardWidgets } from "@/data/utility/data";
import { dectectViewUserWidgetData } from "@/utils/createWidgetData";
import sophiaverse1 from "@/assets/images/demo/sophia5.png";
import { fetchLastActivity } from "@/api/dectecApi";
import { WidgetList } from "@/components/common/WidgetList";
import { viewProfileInfo } from "@/api/dectecApi";
import Loader from "@/components/common/Loader";
import { GridActivityHistoryTable } from "@/components/utilities/twin/earnedPoints/GridActivityHistoryTable";
import GridRedemptionTable from "@/components/utilities/twin/Redemption/GridRedemptionTable";
import { categoriesApi } from "@/api/dectecApi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import amazon from "@/assets/images/demo/amazonGv.png";
import starbucks from "@/assets/images/demo/starbucksGC.png";
import spotify from "@/assets/images/demo/spotifyGC2.jpg";
import target from "@/assets/images/demo/targetGC.jpg";
import event from "@/assets/images/demo/eventPass.jpg";

import {
  getActivityRoutes,
  truncateDescription,
} from "../../../utils/commonHelper";

const Dashboard = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [lastactivity, setlastActivity] = useState([]);
  const [userWidgetData, setUserWidgetData] = useState([]);
  const [userClientImage, setUserClientImage] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const activebtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  //last activity
  useEffect(() => {
    setLoading(true);
    fetchLastActivity()
      .then((res) => {
        if (res.success) {
          setlastActivity(res?.data);
        } else {
          setError(res?.message);
          console.log(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    viewProfileInfo()
      .then((res) => {
        if (res.success) {
          console.log(res.data[0], "res");
          const newData = dectectViewUserWidgetData(res?.data[0]);
          setUserWidgetData(newData);
          setUserClientImage(res?.data[0].clientLogo);
        } else {
          console.log(res?.message);
          setError(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //activities
  useEffect(() => {
    setLoading(true);
    categoriesApi()
      .then((res) => {
        if (res.success) {
          setCategoryData(res?.data);
        } else {
          setError(res?.message);
          console.log(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //redemptions
  const featuredNFTData = [
    {
      id: 1,
      img: amazon,
      likes: "200",
      title: "Amazon",
      category: "Gift Card", //type of redemption
      highest: "10.35ETH",
      price: "$10",
    },
    {
      id: 2,
      img: starbucks,
      likes: "500",
      title: "Starbucks",
      category: "Gift Card",
      highest: "75.3ETH",
      price: "$30",
    },
    {
      id: 3,
      img: spotify,
      likes: "700",
      title: "Spotify",
      category: "Gift Card",
      highest: "9.64ETH",
      price: "$40",
    },
    {
      id: 4,
      img: target,
      likes: "400",
      title: "Target",
      category: "Gift Card",
      highest: "2.75ETH",
      price: "$20",
    },
    {
      id: 5,
      img: event,
      likes: "450",
      title: "Blockchain Event Pass",
      category: "Event",
      highest: "2.75ETH",
      price: "$25",
    },
  ];

  const initialExpandedStates = Array(3).fill(false);
  const [expanded, setExpanded] = useState(initialExpandedStates);

  const handleToggle = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Row>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <Col xl={2} md={2} id="imageCardDb">
                      {loading ? (
                        <Loader />
                      ) : (
                        <img
                          className=""
                          alt="200x200"
                          width="100%"
                          style={{ maxHeight: "8rem", objectFit: "contain" }}
                          src={userClientImage ? userClientImage : ""} //sophiaverse1
                        ></img>
                      )}
                    </Col>
                    <WidgetList widgetsData={userWidgetData} xl={3} md={6} />
                  </>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="d-flex pt-2 pb-3">
                    <span className="d-flex justify-content-between w-100 align-items-center">
                      <h5 className="card-title fs-18 mb-1">Earn Points </h5>
                      <Link to="/activities" className="text-info">
                        View All
                      </Link>
                    </span>
                  </div>
                  <Swiper
                    modules={[Navigation, Autoplay]} //
                    slidesPerView={1}
                    spaceBetween={8}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                      420: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                      },
                      520: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                      },
                    }}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      pauseOnMouseEnter: true,
                      disableOnInteraction: false,
                    }}
                    className="mySwiper marketplace-swiper rounded gallery-light"
                  >
                    <div className="swiper-wrapper">
                      {categoryData.map((item, key) => (
                        <SwiperSlide key={key}>
                          <div
                            className="card explore-box card-animate rounded"
                            style={{ height: "320px" }}
                          >
                            <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                              <button
                                type="button"
                                className="btn btn-icon active"
                                data-bs-toggle="button"
                                aria-pressed="true"
                              >
                                <i className="mdi mdi-cards-heart fs-16"></i>
                              </button>
                            </div>
                            <div
                              className="explore-place-bid-img"
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
                              <h5 className="mb-1">
                                <Link
                                  className="text-dark"
                                  to={getActivityRoutes(item?.categoryInfo)}
                                >
                                  {item?.categoryInfo?.name}
                                </Link>
                              </h5>
                              <p className="text-muted mb-0">
                                {expanded[key]
                                  ? item.categoryDescription
                                  : truncateDescription(
                                      item.categoryDescription
                                    )}
                                <span
                                  className="text-secondary fs-6  float-end cursor-pointer"
                                  onClick={() => handleToggle(key)}
                                >
                                  {expanded[key] ? "See less" : "See more"}
                                </span>
                              </p>
                            </CardBody>
                            <div className="card-footer border-top border-top-dashed">
                              <div className="d-flex align-items-center justify-content-center">
                                <h5 className="flex-shrink-0 fs-14 text-primary mb-0 ">
                                  <Link
                                    className="btn btn-info "
                                    to={getActivityRoutes(item?.categoryInfo)}
                                  >
                                    <i className="ri-coin-fill align-bottom me-1"></i>{" "}
                                    Earn Points
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="swiper-button-next"></div>
                      <div className="swiper-button-prev"></div>
                    </div>
                  </Swiper>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="d-flex pt-2 pb-3">
                <h5 className="card-title fs-18 mb-1">Redeem Your Points</h5>
              </div>
              <Swiper
                modules={[Navigation, Autoplay]} //
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  420: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                  },
                  520: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  reverseDirection: true,
                  disableOnInteraction: false,
                }}
                className="mySwiper marketplace-swiper rounded gallery-light"
              >
                <div className="swiper-wrapper">
                  {featuredNFTData.map((item, key) => (
                    <SwiperSlide key={key}>
                      <div
                        className="card explore-box card-animate rounded"
                        style={{ height: "280px" }}
                      >
                        <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                          <button
                            type="button"
                            className="btn btn-icon active"
                            data-bs-toggle="button"
                            aria-pressed="true"
                          >
                            <i className="mdi mdi-cards-heart fs-16"></i>
                          </button>
                        </div>
                        <div
                          className="explore-place-bid-img"
                          style={{ height: "75%" }}
                        >
                          <img
                            src={item.img}
                            alt=""
                            className="img-fluid card-img-top explore-img h-100 w-100 object-fit-cover"
                          />
                          <div className="bg-overlay"></div>
                        </div>
                        <CardBody className="pb-2">
                          {item.id == 5 ? (
                            <p className="fw-medium mb-0 float-end">
                              <i className="bx bx-coin-stack text-warning align-middle"></i>{" "}
                              {item.likes}{" "}
                            </p>
                          ) : (
                            <p className="fw-medium mb-0 float-end">
                              <i className="bx bx-coin-stack text-warning align-middle"></i>{" "}
                              {item.likes}{" "}
                            </p>
                          )}
                          <h5 className="mb-1">
                            <Link to="/apps-nft-item-details">
                              {item.title}
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">{item.category}</p>
                        </CardBody>
                        {/* <div className="card-footer border-top border-top-dashed"> */}
                        <div className="d-flex align-items-center px-3 pb-3">
                          <div className="flex-grow-1 fs-14">
                            <h5 className="flex-shrink-0 fs-4 text-success mb-0">
                              {item.price}
                            </h5>
                          </div>
                          <div className="place-bid-btn">
                            <Link to="#!" className="btn btn-info">
                              <i className="ri-gift-line align-bottom me-1"></i>{" "}
                              Redeem Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </Swiper>
            </Col>
          </Row>
          <Row>
            <Col lg={7}>
              <ClientRevenue />
            </Col>
            <Col lg={5}>
              <RedeemedAmount />
            </Col>
          </Row>
          <Row className="">
            <Col lg={12}>
              <Card>
                <CardHeader className="border-1">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1 text-dark">
                      Activity History
                    </h5>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  {/* <ActivityHistoryTable /> */}
                  <GridActivityHistoryTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="">
            <Col lg={12}>
              <Card>
                <CardHeader className="border-1">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1 text-dark">
                      Redemption History
                    </h5>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  {/* <RedemptionHistoryTable /> */}
                  <GridRedemptionTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
