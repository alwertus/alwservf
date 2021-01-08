import store from "../../store/Store";
import {getAuthHeader} from "../Login/LoginActions";

export function getAppsStatus(setProgramListHandler) {
    let url = store.getState().OptionsServerAddress + "/api/v1/applications/status";

    fetch(url, {
        method: "POST",
        headers: getAuthHeader(),
    })
        .then(rs => rs.json())
        .then((rs) => {
            if (Array.isArray(rs)) {
                console.log("Refresh => OK");
                setProgramListHandler(rs);
            }}
        );
}

export function reloadApplicationsConfig(setIsDataActualHandler) {
    let url = store.getState().OptionsServerAddress + "/api/v1/applications/config/reload";

    fetch(url, {
        method: "POST",
        headers: getAuthHeader(),
    })
        .then(rs => rs.json())
        .then((rs) => {
            console.log("Reload config", "=>", rs.result);

            setIsDataActualHandler(false);
            }
        );
}