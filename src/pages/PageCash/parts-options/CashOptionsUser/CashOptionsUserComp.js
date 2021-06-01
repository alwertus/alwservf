import React, {useState} from "react";
import style from "./CashOptionsUserStyl.module.css";
import Slider from '@material-ui/core/Slider';
import {changeAccess, removeAccess} from "./CashOptionsUserActions";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {DialogBoxComp} from "../../../../components/DialogBox/DialogBoxComp";

const accessMap = [
    {letter: "B", value: 0},
    {letter: "R", value: 1},
    {letter: "W", value: 2},
]

export const CashOptionsUserComp = props => {
    const el = props.element;
    const [accessVal, setAccessVal] = useState(accessMap.filter(e=>e.letter === el['access'])[0].value);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const setAccessValue = (event, newValue) => {
        if (newValue === accessVal) return;
        setAccessVal(newValue)
        changeAccess(el['id'], accessMap.filter(e=>e.value === newValue)[0].letter)
    }

    return <div className={style.wrapper}>

        <div className={style.deleteButton}>
            {<ActionButtonComp
                icon={<DeleteForeverIcon/>}
                color={props.canWrite ? "#7d4040" : "#00000038"}
                onClickHandler={() => {props.canWrite && setDialogOpen(true)}}
            />}
        </div>


        <div className={style.name}>
            <div className={style.up}>{el['firstName'] + " " + el['lastName']}</div>
            <div className={style.dn}>{el['email']}</div>
        </div>
        <div className={style.access}>
            <Slider
                disabled={!props.canWrite}
                max={2}
                value={accessVal}
                step={1}
                onChange={setAccessValue}
                valueLabelDisplay="off"
                marks={
                    [{  value: 0,
                        label: 'Ban'},
                    {   value: 1,
                        label: 'Read Only'},
                    {   value: 2,
                        label: 'Write'}]}
            />
        </div>

        <DialogBoxComp
            message={"Are you Shura?"}
            onClickOk={() => removeAccess(el['id'], props.updateUserListHandler)}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen} />

    </div>
}