import React, {useEffect, useState} from "react";
import style from "./PageInfoStyl.module.scss";
import {getLocalStorageValue} from "../../store/LocalStorage";
import {ResizerComp} from "../../components/Resizer/ResizerComp";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";
import {InfoTreeComp} from "./parts/InfoTree/InfoTreeComp";

export const PageInfoComp = () => {
    const [panelWidth, setPanelWidth] = useState(Number(getLocalStorageValue('MenuPanelWidth', 100)));

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.INFO),[])

    return <div className={style.wrapper}>
        <div className={style.panelMenu} style={{"width":panelWidth+"px", "minWidth":panelWidth+"px", "maxWidth":panelWidth+"px"}}>
            <InfoTreeComp
                styleCellUp={style.cellUp}
                styleCellDown={style.cellDown}
            />
        </div>

        <ResizerComp currentValue={panelWidth} setNewValue={setPanelWidth} />

        <div className={style.panelPage}>

            <div className={style.cellUp}>2</div>

            <div className={style.cellDown}>4</div>

        </div>
    </div>
}