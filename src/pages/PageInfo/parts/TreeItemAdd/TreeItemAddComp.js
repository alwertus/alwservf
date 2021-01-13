import React, {useState} from "react";
import style from "./TreeItemAddStyl.module.scss";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import OkIcon from "@material-ui/icons/CheckCircleRounded";
import {INFO} from "../../../../store/ActionsStructure";
import {upsert} from "./TreeItemAddActions";
import {useDispatch} from "react-redux";

export const TreeItemAddComp = props => {
    let [titleText, setTitleText] = useState(props.defaultText);
    const dispatch = useDispatch();

    let onOKClickHandler = () => {
        if (!titleText || titleText === "" || props.defaultText === titleText) return;
        console.log("ONCLICK", "id", "parent", titleText)
        upsert(titleText, props.id);
    }

    let onChangeTitleHandler = (e) => {
        setTitleText(e.target.value);
    }

    let onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onOKClickHandler();
        }
        if (e.key === 'Escape') {
            dispatch({type:INFO.SET_TREE_MODE, newValue:INFO.TREE_MODE.NORMAL})
        }
    }

    return <div className={style.wrapper}>
        <div className={style.elementLine}>
            <div className={style.inputWrapper}>
                <input className={style.input} placeholder="Title" onChange={onChangeTitleHandler} onKeyDown={onKeyPressHandler} autoFocus={true} defaultValue={props.defaultText}/>
            </div>
            <ActionButtonComp icon={<OkIcon style={{color: "#05520c"}}/>} onClickHandler={onOKClickHandler}/>
        </div>
    </div>
};
