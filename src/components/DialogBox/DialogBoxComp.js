import React from "react";
import style from "./DialogBoxStyl.module.css";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";

export const DialogBoxComp = props => {
    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.message}>
                {props.message}
            </div>
            <div className={style.buttons}>
                <div className={style.button}>
                    <ActionButtonComp title={"OK"}
                                      onClickHandler={props.onOkClick}
                    />
                </div>
                <div className={style.button}>
                    <ActionButtonComp title={"Cancel"}
                                      onClickHandler={props.onCancelClick}
                    />
                </div>
            </div>
        </div>

    </div>
};
