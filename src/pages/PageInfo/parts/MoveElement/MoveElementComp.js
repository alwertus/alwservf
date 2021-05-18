import React, {useState} from "react";
import style from "./MoveElementStyl.module.css";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {useDispatch} from "react-redux";
import {setPageInfoTreeMode} from "../InfoTree/InfoTreeActions";
import {INFO} from "../../../../store/ActionsStructure";
import {calcBadTargetsToMove, move} from "./MoveElementActions";

export const MoveElementComp = props => {
    const [isMouseDown, setMouseDown] = useState(false);
    // let badTargetsToMove = useSelector(state => state.PageInfoBadTargetsToMove);
    const dispatch = useDispatch();

    let handleMouseDown = (e) => {
        dispatch({type:INFO.MOVE_BAD_TARGETS, newValue: calcBadTargetsToMove(props.item)});
        window.addEventListener('mouseup', handleMouseUp);
        setMouseDown(true);
        dispatch(setPageInfoTreeMode(INFO.TREE_MODE.MOVE));

    }
    let handleMouseUp = (e) => {
        setMouseDown(false)

        dispatch(setPageInfoTreeMode(INFO.TREE_MODE.NORMAL))
        window.removeEventListener('mouseup', handleMouseUp);

        let badSet = calcBadTargetsToMove(props.item);
        let currentParent = Number.parseInt(props.item.parent);
        let fromId = Number.parseInt(props.item.id);
        let toId = Number.parseInt(e.target.id);

        if(!isNaN(toId) && !badSet.has(toId) && currentParent !== toId) {
            move(fromId, toId);
            console.log("Move " + fromId + " to " + toId);
        }

    }

    return <div className={style.wrapper} onMouseDown={handleMouseDown}>
        <DragIndicatorIcon style={{"pointerEvents": "none"}} className={isMouseDown ? style.moved : ""}/>
    </div>
};