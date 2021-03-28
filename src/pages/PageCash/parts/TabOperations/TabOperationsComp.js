import React, {useEffect, useState} from "react";
import style from "./TabOperationsStyl.module.scss";

import {createOperation, fillFromTemplate, getMonthOperations} from "./TabOperationsActions";
import {useDispatch, useSelector} from "react-redux";
import {OperationComp} from "../Operation/OperationComp";
import {CASH} from "../../../../store/ActionsStructure";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddGroupIcon from '@material-ui/icons/PlaylistAdd';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import EditIcon from '@material-ui/icons/Edit';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";

export const TabOperationsComp = props => {

    let operationList = useSelector(state => state.PageCashOperationList);
    let status = useSelector(state => state.PageCashStatus);
    let [displayedStartDateTime, setDisplayedStartDateTime] = useState((new Date()).getTime());
    let [fillingEditMode, setFillingEditModeState] = useState(false);
    let [savedDate, setSavedDate] = useState();
    let setFillingEditMode = (newValue) => {
        setFillingEditModeState(newValue);

        if (newValue) {
            setSavedDate(displayedStartDateTime);
            setDisplayedStartDateTime((new Date()).setTime(0));
        } else {
            setDisplayedStartDateTime(savedDate);
        }


    }
    // let selectedSheet = useSelector(state => state.PageCashSelectedSheet);
    const dispatch = useDispatch();

    function displayedStartDate() {
        return new Date(displayedStartDateTime);
    }
    function setDisplayedStartDate(d) {
        setDisplayedStartDateTime(d.getTime());
        dispatch({type: CASH.CASH_STATUS, newValue: CASH.CASH_STATUS_VALUES.OUTDATED});
    }

    useEffect(() => {
        // console.log("Tab Operations")
        getMonthOperations(displayedStartDateTime);
    },[displayedStartDateTime])

    let plannedSumPositive = 0,
        plannedSumNegative = 0,
        actualSumPositive = 0,
        actualSumNegative = 0;

    operationList.forEach(e => {
        if (e.isGroupFlag === "N") {
            if (e.sign === "+")  plannedSumPositive += e['planned'];
            else                 plannedSumNegative += e['planned'];

            if (e.actualDate !== undefined)
                if (e.sign === "+") actualSumPositive += e.actual;
                else                actualSumNegative += e.actual;
        }
    })

    if (status === CASH.CASH_STATUS_VALUES.OUTDATED)
        getMonthOperations(displayedStartDateTime);

    let onClickMonthChange = (e) => {
        let d = displayedStartDate();
        d.setMonth(d.getMonth() + parseInt(e.target.getAttribute('val')));
        setDisplayedStartDate(d);
    }

    let renderSection = (sign, title) => <div className={style.section}>
        {/* Operations */}
        <div className={style.moneyCategory}>
            <h2>{title}</h2>
            <div className={style.categoryHeaders}>
                <div className={style.column + " " + style.columnStart}>  </div>
                <div className={style.columnHeader + " " + style.columnEnd}>Planning</div>
                <div className={style.columnHeader + " " + style.columnEnd}>Actual</div>
            </div>

            <div className={style.moneyList}>
                {operationList.map(e => e.sign === sign && e.parentId === undefined
                    ? <OperationComp
                        key={e['id']}
                        e={e}
                        childList={operationList.filter(el => el.parentId === e.id)} />
                    : null)
                }
            </div>

            <div className={style.buttonGroup}>
                <ActionButtonComp
                    customClass={style.button}
                    icon={<AddIcon/>}
                    onClickHandler={()=>createOperation(sign, displayedStartDateTime)}
                />
                <ActionButtonComp
                    customClass={style.button}
                    icon={<AddGroupIcon/>}
                    onClickHandler={()=>createOperation(sign, displayedStartDateTime, "Y")}
                />
            </div>

        </div>
    </div>
    let renderSummary = () => <div className={style.sectionSummary}>
        {fillingEditMode &&
        <div className={style.displayDate} style={{"flex-direction":"column"}}>
            <div className={style.dateText}>EDIT TEMPLATE</div>
        </div>}
        {/* Current Date */}
        {!fillingEditMode && <div className={style.displayDate}>
            <div className={style.monthSwitchBtn} val={-1} onClick={onClickMonthChange}><NavigateBeforeIcon style={{"pointerEvents":"none"}}/></div>
            <div>
                <div className={style.dateText}>{displayedStartDate().toLocaleString('default', {month: 'long'}) + " " + displayedStartDate().getFullYear()}</div>
            </div>
            <div className={style.monthSwitchBtn} val={1} onClick={onClickMonthChange}><NavigateNextIcon style={{"pointerEvents":"none"}}/></div>
        </div>}

        {/* Summary Information */}
        <div className={style.summary}>
            <div className={style.line}>
                <div className={style.column + " " + style.columnStart}>  </div>
                <div className={style.columnHeader + " " + style.columnEnd}>Planning</div>
                <div className={style.columnHeader + " " + style.columnEnd}>Actual</div>
            </div>
            <div className={style.line + " " + style.backgroundGreen}>
                <div className={style.columnStart}>Income</div>
                <div className={style.columnEnd}><div className={style.textGray}>{"+ " + plannedSumPositive}</div></div>
                <div className={style.columnEnd}>{"+ " + actualSumPositive}</div>
            </div>
            <div className={style.line + " " + style.backgroundRed}>
                <div className={style.columnStart}>Expenditure</div>
                <div className={style.columnEnd}><div className={style.textGray}>{"- " + plannedSumNegative}</div></div>
                <div className={style.columnEnd}>{"- " + actualSumNegative}</div>
            </div>
            <div className={style.line}>
                <div className={style.columnStart}>Ballance</div>
                <div className={style.columnEnd}><div className={style.textGray}>{"= " + (plannedSumPositive - plannedSumNegative)}</div></div>
                <div className={style.columnEnd}>{"= " + (actualSumPositive - actualSumNegative)}</div>
            </div>
        </div>
    </div>

    return <div className={style.wrapper + (fillingEditMode ? " " + style.wrapperEditMode : "")}>
        <div className={style.header}>

            <div className={style.fillRepeating}>
                <div className={style.fillingButtonGroup}>
                    <ActionButtonComp
                        onClickHandler={() => setFillingEditMode(!fillingEditMode)}
                        icon={<EditIcon style={{"font-size":"3em","color":"#32b7ead1"}}/>}
                    />
                    {!fillingEditMode && <ActionButtonComp
                        onClickHandler={() => fillFromTemplate(displayedStartDateTime)}
                        icon={<OfflineBoltIcon style={{"font-size":"3em","color":"#1DAF2CD1"}}/>}
                    />}
                </div>
            </div>

            <div className={style.sectionSummaryWrapper}>
                {renderSummary()}
            </div>
            <div className={style.fillRepeating}> </div>
        </div>

        {renderSection("+", "Income")}
        {renderSection("-", "Expenditure")}
    </div>
};