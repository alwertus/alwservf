import React, {useState} from "react";
import style from "./OperationStyl.module.scss";
import {changeData, createChildOperation, removeRecord} from "../TabOperations/TabOperationsActions";
import {TextEditComp} from "../../../../components/TextEdit/TextEditComp";
import AddIcon from '@material-ui/icons/Add';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const EMPTY = "empty";

export const OperationComp = props => {
    let el = props.e;
    let isGroup = el['isGroupFlag'] === "Y";
    let isChild = el.parentId !== undefined;

    const [completed, setCompleted] = useState(el.actualDate !== undefined)
    const [modeShowChild, setModeShowChild] = useState(true);

    let sumPlaning = el['planned'];
    let sumActual = el['actual'];

    // Подсчёт значений, если это группа
    if (isGroup) {
        sumPlaning = sumActual = 0;

        props.childList.map(e => {
            sumPlaning += e['planned'];
            if (e.actualDate !== undefined)
                sumActual += e['actual'];
        })
    }

    return <div className={style.wrapper}>
        <div className={style.line}>
            {/* Show/Hide button */}
            {isGroup &&
            <ActionButtonComp
                icon={modeShowChild ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                onClickHandler={() => setModeShowChild(!modeShowChild)}
            />
                // <button onClick={() => setModeShowChild(!modeShowChild)}/>}
            }

            {/* Complete checkbox */}
            {!isGroup && <input
                type="checkbox"
                defaultChecked={completed}
                onChange={(cb) => {
                    setCompleted(cb.target.checked);
                    // if (cb.target.checked && (actual === 0 || actual === '0'))
                    //     setActual(el.planned);
                    changeData(el.id, "completed", cb.target.checked);
                }}/>}

            {/* Add child button */}
            {isGroup && <ActionButtonComp
                icon={<AddIcon/>}
                onClickHandler={()=>createChildOperation(el.id)}
            />}

            {/* Name and Description */}
            <div className={style.category1}>
                <TextEditComp
                    className = {style.columnName}
                    text = {el.name}
                    emptyText = {EMPTY}
                    allowEmptyText = {false}
                    changeTextHandler = {(newText) => changeData(el.id, "name", newText)}
                />
                <TextEditComp
                    className = {style.columnDescription}
                    text = {el.description}
                    emptyText = {EMPTY}
                    changeTextHandler = {(newText) => {changeData(el.id, "description", newText)}}
                />
            </div>

            {/* Switch sign button */}
            {!isChild  &&
            <button onClick={()=> {
                let newValue = el.sign === "-" ? "+"
                                               : "-";
                changeData(el.id, "sign", newValue);}}>
                {el.sign}
            </button>}

            {/* sum Planing and sum Actual */}
            <div className={style.category2}>
                <TextEditComp
                    readonly = {isGroup}
                    className = {style.columnPlanned}
                    text = {sumPlaning}
                    type = "number"
                    emptyText = {"0"}
                    allowEmptyText = {false}
                    changeTextHandler = {(newText) => changeData(el.id, "planned", newText)}
                />
                <TextEditComp
                    readonly = {isGroup}
                    className = {style.columnPlanned}
                    text = {sumActual}
                    type = "number"
                    emptyText = {"0"}
                    allowEmptyText = {false}
                    changeTextHandler = {(newText) => changeData(el.id, "actual", newText)}
                />
            </div>

            {/* Delete button */}
            <button onClick={() => removeRecord(el.id)}>DEL</button>

        </div>

        {/* Child list */}
        {isGroup && modeShowChild && <div className={style.childList}>
            {props.childList.map(e => <OperationComp
                key={e['id']}
                e={e}
            />)}
        </div>}
    </div>
};