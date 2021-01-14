import store from "../../../../store/Store";
import {getAuthHeader} from "../../../Login/LoginActions";
import {INFO} from "../../../../store/ActionsStructure";

export function getPage(id, setModeHandler, setHtmlHandler) {
    setModeHandler(INFO.PAGE_MODE_VALUES.LOADING);

    let url = store.getState().OptionsServerAddress + "/api/v1/info";
    let rsStatus = 0;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            Operation : "Get",
            Id : id
        })
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(rs => {
        console.log("RESULT", rs, rsStatus)
        if (rsStatus === 200 && rs['Result'] === "OK") {
            setModeHandler(INFO.PAGE_MODE_VALUES.ACTUAL);
            setHtmlHandler(rs['Html']);
            // dispatch({type: INFO.PRIVATE_LIST_DATA, newValue: convertToTree(rs['PRIVATE'])});
            // dispatch({type: INFO.PUBLIC_LIST_DATA, newValue: convertToTree(rs['PUBLIC'])});
        } else {
            console.error("status=" + rsStatus, "result=" + rs['Result'], "error=" + rs.Error)
            setModeHandler(INFO.PAGE_MODE_VALUES.ERROR);
        }
    }).catch( e => {
        console.error("ERROR", e)
        setModeHandler(INFO.PAGE_MODE_VALUES.ERROR);
    });
}


export function setPage(id, newHtml, setModeHandler) {
    let url = store.getState().OptionsServerAddress + "/api/v1/info";
    let rsStatus = 0;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            Operation : "Set",
            Id : id,
            Html : newHtml
        })
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(rs => {
        // console.log("RESULT", rs, rsStatus)
        if (rsStatus === 200 && rs['Result'] === "OK") {
            // setModeHandler(INFO.PAGE_MODE_VALUES.ACTUAL);
        } else {
            console.error("status=" + rsStatus, "result=" + rs['Result'], "error=" + rs.Error)
            setModeHandler(INFO.PAGE_MODE_VALUES.ERROR);
        }
    }).catch( e => {
        console.error("ERROR", e)
        setModeHandler(INFO.PAGE_MODE_VALUES.ERROR);
    });
}