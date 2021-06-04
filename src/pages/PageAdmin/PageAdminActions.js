import {getAuthHeader} from "../Login/LoginActions";

export function sendUserCreate(url, newUser, setResultTextHandler, setResultStatusHandler) {

    let rsStatus;

    fetch(url,{
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            operation : "CreateUser",
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
        })
    }).then( (res) => {
        rsStatus = res.status;
        return res.json();
    }).then(txt => {
        if (rsStatus !== 200) {
            let rsError = txt.error;
            setResultTextHandler(rsError);
            setResultStatusHandler(-1);
            return;
        }

        if (txt.result === "Error") {
            setResultTextHandler(txt.error);
            setResultStatusHandler(-1);
            return;
        }

        setResultTextHandler("User created");
        setResultStatusHandler(1);

    }).catch( e => {
        setResultTextHandler(e);
        setResultStatusHandler(-1);
    });
}
