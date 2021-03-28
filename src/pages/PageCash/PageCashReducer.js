import {CASH} from "../../store/ActionsStructure";

export function PageCashTab(state = CASH.CASH_TAB_VALUES.OPERATIONS, action) {
    return action.type === CASH.CASH_TAB
        ? action.newValue
        : state;
}
export function PageCashSelectedUserId(state = 0, action) {
    return action.type === CASH.SELECTED_USER_ID
        ? action.newValue
        : state;
}