import {getAuthHeader} from "../Login/LoginActions";
import store from "../../store/Store";

export function sendMsg(target, bodyObj) {
    const url = store.getState().OptionsServerAddress + "/api/v1/test";
    console.log("send RqBody", bodyObj);

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(bodyObj)
    }).then( (rs) => {
        rsStatus = rs.status;
        return rs.json();
    }).then(rs => {
        console.log("<< Response", rs);
        if (rsStatus !== 200) {
            console.log("Error");
        }

    }).catch( e => {
        console.error("ERROR", e)
    });
}