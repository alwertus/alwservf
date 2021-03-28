import store from "../../../../store/Store";
import {CASH, STATUS} from "../../../../store/ActionsStructure";
import {getAuthHeader} from "../../../Login/LoginActions";

const dispatch = store.dispatch;

export function setPageCashOptionsStatus(newValue) { return { type: CASH.OPTIONS_STATUS, newValue: newValue } }
export function setPageCashSheetList(newValue) { return { type: CASH.SHEET_LIST, newValue: newValue } }
export function setPageCashSelectedSheet(newValue) { return { type: CASH.SELECTED_SHEET, newValue: newValue } }
export function setPageCashUserList(newValue) { return { type: CASH.USER_LIST, newValue: newValue } }

export function getCashList() {
    sendMsg({
        Operation: "GetList",
    }, true);
}
export function createCashList() {
    sendMsg({
        Operation: "CreateSheet",
    });
}

export function changePageCashSelectedSheet(newId) {
    sendMsg({
        Operation: "Update",
        Field: "Selected",
        NewId: newId
    });
}

export function changePageCashSheetName(id, newName) {
    sendMsg({
        Operation: "Update",
        Field: "Name",
        Id: id,
        NewName: newName
    });
}

export function pageCash_AddUser(email) {
    if (email === "") return;
    console.log("USER ADD", email)
    sendMsg({
        Operation: "Add User",
        Email: email
    });
}

export function pageCash_RemoveUser(userId) {
    console.log("USER REMOVE", userId)
    sendMsg({
        Operation: "Remove User",
        UserId: userId
    });
}

function sendMsg(bodyObj, changeStatus = false) {
    const url = store.getState().OptionsServerAddress + "/api/v1/cash_options";

    if (changeStatus) dispatch(setPageCashOptionsStatus(STATUS.LOADING));

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(bodyObj)
    }).then( (rs) => {
        rsStatus = rs.status;
        return rs.json();
    }).then(rs => {
        console.log(rs);
        if (rsStatus !== 200) {
            console.log("Error");
            return;
        }

        dispatch(setPageCashSheetList(rs['List']));
        dispatch(setPageCashUserList(rs['Users']));
        dispatch(setPageCashSelectedSheet(rs['Active']));
        if (changeStatus) dispatch(setPageCashOptionsStatus(STATUS.ACTUAL));

    }).catch( e => {
        console.error("ERROR", e)
        if (changeStatus) dispatch(setPageCashOptionsStatus(STATUS.ERROR));
    });
}