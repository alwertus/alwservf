import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./InfoTreeStyl.module.scss";
import {INFO} from "../../../../store/ActionsStructure";
import {TreeItemAddComp} from "../TreeItemAdd/TreeItemAddComp";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import CancelIcon from "@material-ui/icons/BlockOutlined";
import AddIcon from "@material-ui/icons/ControlPointRounded";
import {setPageInfoTreeMode} from "./InfoTreeActions";
import {TreeItemComp} from "../TreeItem/TreeItemComp";

export const InfoTreeComp = props => {
    const treeMode = useSelector(state => state.PageInfoTreeMode);
    const pageInfoListPrivate = useSelector(state => state.PageInfoListPrivate);
    const pageInfoListPublic = useSelector(state => state.PageInfoListPublic);
    const dispatch = useDispatch();
    let [rootClass, setRootClass] = useState("");


    let onRootMouseEnter = () => {
        if (treeMode === INFO.TREE_MODE.MOVE) {
            setRootClass(" " + style.moveSelected);
        }
    }

    let onRootMouseLeave = () => {
        setRootClass("");
    }

    let onRootClick = () => {
        if (treeMode === INFO.TREE_MODE.EDIT) return;
        dispatch({type:INFO.SELECTED_PAGE, newValue:""})
        dispatch({type:INFO.PAGE_MODE, newValue: INFO.PAGE_MODE_VALUES.NOT_SELECTED})
    }

    let drawAddItem = () => treeMode === INFO.TREE_MODE.ADD ? <TreeItemAddComp id={0}/> : null;

    let drawAddButton = () => (treeMode === INFO.TREE_MODE.ADD || treeMode === INFO.TREE_MODE.EDIT)
        ? <ActionButtonComp
            icon={<CancelIcon fontSize="large"/>}
            onClickHandler={()=>{dispatch(setPageInfoTreeMode(INFO.TREE_MODE.NORMAL))}}
            color={"#940202d9"}/>
        : <ActionButtonComp
            icon={<AddIcon fontSize="large"/>}
            onClickHandler={()=>{dispatch(setPageInfoTreeMode(INFO.TREE_MODE.ADD))}}
            color={"#05520cd9"}
        />



    return <div className={style.wrapper}>



        <div className={props.styleCellUp}>
            {drawAddButton()}
        </div>

        <div className={props.styleCellDown}>
            <div className={style.rootElement + rootClass}
                 id={0}
                 onClick={onRootClick}
                 onMouseEnter={onRootMouseEnter}
                 onMouseLeave={onRootMouseLeave}>
                root</div>
            {drawAddItem()}
            {pageInfoListPrivate.map(e =>
                <TreeItemComp
                    key={e.id}
                    item={e}
                />)}
            {pageInfoListPublic.map(e =>
                <TreeItemComp
                    key={e.id}
                    item={e}
                />)}
        </div>
    </div>
};
