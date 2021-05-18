import React from "react";
import style from "./CashOptionsSheetItemStyl.module.css";
import {deleteSheet, setActiveSheet} from "./CashOptionsSheetItemActions";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

        <div className={style.deleteWrapper}>
            {!isActive && <ActionButtonComp
                icon={<DeleteForeverIcon/>}
                color={canWrite ? "#7d4040" : "#00000038"}
                onClickHandler={() => {canWrite && setDialogOpen(true)}}
            />}
        </div>

        <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            fullWidth={true}
            aria-labelledby="alert-dialog-slide-title">
            <DialogTitle>Are you shure?</DialogTitle>
            <DialogActions>
                <Button onClick={() => {setDialogOpen(false)}} color="primary">Cancel</Button>
                <Button onClick={() => {
                    deleteSheet(props.element['sheetId'],  props.updateSheetHandler);
                    setDialogOpen(false)}}
                        color="primary">Delete</Button>
            </DialogActions>
        </Dialog>

    </div>
}