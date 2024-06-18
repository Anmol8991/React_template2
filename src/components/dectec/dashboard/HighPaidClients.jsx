import SimpleBar from "simplebar-react";
import CountUp from "react-countup";
import { highPaidClients } from "../../../data/dectec/data/highPaidClients";
import { CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
const HighPaidClients = () => {
  return (
    <Card>
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">High Paid Clients </h4>
        <div className="flex-shrink-0">
          <div>
            <button
              type="button"
              className="btn btn-soft-primary btn-sm shadow-none"
            >
              See All
            </button>
          </div>
        </div>
      </div>

      <CardBody>
        <div className="table-responsive table-card">
          <SimpleBar style={{ maxHeight: "465px" }}>
            <table className="table table-borderless align-middle">
              <tbody>
                {highPaidClients.reverse().map((item, key) => (
                  <tr key={key}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt=""
                          className="avatar-sm rounded-circle"
                        />
                        <div className="ms-3">
                          <Link to="#!">
                            <h6 className="fs-15 mb-1">{item.title}</h6>
                          </Link>
                          <p className="mb-0 text-muted">
                            <span className="counter-value">
                              <CountUp
                                start={0}
                                end={item.sales}
                                separator={","}
                                duration={4}
                              />
                            </span>{" "}
                            Points Left
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <Link to="#!">
                        <h6 className="fs-15 mb-1">
                          $
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              end={item.collection / 10000}
                              decimals={2}
                              separator={","}
                              duration={4}
                            />
                          </span>
                          M +
                        </h6>
                      </Link>
                      <p className="mb-0 text-muted">Total USD</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SimpleBar>
        </div>
      </CardBody>
    </Card>
  );
};

export default HighPaidClients;
