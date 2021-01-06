import {GLOBAL} from "../../store/ActionsStructure";
import store from "../../store/Store";

export function updateActivePage(actualPage) {
    if (actualPage !== store.getState().ActivePage) {
        store.dispatch({type: GLOBAL.ACTIVE_PAGE, newValue: actualPage });
    }
}