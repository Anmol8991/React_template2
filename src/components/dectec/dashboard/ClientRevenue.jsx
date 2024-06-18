import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import LineChart from "../../common/charts/LineChart";
import { fetchClientRevenue, fetchProtocols } from "../../../api/dectecApi";
import Loader from "../../common/Loader";
import ErrorBox from "../../common/ErrorBox";
const ClientRevenue = () => {
  const [protocolList, setProtocolList] = useState([]);
  const [protocolRevenue, setProtocolRevenue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState("");

  const getClientRevenue = async () => {
    setLoading(true);
    fetchClientRevenue(selectedProtocol)
      .then((res) => {
        if (res.success) {
          setProtocolRevenue(res?.data?.ClientRevenueDetail);
        } else {
          setError(res.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchProtocols()
      .then((res) => {
        if (res.success) {
          setProtocolList(res?.data);
          setSelectedProtocol(res?.data[0]?.protocolId);
        } else {
          setError(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedProtocol) getClientRevenue();
  }, [selectedProtocol]);

  const categories = protocolRevenue?.map((item) => item.client) ?? [];

  const series = [
    {
      name: "Points Rewarded",
      type: "area",
      data: protocolRevenue?.map((item) => item.pointsRewarded.value) ?? [],
    },
    {
      name: "Points Bought",
      type: "bar",
      data: protocolRevenue?.map((item) => item.pointsBought.value) ?? [],
    },
    {
      name: "Points Remaining",
      type: "line",
      data: protocolRevenue?.map((item) => item.pointsRemaining.value) ?? [],
    },
  ];
  const lineChartData = { categories, series };

  return (
    <div className="h-100">
      <Card className="card card-height-100">
        <CardHeader className=" align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 text-dark">
            Client Revenue
          </h4>
          <div className="d-flex gap-1">
            <select
              onChange={(e) => setSelectedProtocol(e.target.value)}
              className="form-select mb-3"
              aria-label="Protocols"
              value={selectedProtocol}
            >
              {loading && !protocolList ? (
                <select>Loading...</select>
              ) : (
                protocolList.map(({ protocolName, protocolId }) => (
                  <option key={protocolId} value={protocolId}>
                    {protocolName}
                  </option>
                ))
              )}
            </select>
          </div>
        </CardHeader>

        <CardBody className="p-0 pb-2">
          <div className="w-100 h-100">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorBox error={error} />
            ) : (
              <div dir="ltr">
                <LineChart
                  height={500}
                  series={lineChartData.series}
                  categories={lineChartData.categories}
                  width="90%"
                  dataColors='["--vz-success", "--vz-primary", "--vz-danger"]'
                  xAxisLabel="Clients"
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClientRevenue;
