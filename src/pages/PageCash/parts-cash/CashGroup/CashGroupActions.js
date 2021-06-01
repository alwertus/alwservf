import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function changeGroupLimit(updateListHandler, id, limit) {
    sendMsg(TARGET,
        {Operation : "ChangeGroupLimit",
            Id : id,
            Limit : limit,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("ChangeGroupLimit", err)})
}

export function changeGroupName(updateListHandler, id, name) {
    sendMsg(TARGET,
        {Operation : "ChangeGroupName",
            Id : id,
            Name : name,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("ChangeGroupName", err)})
}
export function changeGroupSign(updateListHandler, id, sign) {
    sendMsg(TARGET,
        {Operation : "ChangeGroupSign",
            Id : id,
            Sign : sign,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("ChangeGroupSign", err)})
}
export function deleteGroup(updateListHandler, id) {
    sendMsg(TARGET,
        {Operation : "DeleteGroup",
            Id : id,
        },
        (rs)=>{updateListHandler()},
        (err)=>{console.error("DeleteGroup", err)})
}
