import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function getSheetParam(setColumnCountHandler, setSheetNameHandler) {
    sendMsg(TARGET,
        {Operation:"GetSheetParam"},
        (rs)=>{
            setColumnCountHandler(rs['ColumnCount']);
            setSheetNameHandler(rs['Name'])
        },
        (err)=>{console.error("GetSheetParam", err)})
}