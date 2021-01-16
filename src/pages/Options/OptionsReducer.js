import {getLocalStorageValue, setLocalStorageValue} from "../../store/LocalStorage";
import {OPTIONS} from "../../store/ActionsStructure";

export function OptionsServerAddress(state = getLocalStorageValue("serverAddress", "http://alwertus.zapto.org:7000"), action) {
    return action.type === OPTIONS.SERVER_ADDRESS
        ? setLocalStorageValue("serverAddress", action.newValue)
        : state;
}