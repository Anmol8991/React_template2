import React from "react";
import { Grid, _ } from "gridjs-react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";
import activity5 from "@/assets/images/brands/mail_chimp.png";
import { activityListData } from "@/data/utility/data";

const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

export const ActivityTable = () => {
  document.title = "Dashboard | Mindplex ";
  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0 flex-grow-1">
          {" "}
          <i className="bx bx-history"></i> Activities
          <button type="button" className="btn btn-soft-info btn-sm float-end">
            <i className="ri-file-list-3-line align-bottom"></i> Export Report
          </button>
        </h4>
      </CardHeader>
      <CardBody>
        <div id="table-gridjs">
          <Grid
            data={activityListData}
            columns={[
              { name: "S.No.", width: "70px" },
              {
                name: "Activity",
                width: "200px",
                formatter: (cell) =>
                  _(
                    <a
                      href="/activities/upload-data"
                      style={{ pointerEvents: "auto" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          {cell == "AI Code" && (
                            <img
                              src={activity1}
                              alt=""
                              className="avatar-xxs rounded-circle me-2"
                            />
                          )}
                          {cell == "Tell us about Mindplex" && (
                            <img
                              src={activity2}
                              alt=""
                              className="avatar-xxs rounded-circle me-2"
                            />
                          )}
                          {cell == "Awareness" && (
                            <img
                              src={activity3}
                              alt=""
                              className="avatar-xxs rounded-circle me-2"
                            />
                          )}
                          {cell == "Join our business" && (
                            <img
                              src={activity4}
                              alt=""
                              className="avatar-xxs rounded-circle me-2"
                            />
                          )}
                          {cell == "Watch a Video" && (
                            <img
                              src={activity5}
                              alt=""
                              className="avatar-xxs rounded-circle me-2"
                            />
                          )}
                          {`${cell}`}
                        </div>
                      </div>
                    </a>
                  ),
              },
              { name: "Description", width: "270px" },
              {
                name: "Date",
                width: "150px",
                formatter: (cell) =>
                  _(
                    <div
                      style={{ fontWeight: "bold" }}
                      className="btn btn-soft-primary"
                    >
                      {cell}{" "}
                    </div>
                  ),
              },
              {
                name: "Points Earned",
                width: "150px",
                formatter: (cell) =>
                  _(
                    <div
                      style={{ fontWeight: "bold" }}
                      className=" text-success"
                    >
                      {cell}{" "}
                    </div>
                  ),
              },
            ]}
            search={true}
            sort={true}
            pagination={{ enabled: true, limit: 5 }}
          />
        </div>
      </CardBody>
    </Card>
  );
};
