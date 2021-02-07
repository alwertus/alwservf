import {INFO} from "../../../../store/ActionsStructure";

export function InfoSelectedPage(state = "", action) {
    return action.type === INFO.SELECTED_PAGE
        ? action.newValue
        : state;
}

export function InfoPageMode(state = INFO.PAGE_MODE_VALUES.NOT_SELECTED, action) {
    return action.type === INFO.PAGE_MODE
        ? action.newValue
        : state;
}