import React, {useState} from "react";
import style from "./TreeItemAddStyl.module.scss";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import OkIcon from "@material-ui/icons/CheckCircleRounded";
import {INFO} from "../../../../store/ActionsStructure";
import {upsert} from "./TreeItemAddActions";

export const TreeItemAddComp = props => {
    let [titleText, setTitleText] = useState("");

    let onOKClickHandler = () => {
        if (!titleText || titleText === "") return;
        console.log("ONCLICK", "id", "parent", titleText)
        upsert(titleText);
    }

    let onChangeTitleHandler = (e) => {
        setTitleText(e.target.value);
    }

    let onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onOKClickHandler();
        }
        if (e.key === 'Escape') {
            props.setModeHandler(INFO.TREE_MODE.NORMAL)
        }
    }

    return <div className={style.wrapper}>
        <div className={style.elementLine}>
            <input className={style.input} placeholder="Title" onChange={onChangeTitleHandler} onKeyDown={onKeyPressHandler} autoFocus={true}/>
            <ActionButtonComp icon={<OkIcon style={{color: "#05520c"}}/>} onClickHandler={onOKClickHandler}/>
        </div>
    </div>
};
