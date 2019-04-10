import fetch from "../../utils/fetch";
import { get } from "lodash";

export const getListAct = data => {
    return async (dispatch, getState) => {
        const result = await fetch({
            method: "get",
            url: "https://api.github.com/search/repositories",
            baseURL: "",
            data,
        });
        console.log(11, result);
        dispatch({ type: "STAR", value: get(result, ["data"]) });
    };
};
