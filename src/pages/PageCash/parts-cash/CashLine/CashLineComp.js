import React, {useEffect, useRef, useState} from "react";
import style from "./CashLineStyl.module.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SmsIcon from '@material-ui/icons/Sms';
import {deleteLine, updateLineField} from "./CashLineActions";
import {DialogBoxComp} from "../../../../components/DialogBox/DialogBoxComp";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Checkbox from '@material-ui/core/Checkbox';

function useOutsideAlerter(ref, outsideClickHandler) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target))
                outsideClickHandler()
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [outsideClickHandler, ref]);
}

export const CashLineComp = props => {
    const el = props.element
    const id = el['id']
    const updateListHandler = props['updateListHandler']
    const [name, setName] = useState(el['name'])
    const [plan, setPlan] = useState(el['sumPlan'])
    const [fact, setFact] = useState(el['sumActual'])
    const [completed, setCompleted] = useState(el['completed'])
    const completedDate = (new Date(el['completedDate'])).toLocaleString();
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [additionalOpen, setAdditionalOpen] = useState(false)
    const [comment, setComment] = useState(el['comment'] ? el['comment'] : "")

    const renderCashTr = (obj) => <td className={style.cashTD}>{obj}</td>

    const popupRef = useRef(null);
    useOutsideAlerter(popupRef, () => {
        setAdditionalOpen(false)
        if (el['comment'] !== comment)
            updateLineField(updateListHandler, id, "comment", comment)
    })

    return <tr className={style.cashTR}>
        {renderCashTr(<Checkbox
            checked={completed}
            onChange={(e) => {
                setCompleted(e.target.checked)
                updateLineField(updateListHandler, id, "completed", e.target.checked)
                if (e.target.checked && fact.toString() === "0")
                    setFact(plan)
            }}
            name="isCompleted"
            color={"primary"}
        />)}
        {renderCashTr(<input
            className={style.input}
            placeholder="Name"
            value={name}
            onBlur={() => {
                if (el['name'].toString() !== name.toString())
                    updateLineField(updateListHandler, id, "name", name)}}
            onChange={e => setName(e.target.value)}/>)}
        {renderCashTr(<input
            className={style.input}
            placeholder="Planned sum"
            value={plan}
            onBlur={() => {
                if (el['sumPlan'].toString() !== plan.toString())
                    updateLineField(updateListHandler, id, "sumPlan", plan)}}
            onChange={e => !isNaN(e.target.value) && setPlan(e.target.value)}/>)}
        {renderCashTr(<input
            className={style.input}
            placeholder="Actual sum"
            value={fact}
            onBlur={() => {
                if (el['sumActual'].toString() !== fact.toString())
                    updateLineField(updateListHandler, id, "sumActual", fact)}}
            onChange={e => !isNaN(e.target.value) && setFact(e.target.value)}/>)}
        {renderCashTr(<div>
            <ActionButtonComp
                icon={comment ? <SpeakerNotesIcon/> : <SmsIcon/>}
                color={comment ? "#414441" : "#565856a3"}
                onClickHandler={() => {setAdditionalOpen(!additionalOpen)}}/>

            <TransitionGroup>
                {additionalOpen && <CSSTransition
                    timeout={100}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enterActive: style.infoAnimShow,
                        exitActive: style.infoAnimHide
                    }}>
                    <div className={style.additionalInfoWindow} ref={popupRef}>
                        <textarea
                            className={style.textArea}
                            value={comment}
                            autoFocus={true}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className={style.status}>{completed ? "Completed " + completedDate : "Not completed"}</div>
                    </div>
                </CSSTransition>}
            </TransitionGroup>

        </div>)}

        {renderCashTr(<ActionButtonComp
            icon={<DeleteForeverIcon/>}
            color={"#7d4040"}
            onClickHandler={() => {setConfirmOpen(true)}}/>)}

        <DialogBoxComp
            message={"Are you Shura?"}
            onClickOk={() => deleteLine(updateListHandler, id)}
            dialogOpen={confirmOpen}
            setDialogOpen={setConfirmOpen} />
    </tr>
}