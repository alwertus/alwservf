import React, {useEffect, useState} from "react";
import style from "./CashGroupNewStyl.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {CheckCircleOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

export const CashGroupNewComp = props => {
    const [isPositive, setIsPositive] = useState(false)
    const [name, setName] = useState("")
    const [sum, setSum] = useState("")
    const [okBtnAvailable, setOkBtnAvailable] = useState(false)

    const onOkClickHandler = () => {
        if (okBtnAvailable) {
            props.onAdd(isPositive, name, sum);
            setName("");
            setSum("");
        }
    }

    useEffect(() => {
        setOkBtnAvailable(name !== "" && (isPositive || (sum !== "" && sum !== "0")))
    }, [name, sum, isPositive])

    return <div className={style.wrapper}>
        <div className={style.container}>
            <div className={style.titleLine}>
                <ActionButtonComp
                    icon={isPositive ? <PlusCircleOutlined /> : <MinusCircleOutlined />}
                    onClickHandler={() => setIsPositive(!isPositive)}
                    color={isPositive ? "#32581f" : "#8c1b1b"}
                    customClass={style.sign}
                />
                <div className={style.title}>
                    Add new item
                </div>
            </div>
            <div className={style.line}>

                <div className={style.inputsGroup}>
                    <div className={style.inputLine}>
                        <div className={style.inputLineText}>Group Name</div>
                        <input
                            placeholder="Group Name"
                            value={name}
                            onKeyPress={e => e.key === "Enter" && onOkClickHandler()}
                            onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className={style.inputLine}>
                        <div className={style.inputLineText}>Sum limit</div>
                        <input
                            placeholder="Sum limit"
                            value={sum}
                            onKeyPress={e => e.key === "Enter" && onOkClickHandler()}
                            onChange={e => setSum(e.target.value)}/>
                    </div>
                </div>

                <ActionButtonComp
                    icon={<CheckCircleOutlined />}
                    customClass={style.buttonOk + " " + (okBtnAvailable ? style.buttonOkTrue : style.buttonOkFalse)}
                    onClickHandler={onOkClickHandler}
                />
            </div>
        </div>
    </div>
}