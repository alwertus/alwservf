import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./LoginStyl.module.scss";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {sendLogin} from "./LoginActions";
import {AUTH, GLOBAL} from "../../store/ActionsStructure";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";

export const LoginComp = props => {
    updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.LOGIN);

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        login: '',
        password: '',
    });
    const [errortext, seterrortext] = useState('');
    const server = useSelector(state => state.OptionsServerAddress);
    const isAutorized = useSelector(state => state.IsAuthorized);

    const handleChange = (prop) => (event) => {
        seterrortext('');
        setValues({...values, [prop] : event.target.value});
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickSignIn();
        }
    }

    const onClickSignIn = () => {
        if (!values.login || !values.password) {
            seterrortext("Error! Email or Password is empty");
            return;
        }

        sendLogin(server + "/api/v1/user/current", values.login, values.password, seterrortext);
    }

    const onClickLogout = () => {
        dispatch({type: AUTH.IS_AUTHORIZED, newValue: false });
        dispatch({type: AUTH.FIRST_NAME, newValue: "" });
        dispatch({type: AUTH.LAST_NAME, newValue: "" });
        dispatch({type: AUTH.AUTHORITIES, newValue: [] });
        dispatch({type: AUTH.PASSWORD, newValue: "" });
        dispatch({type: AUTH.EMAIL, newValue: "" });
    }

    return isAutorized
        ?
            <div className={style.wrapper}>
                <div className={style.centerArea}>
                    <div className={style.buttonDiv}>
                        <Button variant="contained" onClick={onClickLogout} >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        :
            <div className={style.wrapper}>
                <div className={style.centerArea}>
                    <div className={style.inputText}>
                        <TextField
                            id="auth-email"
                            label="Email"
                            variant="outlined"
                            onChange={handleChange('login')}
                            onKeyPress={handleKeyPress}/>
                    </div>
                    <div className={style.inputText}>
                        <TextField
                            id="auth-password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={handleChange('password')}
                            onKeyPress={handleKeyPress}/>
                    </div>
                    <div className={style.buttonDiv}>
                        <Button variant="contained" onClick={onClickSignIn} >
                            Sign In
                        </Button>
                    </div>
                    <div className={style.errorText}>
                        {errortext}
                    </div>

                </div>
            </div>
};
