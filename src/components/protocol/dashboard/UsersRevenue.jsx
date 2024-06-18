import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

//import Images
import DonutChart from "@/components/common/charts/DonutChart"
import sophia from "@/assets/images/demo/sophia.jpg";
import company1 from "@/assets/images/demo/company1.png";

const UsersRevenue = () => {

    const chartData = [1234, 2345];
    const protocolData = [
        {
            name: "Individual Users",
            value: chartData[0],
            logo: sophia,
        },
        {
            name: "Client Users",
            value: chartData[1],
            logo: company1,
        },
    ];
    const labels= ["Individual Amount", "Client Amount"];
    return (
        <React.Fragment>
            <div>
                <div className="card card-height-100">
                    <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1 mt-3 text-dark">User Revenue</h4>
                    </div>
                    <div className="card-body">
                        <DonutChart series={chartData} dataColors='[ "--vz-warning", "--vz-danger"]' height={224} labels={labels}/>
                        <ul className="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
                            {protocolData.map((element, index) => {
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
                                                    />
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UsersRevenue;
