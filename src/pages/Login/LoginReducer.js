import {AUTH} from "../../store/ActionsStructure";
import {getLocalStorageValue, setLocalStorageValue} from "../../store/LocalStorage";

export function UserFirstName(state = getLocalStorageValue("firstname",""), action) {
    return action.type === AUTH.FIRST_NAME
        ? setLocalStorageValue("firstname", action.newValue)
        : state;
}
export function UserLastName(state = getLocalStorageValue("lastname",""), action) {
    return action.type === AUTH.LAST_NAME
        ? setLocalStorageValue("lastname", action.newValue)
        : state;
}
export function UserAuthorities(state = getLocalStorageValue("authorities",[]), action) {
    return action.type === AUTH.AUTHORITIES
        ? setLocalStorageValue("authorities", action.newValue)
        : state;
}
export function UserEmail(state = getLocalStorageValue("login", ""), action) {
    return action.type === AUTH.EMAIL
        ? setLocalStorageValue("login", action.newValue)
        : state;
}
export function UserPassword(state = getLocalStorageValue("passw", ""), action) {
    return action.type === AUTH.PASSWORD
        ? setLocalStorageValue("passw",action.newValue)
        : state;
}