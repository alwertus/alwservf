import {getLocalStorageValue, setLocalStorageValue} from "../../store/LocalStorage";
import {OPTIONS} from "../../store/ActionsStructure";

export function OptionsServerAddress(state = getLocalStorageValue("serverAddress", "https://alwertus.zapto.org"), action) {
    return action.type === OPTIONS.SERVER_ADDRESS
        ? setLocalStorageValue("serverAddress", action.newValue)
        : state;
}