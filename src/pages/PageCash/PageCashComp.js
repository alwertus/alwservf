import React, {useEffect, useState} from "react";
import style from "./PageCashStyl.module.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {DateCheckerComp} from "./parts-options/DateChecker/DateCheckerComp";
import {CashOptionsComp} from "./parts-options/CashOptions/CashOptionsComp";
import {CashTabComp} from "./parts-cash/CashTab/CashTabComp";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";

export const PageCashComp = props => {

    const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());
    const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
    const [pageMode, setPageMode] = useState(1)
    // const [currentAccess, setCurrentAccess] = useState("")
    const handlePageModeChange = (event) => {
        setPageMode(event.target.value)
    }

    const renderMainPart = () => {
        switch (pageMode) {
            case 2: return <div>2</div>
            case 3: return <CashOptionsComp/>
            default: return <CashTabComp year={selectedYear} month={selectedMonth}/>
        }
    }

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.CASH),[])

    return <div className={style.wrapper}>
        <div className={style.upLine}>
            <div className={style.dateCheckerContainer}>
                <DateCheckerComp
                    year={selectedYear}
                    setYear={setSelectedYear}
                    month={selectedMonth}
                    setMonth={setSelectedMonth}
                />
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