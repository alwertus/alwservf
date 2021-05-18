import React, {useState} from "react";
import style from "./ResizerStyl.module.css";
import {setLocalStorageValue} from "../../store/LocalStorage";

export const ResizerComp = props => {
    let [mouseStartPos, setMouseStartPos] = useState(0);
    let [startValue, setStartValue] = useState(0);
    let [onMove, setOnMove] = useState(false);

    let handleMouseDown = (e) => {
        setMouseStartPos(e.clientX);
        setStartValue(props.currentValue);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('touchend', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);

        setOnMove(true);
    }
    let handleMouseUp = (e) => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);

        window.removeEventListener('touchend', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);

        let newValue = e.clientX - mouseStartPos + startValue;
        setLocalStorageValue('MenuPanelWidth', newValue);
        setOnMove(false);
    }
    let handleMouseMove = (e) => {
        let newValue = e.clientX - mouseStartPos + startValue;
        if (newValue === props.currentValue || newValue <= 0)
            return;
        props.setNewValue(newValue);
    }

    return <div className={style.wrapper + (onMove ? " " + style.onMove : "")} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
    </div>
};