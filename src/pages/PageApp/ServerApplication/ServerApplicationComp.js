import React from "react";
import style from "./ServerApplicationStyl.module.css";
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {runAppAction} from "./ServerApplicationActions";

export const ServerApplicationComp = props => {
    function ico() {
        return props.isWorking
            ? <div className={style.ico + " " + style.icoWork}><MoodIcon fontSize="large"/></div>
            : <div className={style.ico + " " + style.icoNotWork}><MoodBadIcon fontSize="large"/></div>
    }
    function action() {
        return props.isWorking
            ? <StopIcon fontSize="large"/>
            : <PlayArrowIcon fontSize="large"/>
    }

    return <div className={style.wrapper}>
        {ico()}
        <div className={style.action}
             onClick={() => {
                 runAppAction(props.id, props.isWorking ? "stop" : "start", props.setIsDataActualHandler)
             }} >
            {
                props.drawActions
                    ? <div className={style.ico}>
                        {action()}
                    </div>
                    : null
            }
        </div>
        <div className={style.title}>{props.title}</div>
    </div>
};
