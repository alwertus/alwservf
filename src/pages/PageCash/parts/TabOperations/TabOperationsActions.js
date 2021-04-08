import store from "../../../../store/Store";
import {getAuthHeader} from "../../../Login/LoginActions";
import {CASH} from "../../../../store/ActionsStructure";

export function setPageCashStatus(newValue) { return { type: CASH.CASH_STATUS, newValue: newValue } }
export function setPageOperationList(newValue) { return { type: CASH.OPERATION_LIST, newValue: newValue } }

const dispatch = store.dispatch;

export function createOperation(sign, plannedDate, group = "N") {
    sendMsg({
        Operation : "Create",
        Description: "",
        Name: "",
        PlannedDate: plannedDate,
        Planned: 0,
        Sign: sign,
        Group: group
    });
}

export function fillFromTemplate(plannedDate) {
    sendMsg({
        Operation : "FillFromTemplate",
        // Description: "",
        // Name: "",
        PlannedDate: plannedDate,
        // Planned: 0,
        // Sign: sign,
        // Group: group
    });
}

export function createChildOperation(parentId) {
    sendMsg({
        Operation : "CreateChild",
        Description: "",
        Name: "",
        Planned: 0,
        Group: "N",
        ParentId: parentId
    });
}

export function changeData(id, field, newValue) {
    sendMsg({
        Operation : "Update",
        Id: id,
        Field: field,
        newValue: newValue
    })
}
export function removeRecord(id) {
    sendMsg({
        Operation : "Remove",
        Id: id
    })
}

export function getMonthOperations(date) {
    sendMsg({
        Operation : "GetMonthOperations",
        Date : date
    }, true);
}
function sendMsg(bodyObj, changeStatus = false) {
    const url = store.getState().OptionsServerAddress + "/api/v1/cash";
    console.log("send RqBody", bodyObj);

    if (changeStatus) dispatch(setPageCashStatus(CASH.CASH_STATUS_VALUES.LOADING));

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
            return;
        }

        let list = rs['List'];
        dispatch(setPageOperationList(list));
        if (changeStatus) dispatch(setPageCashStatus(CASH.CASH_STATUS_VALUES.ACTUAL));

    }).catch( e => {
        console.error("ERROR", e)
        if (changeStatus) dispatch(setPageCashStatus(CASH.CASH_STATUS_VALUES.ERROR));
    });
}