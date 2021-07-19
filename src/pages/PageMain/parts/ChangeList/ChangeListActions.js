import {sendMsg} from "../../../../common/SendMsg";

export function getNews(updateListHandler) {
    sendMsg("news",
        {Operation: "GetNews"},
        (rs) => {
            updateListHandler(rs['List'])
        },
        (e)=>{console.error("ERR", e)}
    )
}