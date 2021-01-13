import store from "../../../../store/Store";
import {getAuthHeader} from "../../../Login/LoginActions";
import {INFO} from "../../../../store/ActionsStructure";
import {convertToTree} from "../InfoTree/InfoTreeActions";

function addChildrenToBadSet(childrenArr, badSet) {
    if (childrenArr === undefined || childrenArr === null) return;
    childrenArr.forEach(e => {
        badSet.add(e.id);
        addChildrenToBadSet(e.children, badSet)
    })
}

export function calcBadTargetsToMove(fromObj) {
    let badSet = new Set();
    badSet.add(fromObj.id);
    addChildrenToBadSet(fromObj.children, badSet)
    return badSet;
}

export function move(from, to) {
    let url = store.getState().OptionsServerAddress + "/api/v1/infolist";
    let rsStatus = 0;
    let dispatch = store.dispatch;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            Operation : "Upsert",
            Id : from,
            Parent : to
        })
    }).then( (rs) => {
        rsStatus = rs.status;
        return rs.json();
    }).then(rs => {
        // console.log("RESULT", rs, rsStatus)

        if (rsStatus === 200 && rs.Result === "OK") {
            dispatch({type: INFO.PRIVATE_LIST_DATA, newValue: convertToTree(rs['PRIVATE'])});
        }

    }).catch( e => {
        console.error("ERROR", e)
    });
}