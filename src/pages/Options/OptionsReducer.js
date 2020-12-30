import {getLocalStorageValue, setLocalStorageValue} from "../../store/LocalStorage";

export function OptionsServerAddress(state = getLocalStorageValue("serverAddress", "https://alwertus.zapto.org"), action) {
    return action.type === 'OPTIONS__SERVER_ADDRESS'
        ? setLocalStorageValue("serverAddress", action.newValue)
        : state;
}