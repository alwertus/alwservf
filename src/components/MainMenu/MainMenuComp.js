import {useSelector} from "react-redux";
import React from "react";
import style from "./MainMenuStyl.module.scss";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import {MainMenuItemComp} from "../MainMenuItem/MainMenuItemComp";
import {GLOBAL} from "../../store/ActionsStructure";

export const MainMenuComp = () => {
    const isAuthorized = useSelector(state => state.IsAuthorized);
    const firstName = useSelector(state => state.UserFirstName);
    const lastName = useSelector(state => state.UserLastName);
    const userAuthorities = useSelector(state => state.UserAuthorities);
    const userName = isAuthorized
        ? firstName + " " + lastName
        : "Humanoid";

    function drawIfAuthorized(obj) {
        if (isAuthorized) return obj;
    }

    function drawIfAdmin(obj) {
        if (userAuthorities.includes('admin')) return obj;
    }

    return <div className={style.topArea}>
        <div className={style.pageList}>
                              <MainMenuItemComp id="" title="Main" name={GLOBAL.ACTIVE_PAGE_LIST.MAIN} />
            {drawIfAuthorized(<MainMenuItemComp id="info" title="Info" name={GLOBAL.ACTIVE_PAGE_LIST.INFO} />)}
            {drawIfAuthorized(<MainMenuItemComp id="doings" title="Doings" name={GLOBAL.ACTIVE_PAGE_LIST.DOINGS} />)}
            {drawIfAuthorized(<MainMenuItemComp id="applications" title="App" name={GLOBAL.ACTIVE_PAGE_LIST.APP} />)}
            {drawIfAuthorized(drawIfAdmin(<MainMenuItemComp id="administration" title="Admin" name={GLOBAL.ACTIVE_PAGE_LIST.ADMIN} />))}
        </div>
        <div className={style.user}>
            <div className={style.userName}>{userName}</div>
            <MainMenuItemComp id="login" icon=<AccountCircleIcon/> name={GLOBAL.ACTIVE_PAGE_LIST.LOGIN} />
            <MainMenuItemComp id="options" icon=<BuildIcon/> name={GLOBAL.ACTIVE_PAGE_LIST.OPTIONS} />
        </div>
    </div>
};
