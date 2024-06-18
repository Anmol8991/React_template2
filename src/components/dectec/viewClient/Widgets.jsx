import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { fetchClientOverview } from "../../../api/dectecApi";

const Widgets = (props) => {
  const history = useNavigate();
  const executeScroll = () => props.activityRef.current.scrollIntoView();
  const [clientOverview, setClientOverview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchClientOverview(props.clientId)
      .then((res) => {
        if (res.success) {
          console.log(res.data);
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(setLoading(false));
  }, []);

  const ecomWidgets = [
    {
      id: 1,
      cardColor: "info",
      label: "Amount Paid",
      counter: "165.89",
      bgcolor: "danger",
      icon: "bx bx-wallet",
      decimals: 1,
      prefix: "$",
      suffix: "",
      link: "payments",
    },
    {
      id: 2,
      cardColor: "primary",
      label: "Points Bought",
      counter: "559.25",
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: 2,
      prefix: "$",
      suffix: "",
      link: "payments",
    },
    {
      id: 3,
      cardColor: "primary",
      label: "Points Rewarded",
      counter: "1500",
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "rewards",
    },
    {
      id: 4,
      cardColor: "success",
      label: "Users",
      counter: "1987",
      bgcolor: "warning",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "users",
    },

    {
      id: 5,
      cardColor: "success",
      label: "Activities",
      counter: "3873",
      bgcolor: "primary",
      icon: "bx bx-task",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
  ];

  return (
    <React.Fragment>
      {ecomWidgets?.map((item, key) => (
        <Col lg={6} key={key}>
          <Card
            className="card-animate"
            onClick={() => {
              item.link
                ? history(`/${item.link}`)
                : item.label === "Activities"
                ? executeScroll()
                : console.log(item.link);
            }}
          >
            <CardBody>
              <div className="flex-grow-1 overflow-hidden">
                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                  {item.label}
                </p>
              </div>

              <div
                className="d-flex align-items-center"
                style={{
                  gap: "1rem",
                }}
              >
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={"avatar-title rounded fs-3 bg-" + item.bgcolor}
                  >
                    <i className={`${item.icon}`}></i>
                  </span>
                </div>

                <div className="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                      <span
                        className="counter-value text-dark"
                        data-target="559.25"
                      >
                        <CountUp
                          start={0}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          separator={item.separator}
                          end={item.counter}
                          decimals={item.decimals}
                          duration={4}
                        />
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;
