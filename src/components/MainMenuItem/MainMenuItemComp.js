import React from "react";
import style from "./MainMenuItemStyl.module.css";
import {useHistory} from "react-router";
import {updateActivePage} from "../MainMenu/MainMenuActions";
import {useSelector} from "react-redux";

export const MainMenuItemComp = props => {
    const history = useHistory();
    const activePage = useSelector(state => state.ActivePage);

    const onClick = (val) => {
        history.push('/' + val.target.id);
        updateActivePage(props.name);
        // window.location.reload();
    }

    function showIfElementExists(divClassName, element) {
        if (element)
            return <div className={divClassName}>
                {element}
            </div>
    }

    return <div className={style.wrapper + (props.name === activePage ? " " + style.act : "")}
                id = {props.id}
                onClick={onClick} >
        {showIfElementExists(style.text, props.title)}
        {showIfElementExists(style.ico, props.icon)}
    </div>
};
