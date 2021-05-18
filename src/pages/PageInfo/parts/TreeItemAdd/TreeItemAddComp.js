import React, {useState} from "react";
import style from "./TreeItemAddStyl.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import OkIcon from "@material-ui/icons/CheckCircleRounded";
import {INFO} from "../../../../store/ActionsStructure";
import {upsert} from "./TreeItemAddActions";
import {useDispatch, useSelector} from "react-redux";

export const TreeItemAddComp = props => {
    let [titleText, setTitleText] = useState(props.defaultText);
    const infoSelectedPage = useSelector(state => state.InfoSelectedPage);
    const dispatch = useDispatch();

    let onOKClickHandler = () => {
        if (!titleText || titleText === "") return;
        if (props.defaultText === titleText) {
            cancel();
            return;
        }

        console.log("ONCLICK parent", infoSelectedPage)
        upsert(titleText, props.id, infoSelectedPage);
    }

    let onChangeTitleHandler = (e) => {
        setTitleText(e.target.value);
    }

    function cancel() {
        dispatch({type:INFO.SET_TREE_MODE, newValue:INFO.TREE_MODE.NORMAL})
    }

    let onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onOKClickHandler();
        }
        if (e.key === 'Escape') {
            cancel();
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
