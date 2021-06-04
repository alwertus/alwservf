import React, {useEffect, useState} from "react";
import style from "./TodoElementStyl.module.css";
import {updateField} from "./TodoElementActions";

export const TodoElementComp = props => {
    const updateListHandler = props.updateListHandler;

    const el = props.element
    const id = el['id']
    const created = new Date(el['created'])
    const requestor = el['requestor']
    const requestorCurrent = el['isRequestorCurrent']
    const [description, setDescription] =  useState(el['description'])

    const [completed, setCompleted] = useState(!!el['completed'])
    const [decision, setDecision] = useState(el['decision'] ? el['decision'] : "")
    const executor = el['executor']
    const [executorCurrent, setExecutorCurrent] = useState(el['isExecutorCurrent'])

    useEffect(() => {
        if (!completed) {
            if (completed !== (!!el['completed']))
            updateField(updateListHandler, id, "completed", false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completed])

    return <div className={style.wrapper}>

        <div className={style.line}>
            <div>
                <input type={"checkbox"}
                       value={"completed"}
                       checked={completed}
                       onChange={(e) => {
                           setCompleted(e.target.checked)
                           if (e.target.checked)
                               setExecutorCurrent(true)
                       }}
                       disabled={!executorCurrent && completed}/>
            </div>
            <div>#{id}</div>
            <div className={style.date}>{created.toLocaleString()}</div>
        </div>
        <div className={style.line}>
            <div>{requestor}</div>
        </div>

        <div className={style.line}>
            {requestorCurrent
                ? <textarea
                    className={style.textArea}
                    value={description}
                    onBlur={() => {
                        if (el['description'] !== description)
                            updateField(updateListHandler, id, "description", description)
                    }}
                    onChange={(e) => setDescription(e.target.value)} />
                : <code className={style.textArea}>{description}</code>
            }


        </div>

        {completed && <div className={style.line}>
            {executor}
        </div>}

        {completed && <div className={style.line}>
            {executorCurrent
                ? <textarea
                    className={style.textArea}
                    value={decision}
                    onBlur={() => {
                        if (el['decision'] !== decision)
                            updateField(updateListHandler, id, "decision", decision)

                    }}
                    onChange={(e) => setDecision(e.target.value)} />
                : <code className={style.textArea}>
                    {decision}
                </code>}
        </div>}

    </div>
}