import React, { useState, useEffect } from "react";

import CountUp from "react-countup";
import DonutChart from "../../common/charts/DonutChart";

import { fetchDashboardProtocolRevenue } from "../../../api/dectecApi";
import Loader from "../../common/Loader";
import ErrorBox from "../../common/ErrorBox";

const ProtocolRevenue = () => {
  // const { setLoading, setDashboardProtocolRevenue, setError, data } =
  //   useDataContext();

  // const { loading, error, dashboardProtocolRevenue } = data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(`$${0}K`);
  const [dashboardProtocolRevenue, setDashboardProtocolRevenue] =
    useState(null);
  useEffect(() => {
    setLoading(true);
    fetchDashboardProtocolRevenue()
      .then((res) => {
        if (res.success) {
          setDashboardProtocolRevenue(res?.data);
          setTotalRevenue(
            `${res?.data[0]?.totalRevenue?.prefix}${res?.data[0]?.totalRevenue?.value}${res?.data[0]?.totalRevenue?.suffix}`
          );
        } else {
          setError(res?.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const donutChartData = {
    series:
      dashboardProtocolRevenue &&
      dashboardProtocolRevenue[0]?.protocolData?.map((item) => {
        return item?.totalAmount?.value;
      }),
    labels:
      dashboardProtocolRevenue &&
      dashboardProtocolRevenue[0]?.protocolData?.map((item) => {
        return item?.protocolInfo?.name;
      }),
  };

  const protocolData = dashboardProtocolRevenue
    ? dashboardProtocolRevenue[0]?.protocolData?.map((protocol) => {
        const protocolName = protocol.protocolInfo.name;
        const protocolValue = protocol.totalAmount.value;
        const protocolLogo = protocol.protocolInfo.logo;
        return {
          name: protocolName,
          value: protocolValue,
          logo: protocolLogo,
        };
      })
    : [];

  // const donutChartData = {
  //   series: [12.34, 23.45, 21.34, 13.45, 9.56],
  //   labels: ["PERK", "SophiaDao", "DeReal", "DVNet", "DOPE"],
  // };

  // const chartData = donutChartData.series;

  // const ogprotocolData = [
  //   {
  //     name: "PERK",
  //     value: chartData[0],
  //     logo: protocol,
  //   },
  //   {
  //     name: "SophiaDao",
  //     value: chartData[1],
  //     logo: sophiaDao,
  //   },
  //   {
  //     name: "DeReal",
  //     value: chartData[2],
  //     logo: dereal,
  //   },
  //   {
  //     name: "DVNet",
  //     value: chartData[3],
  //     logo: devnet,
  //   },
  //   {
  //     name: "DOPE",
  //     value: chartData[4],
  //     logo: dope,
  //   },
  // ];

  return (
    <div className="h-100">
      <div className="card card-height-100">
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-3 flex-grow-1 mt-3 text-dark">
            Protocol Revenue
          </h4>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorBox error={error} />
        ) : (
          <div className="card-body">
            <DonutChart
              totalRevenue={totalRevenue}
              series={donutChartData.series ?? []}
              labels={donutChartData.labels ?? []}
              height={224}
              dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success", "--vz-secondary"]'
            />

            <ul className="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
              {protocolData?.map((element, index) => {
                return (
                  <li key={index} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={element.logo}
                          alt=""
                          className="rounded-circle avatar-xs shadow"
                        ></img>
                        <h6 className="mb-1">{element.name}</h6>
                      </div>

                      <div className="flex-shrink-0 text-end">
                        <h6 className="mb-1 text-success">
                          <CountUp
                            start={0}
                            prefix={"$"}
                            end={element.value}
                            duration={4}
                            suffix={" k"}
                            decimals={2}
                            decimal={"."}
                          />
                        </h6>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocolRevenue;
