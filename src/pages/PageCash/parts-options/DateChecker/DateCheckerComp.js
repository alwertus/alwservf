import React, {useState} from "react";
import style from "./DateCheckerStyl.module.css";
import {CashYearComp} from "../CashYear/CashYearComp";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const DateCheckerComp = props => {

    const currentYear = props.year;
    const setCurrentYear = props.setYear;
    const currentMonth = props.month;
    const setCurrentMonth = props.setMonth;
    const [yearList, setYearList] = useState([currentYear - 1, currentYear, currentYear + 1])
    const monthNames = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];


    const onClick = (e) => {
        setCurrentYear(e);
        let newList = yearList.slice();

        if (e === yearList[0]) {
            newList.pop()
            newList.unshift(e - 1)
        } else if (e === yearList[yearList.length - 1]) {
            newList.shift()
            newList.push(e + 1)
        }
        setYearList(newList);
    }

    return <div className={style.wrapper}>
        <div className={style.yearContainer}>
            <TransitionGroup>
                {yearList.map((e,index) =>
                    <CSSTransition  key={e}
                                    timeout={500}
                                    mountOnEnter
                                    unmountOnExit
                                    classNames={{
                                        enterActive: style.yearAnimShow,
                                        // enterDone: style.year,
                                        exitActive: style.yearAnimHide
                                    }}>
                        <CashYearComp key={e} year={e} onClick={onClick} firstOrLast={index===0 || index===(yearList.length-1)}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>

        <div className={style.monthContainer}>
            {monthNames.map((e, index) =>
                <div key = {index}
                    className={style.month + (monthNames[currentMonth] === e ? " " + style.monthChecked : "")}
                    onClick={() => setCurrentMonth(index)}>
                    {e}
            </div>)}
        </div>

        {/*{currentYear + " " + monthNames[currentMonth]}*/}
    </div>
}