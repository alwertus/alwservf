import {sendMsg} from "../../../../common/SendMsg";
import store from "../../../../store/Store";

const TARGET = "cash";

export function loadSheetList(setSheetListHandler) {
    sendMsg(TARGET,
        {Operation:"GetSheets"},
        (rs)=>{setSheetListHandler(rs['List'])},
        (err)=>{console.error("GetSheets", err)})
}

export function createNewSheet(name, successHandler) {
    sendMsg(TARGET,
        {
            Operation:"NewSheet",
            Name:name},
        successHandler,
        (err)=>{console.error("NewSheet", err)})
}

export function loadUserList(setUserListHandler, errorHandler, setCurrentAccessHandler) {
    setUserListHandler([])
    const userEmail = store.getState()['UserEmail']
    sendMsg(TARGET,
        {Operation:"GetUsers"},
        (rs)=>{
            setUserListHandler(rs['List']);
            setCurrentAccessHandler(() => {
                let arr = rs['List'].filter(e => e['email'] === userEmail)
                return arr.length > 0
                    ? arr[0].access
                    : "0"
            });
        },
        (err)=>{errorHandler(err)}
    )
}

export function createNewAccessUser(email, successHandler, errorHandler) {
    sendMsg(TARGET,
        {
            Operation:"NewAccessUser",
            Email:email},
        successHandler,
        (err)=>{errorHandler(err)})
}