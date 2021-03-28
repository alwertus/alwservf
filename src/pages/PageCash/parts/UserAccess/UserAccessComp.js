import React from "react";
import style from "./UserAccessStyl.module.scss";

export const UserAccessComp = props => {

    return <div className={style.wrapper}>
        <div className={style.buttonWrapper}>
            <button onClick={()=>{props.removeHandler(props.id)}}>-</button>
        </div>

        {props.name}
        {/*{ props.id + " " + props.name + " " + props.access }*/}
    </div>
};