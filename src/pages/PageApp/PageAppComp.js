import React, {useEffect, useState} from "react";
import style from "./PageAppStyl.module.css";
import Button from '@material-ui/core/Button';
import {getAppsStatus, reloadApplicationsConfig} from "./PageAppActions";
import {ServerApplicationComp} from "./ServerApplication/ServerApplicationComp";
import {useSelector} from "react-redux";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";

export const PageAppComp = () => {

    let [programList, getProgramList] = useState([]);
    let [isDataActual, setIsDataActual] = useState(false);
    const isAdmin = useSelector(state => state.UserAuthorities).includes('admin');

    let onClickReloadConfig = () => {
        reloadApplicationsConfig(setIsDataActual);
    }
    let onClickRefresh = () => {
        getAppsStatus(getProgramList);
    }

    let drawProgram = (item) => {
        return <ServerApplicationComp key={item.id} id={item.id} isWorking={item.sp.exists} title={item.title} drawActions={isAdmin} setIsDataActualHandler={setIsDataActual}/>
    }

    useEffect(() => {
        if (!isDataActual) {
            setIsDataActual(true);
            setTimeout(function() { onClickRefresh(); }, 500);
        }
    }, [isDataActual])

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.APP),[])

    return <div className={style.wrapper}>

        <div className={style.controls}>
            <div className={style.button}>
                <Button variant="contained" onClick={onClickReloadConfig}>
                    Reload Config
                </Button></div>

            <div className={style.button}>
                <Button variant="contained" onClick={onClickRefresh}>
                    Refresh
                </Button></div>
        </div>

        {programList.map(item => drawProgram(item))}

    </div>
};
