import React, {useState} from "react";
import style from "./CashGroupStyl.module.css";
import {changeGroupLimit, changeGroupName, changeGroupSign, deleteGroup} from "./CashGroupActions";
import {CashLineNewComp} from "../CashLineNew/CashLineNewComp";
import {CashLineComp} from "../CashLine/CashLineComp";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {DoubleRightOutlined, MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {SvgDiagramOld} from "../../../../common/SvgDiagramOld";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {DialogBoxComp} from "../../../../components/DialogBox/DialogBoxComp";
import {ThunderboltOutlined} from "@ant-design/icons";


export const CashGroupComp = props => {
    const id = props.element['id']
    const updateListHandler = props['updateListHandler'];
    const [sumLimit, setSumLimit] = useState(props.element['sumLimit'])
    const [name, setName] = useState(props.element['name'])
    const [showChild, setShowChildState] = useState(false)
    const [isPositive, setIsPositive] = useState(props.element['sign'] === '+')
    const lines = props.element['lines']
    const [animStep, setAnimStep] = useState(0)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const setShowChild = (val) => {
        setShowChildState(val)
        setAnimStep(val ? 1 : 2)
    }

    // const sequence = props.element['sequence']

    const plan = lines.reduce((prev, cur) =>  prev + cur['sumPlan'], 0)
    const fact = lines.reduce((prev, cur) =>  cur['completed'] ? prev + cur['sumActual'] : prev, 0)

    const drawSVG = () => {
        return isPositive
            ? SvgDiagramOld(300, 70, [
                {   current: {  value : fact,
                                color:"#6D8764",
                                colorBad:"#36e816",
                                text: "fact: " + fact},
                    total: {    value : plan,
                                color:"#BAC8D3",
                                colorBad:"#6D8764",
                                text: "plan: " + plan
                    },
                },])
            : SvgDiagramOld(300, 70, [
            {   current: {  value : plan,
                            color:"#BAC8D3",
                            colorBad:"#654747",
                            text: "plan to spent: " + plan},
                total: {    value : sumLimit,
                            color:"#FFF",
                            colorBad:"#ff9393",},
            },{current: {   value : fact,
                            color:"#6D8764",
                            colorBad:"#690707",
                            text:"spent: " + fact},
                total: {    value : sumLimit,
                            color:"#FAD9D5",
                            colorBad:"#F00",
                            text:"left: " + (sumLimit - fact)}, }])
    }

    return <div className={style.wrapper}>
        <div className={style.mainPart}>
            <div className={style.content}>
                <div className={style.title}>
                    {props.element['copySign'] && props.element['copySign'] === "Y"
                    && <ThunderboltOutlined className={style.copiedIcon}/>}
                    <input
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                        onBlur={() => {
                            if (props.element['name'].toString() !== name.toString())
                                changeGroupName(updateListHandler, id, name)}
                        }
                    />
                </div>

                <div className={style.diagram}>
                    {drawSVG()}

                    {!isPositive && <div className={style.maxSum}>
                        <input
                            value={sumLimit}
                            onChange={e => {
                                if (!isNaN(e.target.value)) setSumLimit(e.target.value)}
                            }
                            onBlur={() => {
                                if (props.element['sumLimit'].toString() !== sumLimit.toString())
                                    changeGroupLimit(updateListHandler, id, sumLimit)}
                            }
                        />
                        (amount limit)
                    </div>}
                </div>
            </div>
            <div className={style.controls}>

                {showChild && <ActionButtonComp
                    icon={<DeleteForeverIcon/>}
                    onClickHandler={() => {setConfirmOpen(true)}}
                    color="#7d4040"
                    customClass={style.sign}
                />}

                <ActionButtonComp
                    icon={isPositive ? <PlusCircleOutlined /> : <MinusCircleOutlined />}
                    onClickHandler={() => {
                        setIsPositive(!isPositive)
                        changeGroupSign(updateListHandler, id, isPositive ? "-" : "+")
                    }}
                    color={isPositive ? "#32581f" : "#8c1b1b"}
                    customClass={style.sign}
                />

                <button
                    type="button"
                    className={animStep === 0
                        ? ""
                        : animStep === 1
                            ? style.btnShow
                            : style.btnHide}
                    onAnimationEnd={() => setAnimStep(0)}
                    onClick={() => {setShowChild(!showChild)}}>
                    <DoubleRightOutlined className={showChild ? style.buttonRotateUp : style.buttonRotateDn}/>
                </button>
            </div>

        </div>

        <TransitionGroup>
            {showChild && <CSSTransition
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: style.panelShow,
                    exitActive: style.panelHide
                }}>
                <div className={style.lines}>
                    <CashLineNewComp groupId={id} updateListHandler={updateListHandler}/>
                    <table>
                        {lines && lines.length > 0 && <thead>
                            <tr>
                                <th width="5%">Done</th>
                                <th>Name</th>
                                <th>Planned sum</th>
                                <th>Actual sum</th>
                                <th/>
                                <th/>
                            </tr>
                        </thead>}
                        <tbody>
                            {lines && lines
                                .map(e => <CashLineComp
                                key={e.id}
                                element={e}
                                updateListHandler={updateListHandler}
                            />)}
                        </tbody>

                    </table>

                </div>
            </CSSTransition>}
        </TransitionGroup>

        <DialogBoxComp
            message={"Are you Shura?"}
            onClickOk={() => deleteGroup(updateListHandler, id)}
            dialogOpen={confirmOpen}
            setDialogOpen={setConfirmOpen} />
    </div>
}