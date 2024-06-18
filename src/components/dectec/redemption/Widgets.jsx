import React, { useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper";
import TableContainer from "./TableContainer";
import { ToastContainer } from "react-toastify";

import {
  protocolRedemptionData,
  redemptionWidgets,
} from "@/data/dectec/data/data.js";
import RedemptionTable from "./RedemptionTable";

const Widgets = () => {
  const [active, setActive] = useState("All");
  const [type, setType] = useState("0");
  return (
    <React.Fragment>
      <Row className="">
        {redemptionWidgets.map((item, key) => (
          <Col key={key} md={6}>
            <Card className="card-animate">
              <CardBody>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <lord-icon
                      src={item.src}
                      trigger="loop"
                      colors="primary:#405189,secondary:#0ab39c"
                      style={{ width: "55px", height: "55px" }}
                    ></lord-icon>
                  </div>
                  <div className="flex-shrink-0">
                    {type !== "0" ? (
                      <>
                        {type === "1" && (
                          <Link
                            to="#"
                            className="badge badge-soft-warning badge-border"
                          >
                            Event
                          </Link>
                        )}
                        {type === "3" && (
                          <Link
                            to="#"
                            className="badge badge-soft-info badge-border"
                          >
                            Gift card
                          </Link>
                        )}
                        {type === "2" && (
                          <Link
                            to="#"
                            className="badge badge-soft-danger badge-border"
                          >
                            Donation
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Link
                          to="#"
                          className="badge badge-soft-warning badge-border"
                        >
                          Event
                        </Link>
                        <Link
                          to="#"
                          className="badge badge-soft-info badge-border"
                        >
                          Gift card
                        </Link>
                        <Link
                          to="#"
                          className="badge badge-soft-danger badge-border"
                        >
                          Donation
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <h3 className="mb-2">
                  <span className="counter-value" data-target="74858">
                    <CountUp
                      start={0}
                      end={item.counter}
                      separator={item.separator}
                      decimals={item.decimals}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={3}
                    />
                  </span>
                </h3>
                <h6 className="text-muted mb-0">{item.label}</h6>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Col md={12}>
        <Card>
          <CardBody className="pt-0">
            <div>
              {/* <TableContainer
                data={protocolRedemptionData}
                setActive={setActive}
                setType={setType}
                index={2}
              /> */}
              {/* <ToastContainer closeButton={false} limit={1} /> */}
              <RedemptionTable />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Widgets;
