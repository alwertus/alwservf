import {getAuthHeader} from "../../../Login/LoginActions";
import store from "../../../../store/Store";

export function upsert(newTitle) {
    let url = store.getState().OptionsServerAddress + "/api/v1/infolist";
    let rsStatus = 0;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            // Operation : "GetAll",
            Operation : "Upsert",
            Id : 0,
            Parent : 2,
            Title : newTitle
        })
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(txt => {
        console.log("RESULT", txt, rsStatus)
        /*if (rsStatus !== 200) {
            let rsError = txt.error;
            // setResultTextHandler(rsError);
            // setResultStatusHandler(-1);
            return;
        }

        if (txt.result === "Error") {
            setResultTextHandler(txt.error);
            setResultStatusHandler(-1);
            return;
        }

        // setResultTextHandler("User created");
        // setResultStatusHandler(1);

*/

    }).catch( e => {
        console.error("ERROR", e)
        // setResultTextHandler(e);
        // setResultStatusHandler(-1);
    });
}