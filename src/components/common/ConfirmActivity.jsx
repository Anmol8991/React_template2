import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loader from "./Loader";
import { earnPoints, getActivityGasFee } from "../../api/utilityApi";
import successLogo from "@/assets/images/demo/giphy.gif";
import { useUserContext } from "@/hooks/useUserContext";
import { notify } from "../../utils/toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getWalletAddress } from "../../utils/commonHelper";

const ConfirmActivity = ({
	show,
	setShow,
	points,
	activityId,
	file,
	taskText,
	apiPayload,
	setfileUploaded,
	setselectedFiles,
	setLearningModal,
}) => {
	const { user, setUser, setWalletAddress } = useUserContext();
	const navigate = useNavigate();
	const [check, setCheck] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [connectingWallet, setConnectingWallet] = useState(false);
	useEffect(() => {
		if (user?.walletId) {
			setLoading(true);
			const payload = {
				activityId,
				file,
			};
			if (show) {
				getActivityGasFee(payload)
					.then((res) => {
						if (res.success) {
							setData(res.data);
						} else {
							notify(res.message, false);
						}
					})
					.catch((err) => console.log(err))
					.finally(() => setLoading(false));
			}
		}
	}, [show, user?.walletId]);

	const handleConfirm = async () => {
		setLoading(true);
		earnPoints({ activityId, file, data: { ...apiPayload } })
			.then((res) => {
				if (res.success) {
					setShow(false);
					setCheck(false);
					if (setfileUploaded && setselectedFiles) {
						setfileUploaded("");
						setselectedFiles([]);
					}
					Swal.fire({
						html:
							"<img src=" +
							`${successLogo}` +
							' style="width:100px ;height:100px" />' +
							'<h3 style="color:#424345">Points Earned Successfully</h3>' +
							`<p className="text-muted fs-5 mb-4">You have earned <b>${
								data?.totalPoints
							}</b> ${taskText ? taskText : "for completing this activity"}` +
							". Complete More challenges to earn more points" +
							"</p>",
						showCloseButton: true,
						showCancelButton: false,
						focusConfirm: false,
						confirmButtonText: "OK",
					}).then((result) => {
						// This function will be executed when the user clicks the "OK" button
						if (result.isConfirmed) {
							navigate(-1);
						}
					});
				} else {
					notify(res.message, false);
				}
			})
			.catch((e) => notify(e.message, false))
			.finally(() => {
				setShow(false);
				setCheck(false);
				setLoading(false);
				setLearningModal && setLearningModal(false);
			});
	};

	if (!user.walletId) {
		return (
			<Modal
				centered
				isOpen={show}
				toggle={() => {
					setShow(false);
					setCheck(false);
				}}
			>
				<ModalHeader className="w-100 text-center flex justify-content-center">
					Connect to wallet
				</ModalHeader>

				<ModalBody>
					{connectingWallet ? (
						<Loader />
					) : (
						<div className="text-center">
							<i class="bx bx-error fs-1 text-warning"></i>
							<p>
								Please connect a TWIN wallet to your account before proceeding
								with this activity. Would you like to connect to the TWIN wallet
								now?
							</p>
						</div>
					)}
				</ModalBody>

				<ModalFooter className="flex justify-content-center align-items-center gap-2">
					<button
						onClick={() => {
							setShow(false);
							setCheck(false);
							navigate("/");
						}}
						className="btn btn-light"
						disabled={connectingWallet}
					>
						No
					</button>
					<button
						disabled={connectingWallet}
						onClick={async () => {
							setConnectingWallet(true);
							await getWalletAddress(setWalletAddress, setUser, null, null);
							setConnectingWallet(false);
						}}
						className="btn btn-primary"
					>
						Yes
					</button>
				</ModalFooter>
			</Modal>
		);
	}

	return (
		<Modal
			centered
			isOpen={show}
			toggle={() => {
				setShow(false);
				setCheck(false);
			}}
		>
			<ModalHeader className="w-100 text-center">Confirm Activity</ModalHeader>
			{loading || fetching ? (
				<Loader />
			) : (
				<ModalBody>
					<div>
						<p>
							{` By completing this activity you will earn ${parseFloat(
								data?.totalPoints
							)} out of ${points && parseFloat(points)} and
              ${data?.transactionFee} will be deducted for transaction fee.`}
						</p>
						<div className="d-flex flex-column gap-2 bg-light p-2 px-4 mb-3 rounded">
							<div className="d-flex justify-content-between align-items-center">
								<span>Activity Points</span>
								<span>{points && points} Points</span>
							</div>
							<div className="d-flex justify-content-between align-items-center">
								<span>Transaction Fee</span>
								<span>{data?.transactionFee}</span>
							</div>
							<div className="d-flex justify-content-between align-items-center fw-bold">
								<span>Total points you will earn</span>
								<span>{data?.totalPoints}</span>
							</div>
						</div>
					</div>
					<label
						className="d-flex align-items-start gap-2 cursor-pointer"
						htmlFor="fee"
					>
						<input
							type="checkbox"
							className="border border-primary cursor-pointer"
							style={{ marginTop: "3px" }}
							name=""
							id="fee"
							value={check}
							onChange={(e) => setCheck(e.target.checked)}
						/>
						<span className="text-muted fw-light" style={{ fontSize: "0.9em" }}>
							I agree that the transaction fee will be deducted from the points
							I will earn after submitting this activity.
						</span>
					</label>
				</ModalBody>
			)}

			<ModalFooter>
				<button
					onClick={() => {
						setShow(false);
						setCheck(false);
					}}
					className="btn btn-light"
					disabled={loading}
				>
					Cancel
				</button>
				<button
					onClick={handleConfirm}
					disabled={!check || loading}
					className="btn btn-primary"
				>
					{loading ? "Confirming..." : "Confirm"}
				</button>
			</ModalFooter>
		</Modal>
	);
};

export default ConfirmActivity;
