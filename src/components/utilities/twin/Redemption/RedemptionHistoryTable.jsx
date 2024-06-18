import React from "react";
import { Grid, _ } from "gridjs-react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import wire from "@/assets/images/demo/wire.jpg";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FeatherIcon from "feather-icons-react";
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import { redemptionData } from "@/data/utility/data";
import { truncateString } from "../../../../utils/commonHelper";
const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

export const RedemptionHistoryTable = () => {
  document.title = "Dashboard | Mindplex ";

  const handleCopyClick = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
      setTimeout(() => {
        notify("Copied to clipboard", true);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      notify("Failed to copy", false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0 flex-grow-1">
          {" "}
          <i className="bx bx-history"></i> Redemption History
        </h4>
      </CardHeader>
      <CardBody>
        <div id="table-gridjs">
          <Grid
            data={redemptionData}
            columns={[
              { name: "S.No.", width: "70px" },
              { name: "Date", width: "100px" },
              {
                name: "Type",
                width: "200px",
                formatter: (cell) =>
                  _(
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center">
                        {cell == "Gift Card" && (
                          <img
                            src={activity1}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {cell == "Event" && (
                          <img
                            src={activity2}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {cell == "Donation" && (
                          <img
                            src={activity3}
                            alt=""
                            className="avatar-xxs rounded-circle me-2"
                          />
                        )}
                        {`${cell}`}
                      </div>
                    </div>
                  ),
              },
              {
                name: "Amount",
                width: "270px",
                formatter: (cell) =>
                  _(
                    <div
                      style={{ fontWeight: "bold" }}
                      className=" text-danger"
                    >
                      {cell}{" "}
                    </div>
                  ),
              },
              {
                name: "Points Redeemed",
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
              {
                name: "Trx Hash",
                width: "250px",
                formatter: (cell) =>
                  _(
                    <center className="text-info cursor-pointer">
                      <a
                        href={scanLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateString(cell)}
                      </a>
                      <span
                        role="button"
                        className="fa-layers text-gray fa-fw ms-1 p-0"
                      >
                        <FontAwesomeIcon
                          icon={faCopy}
                          onClick={() => handleCopyClick(cell)}
                        />
                      </span>
                    </center>
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
