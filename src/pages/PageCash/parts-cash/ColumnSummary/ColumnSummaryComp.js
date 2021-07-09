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

    let allMinusPlan = list.reduce((prev, cur) => cur['sign'] === "-" ? prev + cur['sumLimit'] : prev, 0)

    let allMinusFact = list.reduce((prev, cur) => cur['sign'] === "-"
        ? prev + cur.lines.reduce((p,c) => c['completed'] ? p + c['sumActual'] : p ,0)
        : prev, 0)

    let isIncomeRight = allPlusPlan > allPlusFact

    return <div className={style.wrapper}>
        {SvgDiagram(350,
        [
            {   begin: "fact:",
                end: "plan:",},
            {   begin: allPlusFact ? allPlusFact : "0",
                center: "\u2190 income \u2192",
                end: allPlusPlan ? allPlusPlan : "0",},
        ],[
            {
                totalValue: isIncomeRight ? allPlusPlan : allPlusFact,
                parts: [
                    {   value: isIncomeRight ? allPlusFact : allPlusPlan,
                        color: "#6D8764"},
                    {   value: isIncomeRight ? allPlusPlan - allPlusFact : allPlusFact - allPlusPlan,
                        color: isIncomeRight ? "#0000" : "#0f0"},
                ]
            },{
                totalValue: allPlusPlan,
                parts: [
                    {   value: allMinusFact,
                        color: "#bd7777"},
                    {   value: allMinusPlan - allMinusFact,
                        color: "#fad9d5"},
                ]
            },
        ], [
            {   begin: allMinusFact ? allMinusFact : "0",
                center: "\u2190 spent \u2192",
                end: allMinusPlan ? allMinusPlan : "0",},
            {   begin: (allPlusFact && allMinusFact) ? allPlusFact - allMinusFact : "0",
                center: "\u2190 left \u2192",
                end: (allPlusPlan && allMinusPlan) ? allPlusPlan - allMinusPlan : "0"},
        ])}
    </div>
}