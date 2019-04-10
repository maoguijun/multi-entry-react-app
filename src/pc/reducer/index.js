import { combineReducers } from "redux";
import { get } from "lodash";
const PcDemo = (state = {}, action) => {
    switch (action.type) {
        case "STAR":
            return {
                ...state,
                stars: get(action, ["value", "items"]),
                total: get(action, ["value", "total_count"]),
            };
        default:
            return state;
    }
};

export default combineReducers({ PcDemo });
