export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FETCHING":
      return {
        ...state,
        loading: true,
      };
    case "SET_DASHBOARD_SUMMARY":
      return {
        ...state,
        loading: false,
        dashboardSummary: action.payload,
      };
    case "SET_DASHBOARD_PROTOCOL_REVENUE":
      return {
        ...state,
        loading: false,
        dashboardProtocolRevenue: action.payload,
      };
    case "SET_DECTEC_PROTOCOL_LIST":
      return {
        ...state,
        loading: false,
        protocolList: action.payload,
      };
    case "SET_DECTEC_PROTOCOL_INFO":
      return {
        ...state,
        loading: false,
        protocolInfo: action.payload,
      };
    case "SET_ERROR":
      return {
        loading: false,
        protocolList: [],
        protocolInfo: [],
        error: true,
      };

    default:
      return {
        state,
      };
  }
};
