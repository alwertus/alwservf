import React, {useEffect, useState} from "react";
import style from "./PageAdminStyl.module.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {sendUserCreate} from "./PageAdminActions";
import {useSelector} from "react-redux";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";

export const PageAdminComp = () => {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    });
    const [resultText, setResultText] = useState("");
    const [resultStatus, setResultStatus] = useState(0);
    const server = useSelector(state => state.OptionsServerAddress);

    const handleChange = (prop) => (event) => {
        setResultText('');
        setResultStatus(0);
        setValues({...values, [prop] : event.target.value});
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickUserCreate();
        }
    }

    const onClickUserCreate = () => {
        if (!values.firstname ||
            !values.lastname ||
            !values.email ||
            !values.password ||
            !values.password2) {
            setResultText("Error! All fields are required");
            setResultStatus(-1);
            return;
        }
        if (values.password !== values.password2) {
            setResultText("Error! Password do not match");
            setResultStatus(-1);
            return;
        }

        sendUserCreate(server + "/api/v1/user/create",
            {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password },
            setResultText,
            setResultStatus
            );
    }

    function getClassNameFromResultStatus() {
        switch (resultStatus) {
            case -1 : return style.statusError;
            case 1 : return style.statusOK;
            default : return "";
        }
    }

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.ADMIN),[])

    return <div className={style.wrapper}>
        <div className={style.newUserWrapper}>

            <h2>Create new user</h2>

            <div className={style.newUserInput}>
                <TextField  id="firstname"
                            label="First Name"
                            variant="outlined"
                            onKeyPress={handleKeyPress}
                            onChange={ handleChange('firstname') } /></div>

            <div className={style.newUserInput}>
                <TextField  id="lastname"
                            label="Last Name"
                            variant="outlined"
                            onKeyPress={handleKeyPress}
                            onChange={ handleChange('lastname') } /></div>

            <div className={style.newUserInput}>
                <TextField  id="email"
                            label="Email"
                            variant="outlined"
                            onKeyPress={handleKeyPress}
                            onChange={ handleChange('email') } /></div>

            <div className={style.newUserInput}>
                <TextField  id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onKeyPress={handleKeyPress}
                            onChange={ handleChange('password') } /></div>

            <div className={style.newUserInput}>
                <TextField  id="password2"
                            label="Password Confirm"
                            type="password"
                            variant="outlined"
                            onKeyPress={handleKeyPress}
                            onChange={ handleChange('password2') } /></div>

            <div className={style.newUserButton}>
                <Button variant="contained" onClick={onClickUserCreate}>
                    Create
                </Button></div>

            <h4>Result: </h4>
            <h3 className={getClassNameFromResultStatus()}>{resultText}</h3>

        </div>
    </div>
}