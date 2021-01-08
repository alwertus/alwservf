import React from "react";
import style from "./PageMainStyl.module.scss";
import {useSelector} from "react-redux";

export const PageMainComp = (props) => {

    const server = useSelector(state => state.OptionsServerAddress);
    const txt = useSelector(state => state.UserAuthorities);

    const onLoginClick1 = () => {
        console.clear();
        console.log(txt.includes('admin'));
    }
    const onLoginClick2 = () => {
    }
    const onLoginClick3 = () => {
    }

    return <div className={style.wrapper}>
        <p style={{color: "#ff0000"}} >Адрес сервера = {server}</p>
        <div>
            <input type="button" onClick={onLoginClick1} value="button 1"/>
            <input type="button" onClick={onLoginClick2} value="button 2"/>
            <input type="button" onClick={onLoginClick3} value="button 3"/>
        </div>

    </div>
};