import React, {useState} from "react";
import style from "./PageCashStyl.module.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {DateCheckerComp} from "./parts/DateChecker/DateCheckerComp";
import {CashOptionsComp} from "./parts/CashOptions/CashOptionsComp";

export const PageCashComp = props => {

    const [pageMode, setPageMode] = useState(1)
    // const [currentAccess, setCurrentAccess] = useState("")
    const handlePageModeChange = (event) => {
        setPageMode(event.target.value)
    }

    const renderMainPart = () => {
        switch (pageMode) {
            case 2: return <div>2</div>
            case 3: return <CashOptionsComp/>
            default: return <div>1</div>
        }
    }

    return <div className={style.wrapper}>
        <div className={style.upLine}>
            <div className={style.dateCheckerContainer}>
                <DateCheckerComp/>
            </div>
            <div className={style.pageModeSelector}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageMode}
                    onChange={handlePageModeChange} >
                    <MenuItem value={1}>Cash Control</MenuItem>
                    <MenuItem value={2}>Edit Template</MenuItem>
                    <MenuItem value={3}>Cash Options</MenuItem>
                </Select>
            </div>
        </div>
        <div className={style.mainPartContainer}>
            {renderMainPart()}
        </div>
    </div>
}