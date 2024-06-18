import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Label,
	Row,
	Button,
	Spinner,
	ModalHeader,
	ModalBody,
	Modal,
	ModalFooter,
} from "reactstrap";
import ParticlesAuth from "@/components/client/authenticationInner/ParticlesAuth";
import meshLogo from "@/assets/images/demo/SingularityNetLogo-removebg-preview.png";
import dectec from "@/assets/images/demo/dectec.png";
import sophiaLogo from "@/assets/images/demo/mindplex.svg";
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";

import { useUserContext } from "../../hooks/useUserContext";
import { login } from "../../api";
import { notify } from "../../utils/toastify";
import { sendEmailOtp, verifyOtp } from "../../api/authApi";
import ForgotPassswordModal from "../../components/common/ForgotPassswordModal";

const Login = () => {
	const { setUser } = useUserContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [passwordType, setPasswordType] = useState("password");
	const [showModal, setShowModal] = useState(false);

	const role = "1"; //localStorage.getItem("role");
	const panel =
		role === "1"
			? "Dectec Admin"
			: role === "2"
			? "Singularity Net"
			: role === "3"
			? "Mindplex"
			: "Sophia Verse";
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		const credentials = {
			username: email,
			password: password,
		};

		login(credentials)
			.then((res) => {
				if (res.success) {
					navigate("/two-step", {
						state: res?.data,
					});
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
				}, 3000);
			});
	};

	useEffect(() => {
		localStorage.removeItem("user_data");
	}, []);

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	document.title = "SignIn";
	return (
		<React.Fragment>
			<ForgotPassswordModal setShowModal={setShowModal} showModal={showModal} />
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mb-4 text-white-50">
									<div>
										<Link to="/" className="d-inline-block auth-logo">
											<img
												src={
													role === "1"
														? dectec
														: role === "3"
														? sophiaLogo
														: role === "4"
														? sophia
														: meshLogo
												}
												alt=""
												height="100"
												style={{ borderRadius: "50%" }}
											/>
										</Link>
									</div>
									<h2 className="mt-3 text-dark-gray">
										{role === "4"
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
										<div className="text-center mt-2">
											<h4 className="text-primary">Welcome Back!</h4>
											<p className="text-muted">Log In to {panel}</p>
										</div>
										<div className="p-2 mt-4">
											<form onSubmit={handleLogin}>
												{error && (
													<span className="mb-4 text-danger text-center">
														{error}
													</span>
												)}
												<div className="mb-3">
													<Label htmlFor="username" className="form-label">
														Email
													</Label>
													<Input
														type="text"
														required
														className="form-control bg-light"
														id="username"
														placeholder="Enter Email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>

												<div className="mb-3">
													<div className="float-end">
														<span
															onClick={() => setShowModal(!showModal)}
															className="text-muted cursor-pointer"
														>
															Forgot Password?
														</span>
													</div>
													<Label
														className="form-label"
														htmlFor="password-input"
													>
														Password
													</Label>
													<div className="position-relative auth-pass-inputgroup mb-3">
														<Input
															type={passwordType}
															required
															// onPaste={(e) => e.preventDefault()}
															className="form-control pe-5 password-input bg-light"
															placeholder="Enter Password"
															id="password-input"
															value={password}
															onChange={(e) => setPassword(e.target.value)}
														/>
														<button
															className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
															type="button"
															id="password-addon"
															onClick={(e) => togglePassword(e)}
														>
															<i className="ri-eye-fill align-middle"></i>
														</button>
													</div>
												</div>

												<div className="mt-4">
													<button
														className="btn btn-primary fs-5 btn-md w-100 fw-medium"
														type="submit"
														disabled={loading}
													>
														{loading ? (
															<span className=" d-flex justify-content-center align-items-center gap-2">
																<Spinner size="sm" /> Logging In...{" "}
															</span>
														) : (
															<span className="d-flex justify-content-center align-items-center gap-1">
																Log In
															</span>
														)}
													</button>
												</div>
											</form>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			</ParticlesAuth>
		</React.Fragment>
	);
};

export default Login;
