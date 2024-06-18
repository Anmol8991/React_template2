import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Button,
	Spinner,
} from "reactstrap";
// import ParticlesAuth from "./Components/AuthenticationInner/ParticlesAuth.js";
//import images
import meshLogo from "@/assets/images/demo/SingularityNetLogo-removebg-preview.png";
import ParticlesAuth from "@/components/client/authenticationInner/ParticlesAuth";
import dectec from "@/assets/images/demo/dectec.png";
import sophiaLogo from "@/assets/images/demo/mindplex.svg";
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";
import twinLogo from "@/assets/images/twinLogo.webp";
import { sendEmailOtp, verifyOtp } from "../../api/authApi";
import { useUserContext } from "../../hooks/useUserContext";
import { notify } from "../../utils/toastify";
import {
	changeLayoutMode,
	changeSidebarTheme,
} from "../../store/layouts/action";
import { layoutModeTypes, leftSidebarTypes } from "../../store/layouts/layout";
import { useDispatch } from "react-redux";

const TwoStep = () => {
	const { setUser } = useUserContext();
	const dispatch = useDispatch();
	const [otp, setOtp] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [resendLoading, setResendLoading] = useState(false);
	const [showResend, setShowResend] = useState(false);
	const history = useNavigate();

	const [minutes, setMinutes] = useState(3);
	const [seconds, setSeconds] = useState(0);
	const [timeOver, setTimeOver] = useState(false);
	const onChangeLayoutMode = () => {

		dispatch(changeSidebarTheme(leftSidebarTypes.LIGHT));
		dispatch(changeLayoutMode(layoutModeTypes.LIGHTMODE));
	};
	useEffect(() => {
		const timer = setInterval(() => {
			if (minutes === 0 && seconds === 0) {
				clearInterval(timer);
				setTimeOver(true);
				setShowResend(false);
			} else {
				if (seconds === 0) {
					setMinutes(minutes - 1);
					setSeconds(59);
				} else {
					setSeconds(seconds - 1);
				}
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [minutes, seconds]);

	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = seconds.toString().padStart(2, "0");
	const timer = `${formattedMinutes}:${formattedSeconds}`;

	const { state } = useLocation();
	const { _id, email, role, utilityType } = state ?? {};

	const hiddenEmail = email?.replace(/(?<=.).(?=[^@]*?@)/g, "*");
	const panel =
		role === "dectec_admin"
			? "Dectec Admin"
			: role === "protocol_admin"
			? "Singularity Net"
			: role === "client_admin"
			? "Client Admin"
			: "User";

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setUser(state);
		if (state?.theme === "light") {
			onChangeLayoutMode();
		}

		// location.reload();

		const credentials = new URLSearchParams();
		credentials.append("userId", _id);
		credentials.append("otp", otp);
		credentials.append("flag", "login");
		verifyOtp(credentials)
			.then((res) => {
				if (res.success) {
					setUser(res?.data);
				} else {
					setError(res.message);
				}
			})
			.catch((error) => {
				notify(error.message, false);
			})
			.finally(() => {
				setLoading(false);
				setTimeout(() => {
					setError("");
				}, 5000);
			});
	};

	const reSendOtp = (e) => {
		e.preventDefault();
		setResendLoading(true);
		setMinutes(3);
		setSeconds(0);
		sendEmailOtp({ email: email })
			.then((res) => {
				if (res.success) {
					notify(res.message, true);
					setShowResend(true);
				} else {
					notify(res.message, false);
				}
			})
			.catch((err) => {
				notify(err.message);
			})
			.finally(() => {
				setResendLoading(false);
			});
	};

	return (
		<React.Fragment>
			<div className="auth-page-wrapper -pt-5">
				<ParticlesAuth>
					<div className="auth-page-content">
						<Container>
							<Row>
								<Col lg={12}>
									<div className="text-center mt-sm-5 mb-4 text-white-50">
										<div>
											{utilityType ? (
												<img
													src={twinLogo}
													alt=""
													height="100"
													style={{ borderRadius: "50%" }}
												/>
											) : (
												<img
													src={
														role === "dectec_admin"
															? dectec
															: role === "client_admin"
															? sophiaLogo
															: role === "end_user"
															? sophia
															: meshLogo
													}
													alt=""
													height="100"
													style={{ borderRadius: "50%" }}
												/>
											)}
										</div>
										<h2 className="mt-3 text-white">
											{utilityType
												? utilityType.charAt(0).toUpperCase() +
												  utilityType.slice(1) +
												  " DAPP"
												: role === "4"
												? panel + " Admin"
												: role === "2"
												? panel + " Client Admin"
												: panel}{" "}
											Panel
										</h2>
									</div>
								</Col>
							</Row>

							<Row className="justify-content-center">
								<Col md={8} lg={6} xl={5}>
									<Card className="mt-4">
										<CardBody className="p-4">
											<div className="mb-4">
												<div className="avatar-lg mx-auto">
													<div className="avatar-title bg-light text-primary display-5 rounded-circle">
														<i className=" ri-device-line"></i>
													</div>
												</div>
											</div>

											<div className="p-2 mt-4">
												<div className="text-muted text-center mb-4 mx-lg-3">
													<h4 className="">Verify Email</h4>
													<p>
														Please enter the 6 digit OTP sent to{" "}
														<span className="fw-semibold">{hiddenEmail}</span>{" "}
														valid of <span>{timer}</span> minutes
													</p>
												</div>

												<form onSubmit={handleLogin}>
													{error && (
														<center className="text-danger my-2">
															{error}
														</center>
													)}
													<Row>
														<Col>
															<input
																type="text"
																onChange={(e) => setOtp(e.target.value)}
																style={{ letterSpacing: "10px" }}
																className="py-2 form-control form-control fs-2 bg-light border-light text-center"
																maxLength="6"
																required
																placeholder="******"
																id="digit1-input"
																autoComplete="off"
																onPaste={(e) => e.preventDefault()}
															/>
														</Col>
													</Row>
													<div className="mt-3">
														<button
															className="btn btn-primary fs-5 btn-md w-100 fw-medium"
															type="submit"
															disabled={loading}
														>
															{loading ? (
																<span className=" d-flex justify-content-center align-items-center gap-2">
																	<Spinner size="sm" /> Verifying..{" "}
																</span>
															) : (
																<span className="d-flex justify-content-center align-items-center gap-1">
																	Submit
																</span>
															)}
														</button>
													</div>
												</form>
											</div>
										</CardBody>
									</Card>
									<div className="mt-4 text-center">
										<p className="mb-0">
											Didn't receive a code ?{" "}
											<button
												onClick={reSendOtp}
												disabled={showResend}
												className="fw-semibold btn p-0 border border-0 text-primary text-decoration-underline cursor-pointer"
											>
												{resendLoading ? (
													<Spinner size="sm" />
												) : showResend ? (
													<span>Resend after {timer} minutes</span>
												) : (
													"Resend"
												)}
											</button>
										</p>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
				</ParticlesAuth>
			</div>
		</React.Fragment>
	);
};

export default TwoStep;
