import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function updateLineField(updateListHandler, id, field, newValue) {
    sendMsg(TARGET,
        {Operation : "LineUpdateField",
            Id : id,
            Field : field,
            NewValue: newValue
        },
        ()=>{updateListHandler()},
        (err)=>{console.error("LineUpdateField", err)})
}

export function deleteLine(updateListHandler, id) {
    sendMsg(TARGET,
        {Operation : "DeleteLine",
            Id : id
        },
        ()=>{updateListHandler()},
        (err)=>{console.error("DeleteLine", err)})
}