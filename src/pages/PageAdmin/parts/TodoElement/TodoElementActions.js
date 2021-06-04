import {sendMsg} from "../../../../common/SendMsg";

export function updateField(updateListHandler, id, field, value) {
    sendMsg("todo", {
        Operation: "UpdateField",
        Id: id,
        Field: field,
        Value: value,
    }, () => {
        updateListHandler()
    })
}