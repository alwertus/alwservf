import React, {useState} from "react";
import style from "./CashLineNewStyl.module.css";
import {addLine} from "./CashLineNewActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const CashLineNewComp = props => {
    const groupId = props['groupId']
    const updateListHandler = props['updateListHandler']
    const [name, setName] = useState("")
    const [plan, setPlan] = useState("")
    const [fact, setFact] = useState("")

    const onClickAddButton = () => {
        if (name !== "" && plan !== "") {
            addLine(updateListHandler, groupId, name, plan, fact === "" ? 0 : fact)
            setName("")
            setFact("")
            setPlan("")
        }
    }

    return <div className={style.wrapper}>
        <div className={style.inputLabelGroup}>
            <TextField
                label="Title *"
                variant="outlined"
                size="small"
                value={name}
                onKeyPress={e => e.key === "Enter" && onClickAddButton()}
                onChange={e => setName(e.target.value)}
            />
        </div>

        <div className={style.inputLabelGroup}>
            <TextField
                label="Planned sum *"
                variant="outlined"
                size="small"
                value={plan}
                onKeyPress={e => e.key === "Enter" && onClickAddButton()}
                onChange={e => !isNaN(e.target.value) && setPlan(e.target.value)}
            />
        </div>

        <div className={style.inputLabelGroup}>
            <TextField
                label="Actual sum"
                variant="outlined"
                size="small"
                value={fact}
                onKeyPress={e => e.key === "Enter" && onClickAddButton()}
                onChange={e => !isNaN(e.target.value) && setFact(e.target.value)}
            />
        </div>

        <Button
            variant="contained"
            color="primary"
            onClick={onClickAddButton}>
            Add
        </Button>

    </div>
}