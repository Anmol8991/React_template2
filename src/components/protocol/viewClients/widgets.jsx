import React from 'react';
import CountUp from "react-countup";
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

const Widgets = () => {

    const ecomWidgets = [
        {
            id: 4,
            cardColor: "info",
            label: "Paid Amount",
            counter: "11.89",
            bgcolor: "danger",
            icon: "bx bx-wallet",
            decimals: 2,
            prefix: "$",
            suffix: "M"
        },
        {
            id: 5,
            cardColor: "info",
            label: "Points Bought",
            counter: "189",
            bgcolor: "success",
            icon: "bx bx-purchase-tag",
            decimals: 0,
            prefix: "",
            suffix: "K"
        },
        {
            id: 6,
            cardColor: "info",
            label: "Points Used",
            counter: "89",
            bgcolor: "danger",
            icon: "bx bx-bar-chart-alt-2",
            decimals: 0,
            prefix: "",
            suffix: "K"
        },
        {
            id: 7,
            cardColor: "info",
            label: "Points Remaining",
            counter: "100",
            bgcolor: "warning",
            icon: "bx bx-coin-stack",
            decimals: 0,
            prefix: "",
            suffix: "K"
        },

        {
            id: 3,
            cardColor: "success",
            label: "Users",
            counter: "1987",
            bgcolor: "info",
            icon: "bx bx-user-circle",
            decimals: 0,
            prefix: "",
            suffix: "",
            link: "users"
        },

        {
            id: 3,
            cardColor: "success",
            label: "Activities",
            counter: "3873",
            bgcolor: "primary",
            icon: "bx bx-task",
            decimals: 0,
            prefix: "",
            suffix: "",
        },


    ];

    return (
        <React.Fragment>
            {ecomWidgets.map((item, key) => (
                <Col lg={4} key={key}>
                    <Card className="card-animate" >
                        <CardBody>
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p>
                            </div>

                            <div className="d-flex align-items-center" style={{
                                gap: "1rem"
                            }}>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor}>
                                        <i className={`${item.icon}`}></i>
                                    </span>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                    <div>
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value text-dark" data-target="559.25">
                                            <CountUp
                                                start={0}
                                                prefix={item.prefix}
                                                suffix={item.suffix}
                                                separator={item.separator}
                                                end={item.counter}
                                                decimals={item.decimals}
                                                duration={4}
                                            />
                                        </span></h4>
                                    </div>

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>))}
        </React.Fragment>
    );
};

export default Widgets;