import {getAuthHeader} from "../../Login/LoginActions";
import store from "../../../store/Store";

export function runAppAction(id, action, setIsDataActualHandler) {
    let url = store.getState().OptionsServerAddress + "/api/v1/applications/" + action + "/" + id;

    fetch( url, {
        method: "POST",
        headers: getAuthHeader(),
    })
        .then(rs => rs.json())
        .then((rs) => {
                console.log(action, id, "=>", rs.result);
                setIsDataActualHandler(false);
            }
        );
}