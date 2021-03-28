import {CASH} from "../../../../store/ActionsStructure";

export function PageCashOperationList(state = [], action) {
    return action.type === CASH.OPERATION_LIST
        ? action.newValue
        : state;
}
export function PageCashStatus(state = CASH.CASH_STATUS_VALUES.OUTDATED, action) {
    return action.type === CASH.CASH_STATUS
        ? action.newValue
        : state;
}