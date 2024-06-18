import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, CardBody, CardHeader, Row, Col, Button, Input } from "reactstrap";
// import { recentOrders } from "./data/index.js";
import wire from "@/assets/images/demo/wire.jpg";
import { date } from "@/data/dashboardData";
import { recentOrders } from "@/data/viewActivityData";
import DataTable from "../../common/tables/DataTable";
// import { date } from "../../pages/Dashboard";
import huddleLogo from "@/assets/images/companies/img-1.png";
import biswap from "@/assets/images/demo/biswap.jpg";
import Search from "./Search";
const ActivityHistory = () => {
  const tableData = [
    {
      title: "User",
      data: [
        { value: "Sofia Cunha", img: biswap },
        { value: "Vishal Gupta", img: biswap },
        { value: "Sandhya Raj", img: biswap },
      ],
    },
    {
      title: "Date",
      data: [
        { value: "07 Dec 2011" },
        { value: "14 Mar 2022" },
        { value: "31 Jan 2023" },
      ],
    },
    {
      title: "Trx Hash",
      data: [
        { value: crypto.randomUUID(), img: huddleLogo },
        { value: crypto.randomUUID(), img: huddleLogo },
        { value: crypto.randomUUID(), img: huddleLogo },
      ],
    },
  ];

  const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Activity History
          </h4>
          <div className="flex-shrink-0"></div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col lg={12}>
                <Row className="g-3 mb-4">
                    <Search />
                </Row>
            </Col>
          </Row>
          {/* <Row> */}
            <div className="table-responsive table-card">
              <table className="table  table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">User</th>
                    <th scope="col">Date</th>
                    <th scope="col">Trx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentOrders || []).map((item, index) => {
                    function hashme(min, max) {
                      return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const hash1 = hashme(1000, 9999);
                    const hash2 = hashme(1000, 9999);
                    const randomNumber = hashme(0, 4);

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
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
                          <span className="text-dark">{date[index].date}</span>
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
            <Row className="justify-content-md-end justify-content-center align-items-center mt-3 p-2">
                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button
                            color="primary"
                        >
                            {"<"}
                        </Button>
                    </div>
                </Col>
                <Col className="col-md-auto d-none d-md-block">
                    Page{" "}
                    <strong>
                        {1} of {10}
                    </strong>
                </Col>
                <Col className="col-md-auto">
                    <Input
                        type="number"
                        min={1}
                        style={{ width: 70 }}
                        max={10}
                        defaultValue={1}
                    />
                </Col>

                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button color="primary" >
                            {">"}
                        </Button>
                    </div>
                </Col>
            </Row>
          {/* </Row> */}
        </CardBody>
        {/* <DataTable tableData={tableData} /> */}
      </Card>
    </React.Fragment>
  );
};

export default ActivityHistory;
