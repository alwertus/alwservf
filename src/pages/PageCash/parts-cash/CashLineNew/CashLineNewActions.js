import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function addLine(updateListHandler, groupId, name, planned, actual) {
    sendMsg(TARGET,
        {Operation : "AddLine",
            GroupId : groupId,
            Name : name,
            Planned : planned,
            Actual : actual,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("AddLine", err)})
}