import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogBoxComp = props => {

    const message = props['message']
    const onClickOk = props['onClickOk']
    const dialogOpen = props['dialogOpen']
    const setDialogOpen = props['setDialogOpen']

    return <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        fullWidth={true}
        aria-labelledby="alert-dialog-slide-title">
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
            <Button onClick={() => {setDialogOpen(false)}} color="primary">Cancel</Button>
            <Button onClick={() => {onClickOk(); setDialogOpen(false)}} color="primary">Ok</Button>
        </DialogActions>
    </Dialog>
};