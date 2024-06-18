import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Col, Row, Input } from "reactstrap";

import { PageHeader } from "@/components/common/PageHeader";
import { Link, useNavigate } from "react-router-dom";

import { categoriesApi } from "@/api/dectecApi";
import { truncateDescription } from "@/utils/commonHelper";
import ActivityTermsModal from "../../../../components/common/ActivityTermsModal";
import { useSelector } from "react-redux";
import ErrorBox from "../../../../components/common/ErrorBox";
import Loader from "../../../../components/common/Loader";
import {
	getActivityRoutes,
	getWalletAddress,
} from "../../../../utils/commonHelper";

const Activity = () => {
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [categoryData, setCategoryData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const { layoutModeType } = useSelector((state) => ({
		layoutModeType: state.Layout.layoutModeType,
	}));

	useEffect(() => {
		setLoading(true);
		categoriesApi()
			.then((res) => {
				if (res.success) {
					setCategoryData(res?.data);
				} else {
					setError(message);
					console.log(message);
				}
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredData = categoryData.filter(
		(item) =>
			item.categoryInfo.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			item.categoryDescription.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const initialExpandedStates = Array(3).fill(false);
	const [expanded, setExpanded] = useState(initialExpandedStates);

	const handleToggle = (index) => {
		const updatedExpanded = [...expanded];
		updatedExpanded[index] = !updatedExpanded[index];
		setExpanded(updatedExpanded);
	};

	const HowItWorksBtn = () => {
		return (
			<button
				className="btn btn-soft-info d-flex align-items-center gap-2"
				onClick={() => setShowModal(true)}
			>
				<i className="bx bx-info-circle fs-5"></i>
				<span>How it works?</span>
			</button>
		);
	};

	return (
		<div className="page-content">
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Row>
						<Col sm={12}>
							<PageHeader
								pageHeading="Earn Points"
								isLink={false}
								btn={[<HowItWorksBtn />]}
							/>
							<ActivityTermsModal
								setShowModal={setShowModal}
								showModal={showModal}
							/>
							{loading ? (
								<Loader />
							) : error ? (
								<ErrorBox error={error} />
							) : (
								<Col
									className={`d-flex flex-column flex-wrap gap-3 justify-content-center ${
										layoutModeType == "dark" ? "bg-light" : "bg-white"
									} p-3 rounded shadow-lg`}
								>
									<div className="d-flex justify-content-end mb-1">
										<div className="search-box ">
											<Input
												type="text"
												className="form-control"
												placeholder="Search..."
												onChange={handleSearch}
												value={searchQuery}
											/>
											<i className="ri-search-line search-icon"></i>
										</div>
									</div>

									<div className="d-flex flex-wrap gap-3 justify-content-center ">
										{(filteredData || []).map((item, index) => (
											<div
												className="card shadow-lg explore-box card-animate rounded p-0 border border-soft-gray"
												style={{ height: "300px", width: "300px" }}
											>
												<div className="explore-place-bid-img w-100 h-75">
													<img
														src={item.categoryInfo.logo}
														alt=""
														className="img-fluid card-img-top explore-img h-100 w-100 object-fit-cover"
													/>
													<div className="bg-overlay"></div>
												</div>
												<CardBody>
													<p className="fw-medium mb-0 float-end">
														<i className="bx bx-coin-stack text-warning align-middle"></i>{" "}
														{item.activityPoints}{" "}
													</p>
													<h5 className="mb-1">
														<Link
															className="text-dark"
															to={getActivityRoutes(item?.categoryInfo)}
														>
															{item?.categoryInfo?.name}
														</Link>
													</h5>
													<p className="text-muted mb-0">
														{expanded[index]
															? item.categoryDescription
															: truncateDescription(item.categoryDescription)}
														<span
															className="text-secondary fs-6  float-end cursor-pointer"
															onClick={() => handleToggle(index)}
														>
															{expanded[index] ? "See less" : "See more"}
														</span>
													</p>
												</CardBody>
												<div className="card-footer border-top border-top-dashed">
													<div className="d-flex align-items-center justify-content-end">
														<h5 className="flex-shrink-0 fs-14 text-primary mb-0">
															<Link
																className="btn btn-info"
																to={getActivityRoutes(item?.categoryInfo)}
															>
																<i className="ri-coin-fill align-bottom me-1"></i>{" "}
																Earn Points
															</Link>
														</h5>
													</div>
												</div>
											</div>
										))}
									</div>
								</Col>
							)}

							<div className="w-100 d-flex justify-content-center align-items-end"></div>
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
};

export default Activity;
