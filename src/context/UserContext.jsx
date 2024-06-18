import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/authApi";
import { notify } from "../utils/toastify";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user_data");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [walletAddress, setWalletAddress] = useState(
		sessionStorage.getItem("walletAddress")
	);

	const checkAuth = async () => {
		await verifyToken()
			.then((res) => {
				if (res?.status === 401 && !res?.success) {
					setUser(null);
					navigate("/login");

					localStorage.removeItem("user_data");

					notify(res?.message, false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		checkAuth();
		if (!user) {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("user_data", JSON.stringify(user));
	}, [user]);


	return (
		<UserContext.Provider
			value={{ user, setUser, walletAddress, setWalletAddress }}
		>
			{children}
		</UserContext.Provider>
	);
};
