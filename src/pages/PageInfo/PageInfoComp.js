import React, {useEffect, useState} from "react";
import style from "./PageInfoStyl.module.scss";
import {getLocalStorageValue} from "../../store/LocalStorage";
import {ResizerComp} from "../../components/Resizer/ResizerComp";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";

export const PageInfoComp = () => {
    const [panelWidth, setPanelWidth] = useState(Number(getLocalStorageValue('MenuPanelWidth', 100)));

    useEffect(() =>updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.INFO),[])

    return <div className={style.wrapper}>
        <div className={style.panelMenu} style={{"width":panelWidth+"px"}}>
            <div className={style.cellMenu}>1</div>
            <div className={style.cellInfo}>3</div>
        </div>
        <ResizerComp currentValue={panelWidth} setNewValue={setPanelWidth} />
        <div className={style.panelInfo}>
            <div className={style.cellMenu}>2</div>
            <div className={style.cellInfo}>4</div>
        </div>
    </div>
};
