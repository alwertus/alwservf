import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import style from "./OptionsStyl.module.scss";

export const OptionsComp = () => {
    const SERVER_LOCAL = "https://192.168.1.8:5188";
    const SERVER_INTERNET = "https://alwertus.zapto.org";
    const SERVER_DISPATCH = "OPTIONS__SERVER_ADDRESS";

    const server = useSelector(state => state.OptionsServerAddress); // Redux param
    const [NewServerAddress, setNewServerAddress] = useState(server);
    const dispatch = useDispatch();

    return <div className={style.wrapper}>
        <div className={style.serverAddress}>
            <div className={style.line}>
                <span>Server Address: <b>{server}</b></span>
            </div>
            <div className={style.line}>
                <input
                    type="button"
                    value={"Set custom"}
                    onClick={() => {
                        dispatch({type: SERVER_DISPATCH, newValue: NewServerAddress})
                    }}/>
                <input type="text"
                       defaultValue={server}
                       onChange={(e) => {
                           setNewServerAddress(e.target.value)
                       }}/>
            </div>
            <div className={style.line}>
                <input
                    type="button"
                    value={"Set Internet IP"}
                    onClick={() => {
                        dispatch({type: SERVER_DISPATCH, newValue: SERVER_INTERNET})
                        setNewServerAddress(SERVER_INTERNET);
                    }}/>
            </div>
            <div className={style.line}>
                <input
                    type="button"
                    value={"Set Local IP"}
                    onClick={() => {
                        dispatch({type: SERVER_DISPATCH, newValue: SERVER_LOCAL})
                        setNewServerAddress(SERVER_LOCAL);
                    }}/>
            </div>

        </div>

    </div>
};
