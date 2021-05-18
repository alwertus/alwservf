import {sendMsg} from "../../../../common/SendMsg";

const TARGET = "cash";

export function changeAccess(userId, newAccess) {
    sendMsg(TARGET,
        {Operation:"ChangeAccess",
            UserId: userId,
            NewAccess: newAccess},
        () => {},
        (err)=>{console.error(err)})
}

export function removeAccess(userId, updateUsersHandler) {
    sendMsg(TARGET,
        {Operation:"RemoveAccess",
            UserId: userId},
        () => {updateUsersHandler()},
        (err)=>{console.error(err)})
}
