import React, {useState} from "react";
import style from "./TreeItemStyl.module.scss";
import {INFO} from "../../../../store/ActionsStructure";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import {useDispatch, useSelector} from "react-redux";
import {MoveElementComp} from "../MoveElement/MoveElementComp";

export const TreeItemComp = props => {
    let privateExpandedSet = new Set(useSelector(state => state.PageInfoPrivateExpandedSet));
    let dispatch = useDispatch();

    let onClickExpandCollapseIcon = () => {
        if (privateExpandedSet.has(props.item.id)) {
            privateExpandedSet.delete(props.item.id)
        }
        else {
            privateExpandedSet.add(props.item.id);
        }
        dispatch({type: INFO.PRIVATE_EXPANDED_SET, newValue: Array.from(privateExpandedSet)});
    }

    let onMouseEnter = () => {
        if (props.mode === INFO.TREE_MODE.MOVE)
            props.setMoveToElement(props.item.id)
    }

    let onMouseLeave = () => {
        props.setMoveToElement(0)
    }

    function addChildrenToBadSet(childrenArr, badSet) {
        if (childrenArr === undefined || childrenArr === null) return;
        childrenArr.forEach(e => {
            badSet.add(e.id);
            addChildrenToBadSet(e.children, badSet)
        })
    }

    let onStartMove = () => {
        props.setMode(INFO.TREE_MODE.MOVE)
        let badSet = new Set();
        badSet.add(props.item.id);

        addChildrenToBadSet(props.item.children, badSet)
        props.setBadMoveSet(badSet);
    }

    let onEndMove = (startId, endId) => {
        console.log(startId, endId, props.item.id)
        /////////action

        console.log(props.badMoveSet)
        // if (props.moveToElement === props.item.id) {
            if (props.badMoveSet.has(endId))
                console.log("NOT MOVE")
            else
                console.log("MOVE " + startId + " to " + endId)
        // }

        props.setMode(INFO.TREE_MODE.NORMAL)
        // props.setMoveToElement(0)
    }

    let drawChildren = () => {
        if (!props.item.children || !privateExpandedSet.has(props.item.id)) return;
        return <div className={style.childrenContainer}>
            <div className={style.childrenWrapper}>
                {props.item.children.map(e =>
                    <TreeItemComp
                        key={e.id}
                        item={e}
                        mode={props.mode}
                        setMode={props.setMode}
                        setMoveToElement={props.setMoveToElement}
                        moveToElement={props.moveToElement}
                        badMoveSet={props.badMoveSet}
                        setBadMoveSet={props.setBadMoveSet}
                    />)
                }
            </div>
        </div>
    }

    let drawIcon = () => {
        if (!props.item.children || props.item.children.length === 0)
            return <div className={style.emptyIcon}><DotIcon fontSize={"small"}/></div>;
        return <div className={style.expandCollapseIcon} onClick={onClickExpandCollapseIcon}>
            {privateExpandedSet.has(props.item.id)
                ? <ExpandMoreIcon style={{"pointerEvents": "none"}}/>
                : <ChevronRightIcon style={{"pointerEvents": "none"}}/>}
        </div>
    }

    function calcMoveClass() {
        if (props.moveToElement === props.item.id) {
            if (props.badMoveSet.has(props.item.id))
                return " " + style.badSelected;
            else
                return " " + style.selected;
        } else
            return "";
    }

    return <div className={style.wrapper}>
            <div className={style.elementLine}>
                {drawIcon()}
                <div className={ style.title + calcMoveClass() }
                     id={props.item.id}
                     onMouseEnter={onMouseEnter}
                     onMouseLeave={onMouseLeave}>
                    {"[" + props.item.id + "] " + props.item.title}
                </div>
                <MoveElementComp setMode={props.setMode} onStartMove={onStartMove} onEndMove={onEndMove} id={props.item.id}/>
            </div>
            {drawChildren()}
     </div>
};
