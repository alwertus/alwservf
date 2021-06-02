import React, {useEffect, useState} from "react";
import style from "./PageCashStyl.module.css";
import {DateCheckerComp} from "./parts-options/DateChecker/DateCheckerComp";
import {CashOptionsComp} from "./parts-options/CashOptions/CashOptionsComp";
import {CashTabComp} from "./parts-cash/CashTab/CashTabComp";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {GLOBAL} from "../../store/ActionsStructure";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import HomeIcon from '@material-ui/icons/Home';

export const PageCashComp = props => {

    const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());
    const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
    const [pageMode, setPageMode] = useState(1)

    const renderMainPart = () => {
        switch (pageMode) {
            case 2: return <CashTabComp year={0} month={0}/>
            case 3: return <CashOptionsComp/>
            default: return <CashTabComp year={selectedYear} month={selectedMonth}/>
        }
    }

    const renderTitle = () => {
        switch (pageMode) {
            case 2: return <h2>Edit Template</h2>
            case 3: return <h2>Optioins</h2>
            default: return <div className={style.dateCheckerContainer}>
                <DateCheckerComp
                    year={selectedYear}
                    setYear={setSelectedYear}
                    month={selectedMonth}
                    setMonth={setSelectedMonth}/>
            </div>
        }
    }

    useEffect(() => updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.CASH),[])

    return <div className={style.wrapper}>
        <div className={style.upLine}>
            {renderTitle()}
            <div className={style.pageModeSelector}>
                <ActionButtonComp
                    icon={<HomeIcon/>}
                    color={pageMode === 1 ? "#2b2b90" : "#565856"}
                    customClass={style.pageModeSelectorButton}
                    onClickHandler={() => setPageMode(1)}
                />
                <ActionButtonComp
                    icon={<OfflineBoltIcon/>}
                    color={pageMode === 2 ? "#2b2b90" : "#565856"}
                    customClass={style.pageModeSelectorButton}
                    onClickHandler={() => setPageMode(2)}
                />
                <ActionButtonComp
                    icon={<SettingsApplicationsIcon/>}
                    color={pageMode === 3 ? "#2b2b90" : "#565856"}
                    customClass={style.pageModeSelectorButton}
                    onClickHandler={() => setPageMode(3)}
                />
            </div>
        </div>
        <div className={style.mainPartContainer}>
            {renderMainPart()}
        </div>
    </div>
}