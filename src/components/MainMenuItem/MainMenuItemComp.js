import React from "react";
import style from "./MainMenuItemStyl.module.scss";
import {useHistory} from "react-router";

export const MainMenuItemComp = props => {
    const history = useHistory();

    const onClick = (val) => {
        history.push('/' + val.target.id);
        // window.location.reload();
    }

    return <div
        className={style.wrapper}
        id = {props.id}
        onClick={onClick}
    >
        {props.title}
    </div>
};
