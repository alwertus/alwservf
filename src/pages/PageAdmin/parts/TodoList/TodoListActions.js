import {sendMsg} from "../../../../common/SendMsg";

export function getTodo(updateListHandler) {
    sendMsg("todo",
        {Operation: "GetTodoList"},
        (rs) => {
            updateListHandler(rs['List'])
        },
        (e)=>{console.error("ERR", e)}
    )
}

export function createTodo(updateListHandler, description) {
    sendMsg("todo", {
        Operation: "Create",
        Description: description
    }, () => {
        updateListHandler()
    })
}