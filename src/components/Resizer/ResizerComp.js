import React, {useState} from "react";
import style from "./ResizerStyl.module.scss";
import {setLocalStorageValue} from "../../store/LocalStorage";

export const ResizerComp = props => {
    let [mouseStartPos, setMouseStartPos] = useState(0);
    let [startValue, setStartValue] = useState(0);

    let handleMouseDown = (e) => {
        setMouseStartPos(e.clientX);
        setStartValue(props.currentValue);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
    }
    let handleMouseUp = (e) => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);

        let newValue = e.clientX - mouseStartPos + startValue;
        setLocalStorageValue('MenuPanelWidth', newValue);
    }
    let handleMouseMove = (e) => {
        let newValue = e.clientX - mouseStartPos + startValue;
        if (newValue === props.currentValue || newValue <= 0)
            return;
        props.setNewValue(newValue);
    }

    return <div className={style.wrapper} onMouseDown={handleMouseDown}>
    </div>
};