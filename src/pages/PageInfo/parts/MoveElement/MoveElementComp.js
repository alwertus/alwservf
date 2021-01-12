import React, {useState} from "react";
import style from "./MoveElementStyl.module.scss";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

export const MoveElementComp = props => {
    let [isMouseDown, setMouseDown] = useState(false);

    let handleMouseDown = (e) => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        setMouseDown(true)
        props.onStartMove();
    }
    let handleMouseUp = (e) => {
        console.log(e.target.id)
        setMouseDown(false)
        props.onEndMove(props.id, e.target.id);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);

    }
    let handleMouseMove = (e) => {
    }

    return <div className={style.wrapper} onMouseDown={handleMouseDown}>
        <DragIndicatorIcon style={{"pointerEvents": "none"}} className={isMouseDown ? style.moved : ""}/>
    </div>
};
