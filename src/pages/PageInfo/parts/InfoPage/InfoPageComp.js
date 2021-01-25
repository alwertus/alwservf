import React, {useState} from "react";
import style from "./InfoPageStyl.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getPage, setPage} from "./InfoPageActions";
import {INFO} from "../../../../store/ActionsStructure";
import TextEditIcon from '@material-ui/icons/AssignmentOutlined';
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import TextEditCancelIcon from '@material-ui/icons/CancelRounded';
import TextEditOKIcon from '@material-ui/icons/CheckCircleRounded';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-kuroir";

export const InfoPageComp = props => {
    const dispatch = useDispatch();
    const infoSelectedPage = useSelector(state => state.InfoSelectedPage);
    const mode = useSelector(state => state.InfoPageMode);
    const [html, setHtml] = useState("");
    const [tempHtml, setTempHtml] = useState("");
    const MODES = INFO.PAGE_MODE_VALUES;

    if (mode === MODES.OUTDATED)
        getPage(infoSelectedPage, (newVal)=>dispatch({type:INFO.PAGE_MODE, newValue: newVal}), setHtml);

    let onPageChange = (e) => {
        setTempHtml(e);
    }

    let onPageChangeOkButton = () => {
        setHtml(tempHtml)
        setPage(infoSelectedPage,
            tempHtml,
            (newVal)=>dispatch({type:INFO.PAGE_MODE, newValue: newVal}));
    }

    let editor = <AceEditor
        className={style.textEditor}
        defaultValue={html}
        mode="html"
        theme="kuroir"
        onChange={onPageChange}
        name="textarea"
        editorProps={{ $blockScrolling: true }}
    />

    function drawPage() {
        switch (mode) {
            case MODES.ACTUAL:
                return <div className={style.page}>
                    <div className="content" dangerouslySetInnerHTML={{__html: html}}/>
                </div>
            case MODES.OUTDATED:
                return <div className={style.page}>Outdated</div>
            case MODES.LOADING:
                return <div className={style.page}>Loading</div>
            case MODES.ERROR:
                return <div className={style.page}>Error</div>
            case MODES.NOT_SELECTED:
                return <div className={style.page}>Choose the page</div>
            case MODES.EDITING:
                return <div className={style.page}>{editor}</div>
            default:
                return <div>Unknown page status</div>
        }
    }

    function drawControls() {
        if (mode === MODES.ACTUAL)
            return <div className={style.controlGroup}>
                <ActionButtonComp
                    icon={<TextEditIcon/>}
                    onClickHandler={() => {
                        dispatch({type:INFO.PAGE_MODE, newValue: MODES.EDITING})
                    }}
                />
            </div>
        if (mode === MODES.EDITING)
            return <div className={style.controlGroup}>
                <ActionButtonComp
                    icon={<TextEditCancelIcon/>}
                    color='#940202d9'
                    onClickHandler={() => {
                        dispatch({type:INFO.PAGE_MODE, newValue: MODES.ACTUAL})
                    }}
                />
                <ActionButtonComp
                    icon={<TextEditOKIcon/>}
                    color='#05520cd9'
                    onClickHandler={() => {
                        onPageChangeOkButton();
                        dispatch({type:INFO.PAGE_MODE, newValue: MODES.ACTUAL})
                    }}
                />
            </div>
    }

    return <div className={style.wrapper}>
        <div className={style.cellUp}>
            {drawControls()}
        </div>

        <div className={style.cellDown}>
            {drawPage()}
            {/*{infoSelectedPage}*/}
        </div>
    </div>
};
