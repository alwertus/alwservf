import store from "../../store/Store";
import {AUTH} from "../../store/ActionsStructure";

/*export function sendLogin(url, login, password, setErrorTextHandler) {
    let dispatch = store.dispatch;

    let headers = new Headers();
    headers.append("Authorization", 'Basic ' + Buffer.from(login + ":" + password).toString('base64'));

    let rsStatus;

    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify({operation : "GetUser"})
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(txt => {
        if (rsStatus !== 200) {
            let rsError = txt.error;
            setErrorTextHandler(rsError);
            return;
        }

        dispatch({type: AUTH.IS_AUTHORIZED, newValue: true });
        dispatch({type: AUTH.FIRST_NAME, newValue: txt.FIRSTNAME });
        dispatch({type: AUTH.LAST_NAME, newValue: txt.LASTNAME });
        dispatch({type: AUTH.EMAIL, newValue: login });
        dispatch({type: AUTH.PASSWORD, newValue: password });
        dispatch({type: AUTH.AUTHORITIES, newValue: txt.AUTHORITIES.map(a => a.authority) });

        console.log(" CONVERTED << ", txt);

    }).catch( e => {
        console.log(" ERR << ", e);
        setErrorTextHandler(e);
    });
}*/

export function tryToLogin(login, password, errorTextHandler) {
    let dispatch = store.dispatch;
    let url = store.getState().OptionsServerAddress + "/login";
    let rsStatus;

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "username": login,
            "password": password
        })
    }).then((rs) => {
            rsStatus = rs.status;
            return rs.json();
        }).then((rs) => {
            if (rsStatus !== 200) {
                let rsError = rs.error;
                errorTextHandler(rsError);
                return;
            }
            dispatch({type: AUTH.IS_AUTHORIZED, newValue: true});
            dispatch({type: AUTH.FIRST_NAME, newValue: rs.Firstname});
            dispatch({type: AUTH.LAST_NAME, newValue: rs.Lastname});
            dispatch({type: AUTH.EMAIL, newValue: login});
            dispatch({type: AUTH.AUTHORITIES, newValue: rs.Authorities.map(a => a.authority)});
            dispatch({type: AUTH.TOKEN, newValue: rs.Authorization});
        }).catch( e => { errorTextHandler(e); });

}

export function logout() {
    let dispatch = store.dispatch;
    dispatch({type: AUTH.IS_AUTHORIZED, newValue: false});
    dispatch({type: AUTH.FIRST_NAME, newValue: ""});
    dispatch({type: AUTH.LAST_NAME, newValue: ""});
    dispatch({type: AUTH.EMAIL, newValue: ""});
    dispatch({type: AUTH.AUTHORITIES, newValue: ""});
    dispatch({type: AUTH.TOKEN, newValue: ""});
}

export function getAuthHeader() {
    let headers = new Headers();
    headers.append("Authorization", store.getState().UserToken);
    return headers;
}