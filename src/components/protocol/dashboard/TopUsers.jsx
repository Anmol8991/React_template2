import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";

import { fetchTopUsers } from "../../../api/protocolApi";
import Loader from "../../common/Loader";
import ErrorBox from "../../common/ErrorBox";
// import { creatorsListData } from "./data/NFTMarketplace";

const TopUsers = () => {
	const colorArr = [
		"https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhcmslMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
		"https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		"https://images.pexels.com/photos/6985259/pexels-photo-6985259.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985259.jpg&fm=jpg&w=640&h=427",
	];

	const getRandomColor = () => {
		return colorArr[Math.floor(Math.random() * colorArr.length)];
	};
	const [topUsersData, setTopUsersData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		setLoading(true);
		fetchTopUsers()
			.then((res) => {
				if (res?.success) {
					setTopUsersData(
						res?.data !==
							"None of the users has earned points under this protocol"
							? res?.data
							: []
					);
				} else {
					setError(res?.message);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<React.Fragment>
			<Card>
				<CardBody>
					<div className="d-flex pt-2 pb-4">
						<h4 className="card-title mb-0 flex-grow-1 text-dark">Top Users</h4>
					</div>

					{loading ? (
						<Loader />
					) : error ? (
						<ErrorBox error={error} />
					) : (
						<Swiper
							modules={[Navigation, Autoplay]}
							slidesPerView={2}
							spaceBetween={10}
							navigation={{
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}}
							breakpoints={{
								640: {
									slidesPerView: 2,
									spaceBetween: 10,
								},
								768: {
									slidesPerView: 3,
									spaceBetween: 15,
								},
								1024: {
									slidesPerView: 4,
									spaceBetween: 15,
								},
							}}
							loop={true}
							autoplay={{ delay: 2500, disableOnInteraction: false }}
							className="mySwiper marketplace-swiper rounded gallery-light"
						>
							<div className="swiper-wrapper">
								{topUsersData.length > 0 &&
									topUsersData?.map((item, key) => (
										<SwiperSlide key={key}>
											<div className="card explore-box card-animate rounded c">
												<img
													src={getRandomColor()}
													alt=""
													className=" card-img-top"
													height="120"
												/>
												<div className="card-body text-center">
													<img
														src={item.logo}
														alt=""
														className="avatar-md rounded-circle object-cover mt-n5 img-thumbnail border-light mx-auto d-block"
													/>
													<Link>
														<h5 className="mt-2 mb-1 text-white">
															{item.name}
														</h5>
													</Link>
													<p className="text-muted mb-2">{item.country}</p>
													<p className="text-muted mb-2">
														{item.earnedPoints} Points
													</p>
												</div>
											</div>
										</SwiperSlide>
									))}
							</div>
						</Swiper>
					)}
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default TopUsers;
