import store from "../../../../store/Store";
import {getAuthHeader} from "../../../Login/LoginActions";
import {INFO} from "../../../../store/ActionsStructure";

export function setPageInfoTreeMode(newValue) { return { type: INFO.SET_TREE_MODE, newValue: newValue } }

function fillChildrens(parent, array) {
    if (!parent) return;
    parent.children = array.filter(el => el.parent === parent.id)
    parent.children.map(e => fillChildrens(e, array));
}

export function convertToTree(input) {
    let output = input.filter(e => e.parent === undefined || e.parent === null)
    output.map(e => fillChildrens(e, input))
    return output;
}

export function getTreeList() {
    let url = store.getState().OptionsServerAddress + "/api/v1/infolist";
    let dispatch = store.dispatch;
    let rsStatus = 0;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            Operation : "GetAll"
        })
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(rs => {
        // console.log("RESULT", rs, rsStatus)
        if (rsStatus === 200 && rs['Result'] === "OK") {
            dispatch({type: INFO.PRIVATE_LIST_DATA, newValue: convertToTree(rs['PRIVATE'])});
            // dispatch({type: INFO.PUBLIC_LIST_DATA, newValue: convertToTree(rs['PUBLIC'])});
        } else {
            console.error("status=" + rsStatus, "result=" + rs.Result, "error=" + rs.Error)
        }
    }).catch( e => {
        console.error("ERROR", e)
    });
}