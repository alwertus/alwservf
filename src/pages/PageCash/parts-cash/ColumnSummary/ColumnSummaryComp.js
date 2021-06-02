import React from "react";
import style from "./ColumnSummaryStyl.module.css";
import {SvgDiagram} from "../../../../common/SvgDiagram";

export const ColumnSummaryComp = props => {
    const list = props.list

    let allPlusPlan = list.reduce((prev, cur) => cur['sign'] === "+"
        ? prev + cur.lines.reduce((p,c) => p + c['sumPlan'] ,0)
        : prev, 0)

    let allPlusFact = list.reduce((prev, cur) => cur['sign'] === "+"
        ? prev + cur.lines.reduce((p,c) => c['completed'] ? p + c['sumActual'] : p ,0)
        : prev, 0)

    // let allMinusPlan = list.reduce((prev, cur) => cur['sign'] === "-" ? prev + cur['sumLimit'] : prev, 0)

    let allMinusFact = list.reduce((prev, cur) => cur['sign'] === "-"
        ? prev + cur.lines.reduce((p,c) => c['completed'] ? p + c['sumActual'] : p ,0)
        : prev, 0)

    return <div className={style.wrapper}>
        {SvgDiagram(350, 70, [
            {current: {
                value : allPlusFact,
                color:"#6D8764",
                colorBad:"#654747",
                text: "income: " + allPlusFact},
            total: {
                value : allPlusPlan,
                color:"#FFF",
                colorBad:"#ff9393",
                text: "income plan: " + allPlusPlan},
            },{
            current: {
                value : allMinusFact,
                color:"#ff9393",
                colorBad:"#690707",
                text: "spent: " + allMinusFact},
            total: {
                value : allPlusPlan,
                color:"#FFF",
                colorBad:"#F00",}, }
        ])}
    </div>
}