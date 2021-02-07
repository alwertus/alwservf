import {getAuthHeader} from "../../../Login/LoginActions";
import store from "../../../../store/Store";
import {INFO} from "../../../../store/ActionsStructure";
import {convertToTree} from "../InfoTree/InfoTreeActions";

export function upsert(newTitle, id, parentId) {
    let url = store.getState().OptionsServerAddress + "/api/v1/infolist";
    const dispatch = store.dispatch;
    let rsStatus = 0;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            Operation : "Upsert",
            Id : id,
            Title : newTitle,
            Parent: parentId
        })
    }).then( (rs) => {
        rsStatus = rs.status;
        return rs.json();
    }).then(rs => {
        // console.log("RESULT", rs, rsStatus)
        if (rsStatus !== 200) {
            // let rsError = rs.error;
            // setResultTextHandler(rsError);
            // setResultStatusHandler(-1);
            return;
        }
/*
        if (txt.result === "Error") {
            setResultTextHandler(txt.error);
            setResultStatusHandler(-1);
            return;
        }

        // setResultTextHandler("User created");
        // setResultStatusHandler(1);*/
        dispatch({type:INFO.SET_TREE_MODE, newValue: INFO.TREE_MODE.NORMAL})
        dispatch({type: INFO.PRIVATE_LIST_DATA, newValue: convertToTree(rs['PRIVATE'])});

    }).catch( e => {
        console.error("ERROR", e)
        // setResultTextHandler(e);
        // setResultStatusHandler(-1);
    });
}