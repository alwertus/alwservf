import React from "react";
import style from "./ActionButtonStyl.module.scss";

export const ActionButtonComp = props => {

    function drawIfParamExists(param, classname) {
        if (param)
            return <div className={classname} style={{"pointerEvents":"none"}}>{param}</div>
    }

    return <div className={style.wrapper} onClick={props.onClickHandler} style={{color : props.color}}>
        {drawIfParamExists(props.icon, style.icon)}
        {drawIfParamExists(props.title, style.title)}
    </div>
};
