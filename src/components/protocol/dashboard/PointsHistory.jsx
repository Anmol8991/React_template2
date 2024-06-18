import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import CountUp from "react-countup";

// Import Chart
import RevenueChart from "@/components/common/charts/protocol/Revenue";
import { fetchPointsHistory } from "../../../api/protocolApi";
import ErrorBox from "../../common/ErrorBox";
import Loader from "../../common/Loader";

const PointsHistory = () => {
  const filterOptions = ["1w", "6m", "1y", "2y", "all"];
  const [dateFilter, setDateFilter] = useState("1y");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pointsHistoryData, setPointsHistoryData] = useState([]);
  const [pointsSummary, setPointsSummary] = useState({});
  useEffect(() => {
    setLoading(true);
    fetchPointsHistory(dateFilter)
      .then((res) => {
        if (res.success) {
          setPointsHistoryData(res.data.graphData);
          setPointsSummary(res.data.summary);
        } else {
          setError(res.message);
        }
      })
      .finally(() => setLoading(false));
  }, [dateFilter]);

  const { pointsBought, pointsRewarded, months } = pointsHistoryData.reduce(
    (acc, curr) => ({
      ...acc,
      pointsBought: [...acc.pointsBought, curr.totalPointsBought],
      pointsRewarded: [...acc.pointsRewarded, curr.totalPointsRewarded],
      months: [...acc.months, curr.month ?? curr.date],
    }),
    { pointsBought: [], pointsRewarded: [], months: [] }
  );

  const allPointsHistoryData = [
    {
      name: "Bought Points",
      data: pointsBought,
    },
    {
      name: "Rewarded Points",
      data: pointsRewarded,
    },
    // {
    //   name: "Remaining Points",
    //   data: [95, 35, 20, 130, 64, 22, 43, 45, 31],
    // },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col xxl={12}>
          <Card>
            <CardBody className="p-0">
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrorBox error={error} />
              ) : (
                <Row className="g-0">
                  <Col lg={12}>
                    <div className="">
                      <CardHeader className="border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Points History
                        </h4>
                        <div className="d-flex gap-1">
                          {filterOptions.map((data) => (
                            <button
                              key={data}
                              type="button"
                              className={`btn btn-sm  ${
                                dateFilter === data
                                  ? "bg-secondary text-white"
                                  : "btn-soft-secondary"
                              }  `}
                              style={{ textTransform: "uppercase" }}
                              onClick={() => setDateFilter(data)}
                            >
                              {data}
                            </button>
                          ))}
                        </div>
                      </CardHeader>
                      <Row className="g-0 text-center">
                        <Col sm={6} className="col-6">
                          <div className="p-3 border border-dashed border-start-0">
                            <h5 className="mb-1">
                              <span
                                className="counter-value"
                                data-target="36.48"
                              >
                                <CountUp
                                  start={0}
                                  end={pointsSummary.totalPointsBoughtTillNow}
                                  decimals={0}
                                  suffix={""}
                                  duration={4}
                                />
                              </span>
                            </h5>
                            <p className="text-muted mb-0">Points Bought</p>
                          </div>
                        </Col>
                        <Col sm={6} className="col-6">
                          <div className="p-3 border border-dashed border-start-0">
                            <h5 className="mb-1">
                              <span
                                className="counter-value"
                                data-target="92.54"
                              >
                                <CountUp
                                  start={0}
                                  end={pointsSummary.totalPointsRewardedTillNow}
                                  decimals={0}
                                  suffix={""}
                                  duration={4}
                                />
                              </span>
                            </h5>
                            <p className="text-muted mb-0">Points Rewarded </p>
                          </div>
                        </Col>
                        {/* <Col sm={4} className="col-6">
                        <div className="p-3 border border-dashed border-end-0">
                          <h5 className="mb-1">
                            <span className="counter-value" data-target="8.62">
                              <CountUp
                                start={0}
                                end={8.62}
                                decimals={2}
                                suffix={"k"}
                                duration={4}
                              />
                            </span>
                          </h5>
                          <p className="text-muted mb-0">Remaining Points</p>
                        </div>
                      </Col> */}
                      </Row>
                      <RevenueChart
                        series={allPointsHistoryData}
                        categories={months}
                        dataColors='["--vz-primary","--vz-success", "--vz-danger"]'
                      />
                    </div>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PointsHistory;
