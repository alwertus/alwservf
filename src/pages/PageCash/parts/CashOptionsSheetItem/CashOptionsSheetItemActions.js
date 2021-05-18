import {sendMsg} from "../../../../common/SendMsg";

export function setActiveSheet(sheetId, successHandler) {
    sendMsg("cash",
        {Operation:"SetActiveSheet",
            SheetId: sheetId
        },
        successHandler,
        (err)=>{console.error(err)})
}

export function deleteSheet(sheetId, successHandler) {
    sendMsg("cash",
        {Operation:"DeleteSheet",
            SheetId: sheetId
        },
        successHandler,
        (err)=>{console.error(err)})
}
