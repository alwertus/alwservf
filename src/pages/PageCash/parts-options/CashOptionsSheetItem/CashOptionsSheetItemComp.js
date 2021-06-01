import React from "react";
import style from "./CashOptionsSheetItemStyl.module.css";
import {deleteSheet, setActiveSheet} from "./CashOptionsSheetItemActions";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {DialogBoxComp} from "../../../../components/DialogBox/DialogBoxComp";

export const CashOptionsSheetItemComp = props => {
    const isActive = props.element['active'];
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const canWrite = props.element['access'] === "W";

    return <div className={style.wrapper + (isActive ? " " + style.activeWrapper : "")}>
        <div className={style.info}>
            <div className={style.radioButton}
                 onClick={() => {if (!isActive) setActiveSheet(props.element['sheetId'], props.updateSheetHandler)}}>
                {isActive ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>}
            </div>

            {props.element['sheetName']}
        </div>

        /columns=2/

        <div className={style.deleteWrapper}>
            {!isActive && <ActionButtonComp
                icon={<DeleteForeverIcon/>}
                color={canWrite ? "#7d4040" : "#00000038"}
                onClickHandler={() => {canWrite && setDialogOpen(true)}}
            />}
        </div>

        <DialogBoxComp
            message={"Are you Shura?"}
            onClickOk={() => deleteSheet(props.element['sheetId'],  props.updateSheetHandler)}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen} />

    </div>
}