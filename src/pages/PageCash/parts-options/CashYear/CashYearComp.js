import React from "react";
import style from "./CashYearStyl.module.css";

export const CashYearComp = props => {

    return <div className={props.firstOrLast ? style.wrapperSmall : style.wrapper}
                onClick={() => props.onClick(props.year)}>
        {props.year}
    </div>
}
