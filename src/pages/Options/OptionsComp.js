import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import style from "./OptionsStyl.module.css";
import {GLOBAL} from "../../store/ActionsStructure";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {OPTIONS} from "../../store/ActionsStructure";

export const OptionsComp = () => {

    const SERVER_LOCAL = "http://192.168.1.8:7000";
    const SERVER_INTERNET = "http://alwertus.zapto.org:7000";

    const server = useSelector(state => state.OptionsServerAddress);
    const [NewServerAddress, setNewServerAddress] = useState(server);
    const dispatch = useDispatch();

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.OPTIONS),[])

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
                        dispatch({type: OPTIONS.SERVER_ADDRESS, newValue: NewServerAddress})
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
                        dispatch({type: OPTIONS.SERVER_ADDRESS, newValue: SERVER_INTERNET})
                        setNewServerAddress(SERVER_INTERNET);
                    }}/>
            </div>
            <div className={style.line}>
                <input
                    type="button"
                    value={"Set Local IP"}
                    onClick={() => {
                        dispatch({type: OPTIONS.SERVER_ADDRESS, newValue: SERVER_LOCAL})
                        setNewServerAddress(SERVER_LOCAL);
                    }}/>
            </div>

        </div>

    </div>
};
