import React, {useEffect, useState} from "react";
import style from "./CashColumnStyl.module.css";
import {CashGroupComp} from "../CashGroup/CashGroupComp";
import {CashGroupNewComp} from "../CashGroupNew/CashGroupNewComp";
import {columnRename, createCashGroup, getList} from "./CashColumnActions";
import {ColumnSummaryComp} from "../ColumnSummary/ColumnSummaryComp";
import DescriptionIcon from '@material-ui/icons/Description';
import {ThunderboltOutlined} from "@ant-design/icons";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export const CashColumnComp = props => {
    const index = props.index
    const year = props.year
    const month = props.month
    const [list, setList] = useState([])
    const [title, setTitle] = useState("Column " + (index + 1))
    const [titleLoaded, setTitleLoaded] = useState("Column " + (index + 1))

    const setTitles = (val) => {
        setTitle(val)
        setTitleLoaded(val)
    }

    const updateList = () => {
        getList(setList, setTitles, year, month, index);
    }

    const forceUpdateList = () => {
        setList([])
        updateList()
    }

    const addGroupHandler = (sign, name, limit) => {
        createCashGroup(updateList, sign, name, limit, year, month, index)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(forceUpdateList,[year, month, index])

    return <div className={style.wrapper}>
        <div className={style.headerLine}>
            <div className={style.title}>
                <DescriptionIcon/>
                <input
                    value={title}
                    onChange={e => {setTitle(e.target.value)}}
                    onBlur={() => {if (title !== titleLoaded)
                        columnRename(updateList, year, month, index, title)}
                    }
                />
            </div>
            {/*<button className={style.button} type="button" onClick={forceUpdateList}>Autofill</button>*/}
            <ActionButtonComp
                icon={<ThunderboltOutlined />}
                customClass={style.button}
                onClickHandler={forceUpdateList}
            />
            <ActionButtonComp
                icon={<DoubleArrowIcon style={{transform: "rotate(-90deg)"}}/>}
                customClass={style.button}
                onClickHandler={forceUpdateList}
            />
        </div>

        <div className={style.summary}>
            <CashGroupNewComp onAdd={addGroupHandler}/>
            <ColumnSummaryComp list={list}/>
        </div>

        <div className={style.filling}>
            {list && list.map((el,index) => <CashGroupComp
                key={index}
                element={el}
                updateListHandler={updateList}
            />)}
        </div>
    </div>
}