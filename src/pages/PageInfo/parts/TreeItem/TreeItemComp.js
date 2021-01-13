import React, {useState} from "react";
import style from "./TreeItemStyl.module.scss";
import {INFO} from "../../../../store/ActionsStructure";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import {useDispatch, useSelector} from "react-redux";
import {MoveElementComp} from "../MoveElement/MoveElementComp";
import {setPageInfoTreeMode} from "../InfoTree/InfoTreeActions";
import {TreeItemAddComp} from "../TreeItemAdd/TreeItemAddComp";

export const TreeItemComp = props => {
    const privateExpandedSet = new Set(useSelector(state => state.PageInfoPrivateExpandedSet));
    const badTargetsToMove = useSelector(state => state.PageInfoBadTargetsToMove);
    const infoSelectedPage = useSelector(state => state.InfoSelectedPage);
    let mode = useSelector(state => state.PageInfoTreeMode);
    const [selectedClass, setSelectedClass] = useState("");
    const dispatch = useDispatch();

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
        if (mode === INFO.TREE_MODE.MOVE) {
            if (badTargetsToMove.has(props.item.id))
                setSelectedClass(" " + style.badSelected);
            else
                setSelectedClass(" " + style.selected);
        }
    }

    let onMouseLeave = () => {
        setSelectedClass("");
    }

    let onClick = () => {
        if (mode === INFO.TREE_MODE.EDIT) return;
        dispatch({type:INFO.SELECTED_PAGE, newValue:props.item.id})
    }

    let onDoubleClick = () => {
        dispatch(setPageInfoTreeMode(INFO.TREE_MODE.EDIT));
    }

    let drawChildren = () => {
        if (!props.item.children || !privateExpandedSet.has(props.item.id)) return;
        return <div className={style.childrenContainer}>
            <div className={style.childrenWrapper}>
                {props.item.children.map(e =>
                    <TreeItemComp
                        key={e.id}
                        item={e}
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

    let drawLine = () => {
        if (mode === INFO.TREE_MODE.EDIT && props.item.id === infoSelectedPage)
            return <TreeItemAddComp
                defaultText={props.item.title}
                id={props.item.id}
            />

        return <div className={ style.title + selectedClass + (props.item.id === infoSelectedPage ? " " + style.showedPage : "")}
                    id={props.item.id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onDoubleClick={onDoubleClick}
                    onClick={onClick}
        >
            {"[" + props.item.id + "] " + props.item.title}
        </div>
    }

    let drawMoveElement = () => {
        if (mode === INFO.TREE_MODE.EDIT && props.item.id === infoSelectedPage) return;
        return <MoveElementComp
            item={props.item}/>
    }

    return <div className={style.wrapper}>
            <div className={style.elementLine}>
                {drawIcon()}
                {drawLine()}
                {drawMoveElement()}
            </div>
            {drawChildren()}
     </div>
};
