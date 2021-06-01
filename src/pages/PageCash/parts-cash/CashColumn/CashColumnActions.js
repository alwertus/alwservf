import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function createCashGroup(updateListHandler, sign, name, limit, year, month, column) {
    sendMsg(TARGET,
        {Operation : "CreateCashGroup",
            Sign : sign ? "+" : "-",
            Name : name,
            Limit : limit,
            Year : year,
            Month : month,
            Column : column,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("CreateCashGroup", err)})
}

export function getList(updateListHandler, setTitleHandler, year, month, column) {
    sendMsg(TARGET,
        {Operation : "GetColumnData",
            Year : year,
            Month : month,
            Column : column,
        },
        (rs)=>{
            let list = rs['List']
                .sort((a, b) => {
                    if (a['sign'] === "+" && b['sign'] !== "+") return -1;
                    if (a['sign'] === "-" && b['sign'] !== "-") return 1;
                    if (a['sequence'] !== b['sequence']) return a['sequence'] < b['sequence'];
                    return b['sumLimit'] - a['sumLimit'];
                })
            updateListHandler(list)
            setTitleHandler(rs['ColumnName'] ? rs['ColumnName'] : "Column " + (column + 1))
        },
        (err)=>{console.error("GetGroupList", err); updateListHandler([])})
}
export function columnRename(updateListHandler, year, month, column, newName) {
    sendMsg(TARGET,
        {Operation : "ColumnRename",
            Name : newName,
            Year : year,
            Month : month,
            Column : column,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("ColumnRename", err)})
}