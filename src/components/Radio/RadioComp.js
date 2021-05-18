import React from "react";
import style from "./RadioStyl.module.css";
import {TextEditComp} from "../TextEdit/TextEditComp";

export const RadioComp = props => {
    return <div className={style.wrapper}>
        <input type="checkbox"
               id = {props.element.id}
               checked={props.checked}
               onChange={props.onChangeHandler}
        />
        <div className={style.divId}>
            #{props.element.id}
        </div>
        <TextEditComp
            className = {style.text}
            text = {props.element.name}
            emptyText = {"noname"}
            allowEmptyText = {false}
            changeTextHandler = {(newText) => props.renameHandler(newText, props.element.id)}
        />
    </div>
};