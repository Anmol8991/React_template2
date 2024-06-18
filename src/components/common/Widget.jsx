import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

export const Widget = ({ item, index, xl, md, flex, className }) => {
  const history = useNavigate();

  return (
    <Col xl={xl} md={md} key={index} style={{ flex: flex }}>
      <Card
        className={`card-animate ${className}`}
        onClick={() => {
          item.link ? history(`/${item.link}`) : console.log(item.link);
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
              <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor}>
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
                      decimal={"."}
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
  );
};
