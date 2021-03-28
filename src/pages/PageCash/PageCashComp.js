import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./PageCashStyl.module.scss";
import {updateActivePage} from "../../components/MainMenu/MainMenuActions";
import {CASH, GLOBAL} from "../../store/ActionsStructure";
import {TabOptionsComp} from "./parts/TabOptions/TabOptionsComp";
import {TabOperationsComp} from "./parts/TabOperations/TabOperationsComp";
import {setPageCashTab} from "./PageCashActions";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';


export const PageCashComp = props => {
    useEffect(() => {updateActivePage(GLOBAL.ACTIVE_PAGE_LIST.CASH)},[])
    const tab = useSelector(state => state.PageCashTab);
    const dispatch = useDispatch();

    function drawCurrentTab() {
        switch (tab) {
            case CASH.CASH_TAB_VALUES.OPTIONS:
                return <TabOptionsComp/>;
            case CASH.CASH_TAB_VALUES.OPERATIONS:
                return <TabOperationsComp/>;
            default:
                return <div/>
        }
    }

    return <div className={style.wrapper}>
        <div className={style.tabSelector}>
            <div className={style.tabButton}>
                <ActionButtonComp
                    icon={<MonetizationOnIcon fontSize="large"/>}
                    color={tab === CASH.CASH_TAB_VALUES.OPERATIONS ? "#08bb08" : "#226322e0"}
                    onClickHandler = {() => dispatch(setPageCashTab(CASH.CASH_TAB_VALUES.OPERATIONS))}
                />
            </div>
            <div className={style.tabButton}>
                <ActionButtonComp
                    icon={<AccessibleForwardIcon fontSize="large"/>}
                    color={tab === CASH.CASH_TAB_VALUES.OPTIONS ? "#08bb08" : "#226322e0"}
                    onClickHandler = {() => dispatch(setPageCashTab(CASH.CASH_TAB_VALUES.OPTIONS))}
                />
            </div>

        </div>
        {drawCurrentTab()}
    </div>
};