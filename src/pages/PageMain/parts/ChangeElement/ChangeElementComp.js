import React from "react";
import style from "./ChangeElementStyl.module.css";

export const ChangeElementComp = props => {
    const el = props.element
    const completed = new Date(el['completed'])
    const decision = el['decision']
    const author = el['executor']

    return <div className={style.wrapper}>
        <div className={style.title}>
            <div className={style.author}>{author}</div>
            <div className={style.date}>{completed.toLocaleString()}</div>
        </div>
        <div>
            <code className={style.content}>
                {decision}
            </code>

        </div>

    </div>
}