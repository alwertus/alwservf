import React from "react";
import style from "./InfoPageStyl.module.scss";
import {useSelector} from "react-redux";

export const InfoPageComp = props => {

    const infoSelectedPage = useSelector(state => state.InfoSelectedPage);
    const treeMode = useSelector(state => state.PageInfoTreeMode);

    return <div className={style.wrapper}>
        <div className={style.cellUp}>22</div>

        <div className={style.cellDown}>
            <div></div>
            {infoSelectedPage}
            <div>{treeMode}</div>
        </div>
    </div>
};
