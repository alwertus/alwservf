import {CASH, STATUS} from "../../../../store/ActionsStructure";

export function PageCashOptionsStatus(state = STATUS.OUTDATED, action) {
    return action.type === CASH.OPTIONS_STATUS
        ? action.newValue
        : state;
}

export function PageCashSheetList(state = [], action) {
    return action.type === CASH.SHEET_LIST
        ? action.newValue
        : state;
}

export function PageCashUserList(state = [], action) {
    return action.type === CASH.USER_LIST
        ? action.newValue
        : state;
}

export function PageCashSelectedSheet(state = "", action) {
    return action.type === CASH.SELECTED_SHEET
        ? action.newValue
        : state;
}