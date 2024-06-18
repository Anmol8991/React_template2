import { useReducer } from "react";
import { createContext } from "react";
import { dataReducer } from "./dataReducer";

const initialDectecState = {
	loading: false,
	error: false,
	dashboardSummary: [],
	dashboardProtocolRevenue: [],
	protocolList: [],
	protocolInfo: [],
};

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, initialDectecState);

	const setLoading = () => {
		dispatch({ type: "SET_FETCHING" });
	};

	const setError = () => {
		dispatch({
			type: "SET_ERROR",
		});
	};

	const setDashboardSummary = (data) => {
		dispatch({
			type: "SET_DASHBOARD_SUMMARY",
			payload: data,
		});
	};

	const setDashboardProtocolRevenue = (data) => {
		dispatch({
			type: "SET_DASHBOARD_PROTOCOL_REVENUE",
			payload: data,
		});
	};

	const setProtocolList = (data) => {
		dispatch({
			type: "SET_DECTEC_PROTOCOL_LIST",
			payload: data,
		});
	};

	const setProtocolInfo = (data) => {
		dispatch({
			type: "SET_DECTEC_PROTOCOL_INFO",
			payload: data,
		});
	};

	const values = {
		setLoading,
		setProtocolList,
		setError,
		setProtocolInfo,
		setDashboardSummary,
		setDashboardProtocolRevenue,
		data: state,
	};

	return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
