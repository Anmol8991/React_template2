import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { recentOrders } from "@/data/protocol/index";
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";
import wire from "@/assets/images/demo/wire.jpg";

const RecentOrders = () => {
  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
  const history = useNavigate();
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Top 10 Redemptions
          </h4>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                history("/redemption");
              }}
              className="btn btn-soft-info "
            >
              view all
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Points</th>
                  <th scope="col">Amount($)</th>
                  <th scope="col">Trx Hash</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders || []).map((item, key) => {
                  function hashme(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                  }

                  const hash1 = hashme(1000, 9999);
                  const hash2 = hashme(1000, 9999);
                  return (
                    <tr key={key}>
                      <td>
                        {item.clientImg && item.clientName ? (
                          <div className="d-flex align-items-center">
                            <img
                              src={item.clientImg}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {item.clientName}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <img
                              src={sophia}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            Individual
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={item.userImg}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.userName}</div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            "badge badge-border badge-soft-" + item.statusClass
                          }
                        >
                          {item.type}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark">{item.points}</span>
                      </td>
                      <td>
                        <span className="text-success">
                          {item.amount / 100}{" "}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center">
                            <img
                              src={wire}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            <a href={scanLink} className="text-info p-0">
                              {`0X${hash1}.....${hash2}`}
                            </a>
                          </div>

                          <span
                            role="button"
                            className="fa-layers text-gray fa-fw p-0"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RecentOrders;
