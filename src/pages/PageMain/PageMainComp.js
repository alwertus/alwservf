import React, {useEffect} from "react";
import style from "./PageMainStyl.module.css";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";

export const PageMainComp = () => {

    // const server = useSelector(state => state.OptionsServerAddress);
    //
    // const onClick = () => {
    //     sendMsg("test", {Operation : "GetSheets"})
    // }
    /*const onLoginClick2 = () => {
    }
    const onLoginClick3 = () => {
    }*/

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.MAIN),[])

    /*
    <div>
            <input type="button" onClick={onLoginClick1} value="button 1"/>
            <input type="button" onClick={onLoginClick2} value="button 2"/>
            <input type="button" onClick={onLoginClick3} value="button 3"/>
        </div>
     */

    return <div className={style.wrapper}>
        {/*<p style={{color: "#ff0000"}} >Адрес сервера = {server}</p>*/}
        {/*<input type="button" onClick={onClick} value="Test"/>*/}
    </div>
};
