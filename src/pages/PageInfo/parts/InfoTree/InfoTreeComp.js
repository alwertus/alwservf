import React, {useState} from "react";
import {useSelector} from "react-redux";
import style from "./InfoTreeStyl.module.scss";
import {INFO} from "../../../../store/ActionsStructure";
import {TreeItemAddComp} from "../TreeItemAdd/TreeItemAddComp";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import CancelIcon from "@material-ui/icons/BlockOutlined";
import AddIcon from "@material-ui/icons/ControlPointRounded";
import {getTreeList} from "./InfoTreeActions";
import {TreeItemComp} from "../TreeItem/TreeItemComp";

export const InfoTreeComp = props => {
    const [treeMode, setTreeMode] = useState(INFO.TREE_MODE.ADD);
    const [moveToElement, setMoveToElement] = useState(0);
    const [badMoveSet, setBadMoveSet] = useState();

    let pageInfoListPrivate = useSelector(state => state.PageInfoListPrivate);
    let pageInfoListPublic = useSelector(state => state.PageInfoListPublic);

    let drawAddItem = () => treeMode === INFO.TREE_MODE.ADD ? <TreeItemAddComp setModeHandler={setTreeMode}/> : null;

    let drawAddButton = () => treeMode === INFO.TREE_MODE.ADD
        ? <ActionButtonComp
            icon={<CancelIcon fontSize="large"/>}
            onClickHandler={()=>{setTreeMode(INFO.TREE_MODE.NORMAL)}}
            color={"#940202d9"}
        />
        : <ActionButtonComp
            icon={<AddIcon fontSize="large"/>}
            onClickHandler={()=>{setTreeMode(INFO.TREE_MODE.ADD)}}
            color={"#05520cd9"}
        />

    return <div className={style.wrapper}>

        <div className={props.styleCellUp}>
            {drawAddButton()}
            <ActionButtonComp title={"GetList"} onClickHandler={()=>{getTreeList()}}/>
            <ActionButtonComp icon={"i3"} title={"Title 3"}/>
        </div>

        <div className={props.styleCellDown}>
            {drawAddItem()}
            {pageInfoListPrivate.map(e =>
                <TreeItemComp
                    key={e.id}
                    item={e}
                    mode={treeMode}
                    setMode={setTreeMode}
                    setMoveToElement={setMoveToElement}
                    moveToElement={moveToElement}
                    badMoveSet={badMoveSet}
                    setBadMoveSet={setBadMoveSet}
                />)}
            {pageInfoListPublic.map(e =>
                <TreeItemComp
                    key={e.id}
                    item={e}
                />)}
        </div>
    </div>
};
