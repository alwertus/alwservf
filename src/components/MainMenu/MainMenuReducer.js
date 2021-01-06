import {AUTH} from "../../store/ActionsStructure";
import {GLOBAL} from "../../store/ActionsStructure";
import {getLocalStorageValue, setLocalStorageValue} from "../../store/LocalStorage";

export function IsAuthorized(state = getLocalStorageValue("IsAuthorized", false), action) {
    return action.type === AUTH.IS_AUTHORIZED
        ? setLocalStorageValue("IsAuthorized", action.newValue)
        : state;
}

export function ActivePage(state = "", action) {
    return action.type === GLOBAL.ACTIVE_PAGE
        ? action.newValue
        : state;
}

