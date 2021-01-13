import {INFO} from "../../../../store/ActionsStructure";

export function InfoSelectedPage(state = "", action) {
    return action.type === INFO.SELECTED_PAGE
        ? action.newValue
        : state;
}