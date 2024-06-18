import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import Search from "./Search.jsx";
import wire from "../../../assets/images/demo/wire.jpg";

const TableContainer = ({ data, index }) => {

    const scanLink = `https://etherscan.io/tx/0xfa430d80e107aeb588cf54f8112af0e5bccf5019a957222998a37715e1a015c4`;

    return (
        <Fragment>
            <div className="card-body">
                <Row className="g-3 mb-4">
                    <Col>
                        <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
                            <input
                                id="search-bar-0"
                                type="text"
                                className="form-control search /"
                                placeholder={"search here....."}
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                        </div>
                    </Col>
                    <Search index={index} />
                </Row>

                <div className="table-responsive  table-card">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            {index === 2 ? (
                                <tr>
                                    <th scope="col">Activity</th>
                                    <th scope="col">Points</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Trx Hash</th>
                                </tr>
                            ) : index === 3 ? (
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Amount($)</th>
                                    <th scope="col">Points</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Trx Hash</th>
                                </tr>
                            ) : index === 4 ? (
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Points</th>
                                    <th scope="col">Date</th>
                                </tr>
                            ) : (
                                <div>Loading</div>
                            )


                            }
                        </thead>
                        <tbody>
                            {
                                index === 2 ?
                                    data.map((item, index) => {
                                        function hashme(min, max) {
                                            return Math.floor(
                                                Math.random() * (max - min + 1) + min
                                            );
                                        }

                                        const hash1 = hashme(1000, 9999);
                                        const hash2 = hashme(1000, 9999);
                                        return (
                                            <tr key={index}>

                                                <td className="text-success">{item.activityName}</td>
                                                <td><span className={item.points < 6000 ? "text-info" : item.points > 6000 && item.points < 9999 ? "text-warning" : item.points > 9999 ? "text-danger" : "text-danger"}>{item.points}</span></td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">

                                                        <div className="d-flex align-items-center">
                                                            <img src={wire} alt="" className="avatar-xs rounded-circle me-2" /><a href={scanLink} className="text-info p-0" >
                                                                {`0X${hash1}.....${hash2}`}
                                                            </a>
                                                        </div>

                                                        <span role="button" className="fa-layers text-gray fa-fw p-0" >
                                                            <FontAwesomeIcon icon={faCopy} />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : index === 3 ?
                                        data.map((item, index) => {
                                            function hashme(min, max) {
                                                return Math.floor(
                                                    Math.random() * (max - min + 1) + min
                                                );
                                            }

                                            const hash1 = hashme(1000, 9999);
                                            const hash2 = hashme(1000, 9999);
                                            return (
                                                <tr key={index}>

                                                    <td>
                                                        <span className={item.Type === "Event" ? "badge badge-border badge-soft-warning" : item.Type === "Donation" ? "badge badge-border badge-soft-success" : "badge badge-border badge-soft-info"}>{item.Type}</span>
                                                    </td>
                                                    <td><span className={item.Amount < 600 ? "text-info" : item.Amount > 600 && item.Amount < 999 ? "text-warning" : item.Amount > 999 ? "text-danger" : "text-danger"}>{item.Amount / 100} M</span></td>
                                                    <td className="text-success">{item.points}</td>
                                                    <td>{item.date}</td>

                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">

                                                            <div className="d-flex align-items-center">
                                                                <img src={wire} alt="" className="avatar-xs rounded-circle me-2" /><a href={scanLink} className="text-info p-0" >
                                                                    {`0X${hash1}.....${hash2}`}
                                                                </a>
                                                            </div>

                                                            <span role="button" className="fa-layers text-gray fa-fw p-0" >
                                                                <FontAwesomeIcon icon={faCopy} />
                                                            </span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                        : index === 4 ?
                                            data.map((item, index) => {
                                                return (
                                                    <tr key={index}>

                                                        <td className="text-success">{item.Name}</td>
                                                        <td>{item.Description}</td>
                                                        <td><span className={item.points < 6000 ? "text-info" : item.points > 6000 && item.points < 9999 ? "text-warning" : item.points > 9999 ? "text-danger" : "text-danger"}>{item.points}</span></td>
                                                        <td>{item.date}</td>

                                                    </tr>
                                                );
                                            })
                                            : <div>Loading</div>

                            }

                        </tbody>

                    </table>
                </div>



            </div>
        </Fragment>
    );
};

export default TableContainer;