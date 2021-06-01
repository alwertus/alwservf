import React, {useEffect, useState} from "react";
import style from "./CashTabStyl.module.css";
import {getSheetParam} from "./CashTabActions";
import {CashColumnComp} from "../CashColumn/CashColumnComp";

export const CashTabComp = props => {

    const selectedYear = props.year;
    const selectedMonth = props.month;
    const [columnCount, setColumnCount] = useState(0)
    const [sheetName, setSheetName] = useState("")
    const [columnList, setColumnList] = useState([]);

    useEffect(() => getSheetParam(setColumnCount, setSheetName), []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        (columnCount !== 0) &&
            setColumnList(new Array(columnCount)
                .fill(null)
                .map((el, index) =>
                    <CashColumnComp
                        key={index}
                        index={index}
                        year={selectedYear}
                        month={selectedMonth}
                    />
                ))
        }, [columnCount, selectedMonth, selectedYear])

    return <div className={style.wrapper}>
        <div className={style.columnsWrapper}>
            {columnList.map(el => el)}
        </div>
    </div>
}