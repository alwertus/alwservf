import React from "react";
import style from "./ResizerStyl.module.scss";
import {setLocalStorageValue} from "../../store/LocalStorage";

export const ResizerComp = props => {
    let mouseStartPos = 0;

    let handleMouseDown = (e) => {
        mouseStartPos = e.nativeEvent.screenX - props.currentValue;
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
    }
    let handleMouseUp = () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        setLocalStorageValue('MenuPanelWidth', props.currentValue);
    }
    let handleMouseMove = (e) => {
        let newWidth = e.screenX-mouseStartPos;
        if (props.currentValue === newWidth) return;
        props.setNewValue(newWidth);
    }

    return <div className={style.wrapper} onMouseDown={handleMouseDown}>

    </div>
};