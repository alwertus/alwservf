import {INFO} from "../../../../store/ActionsStructure";

export function PageInfoListPrivate(state = [], action) {
    return action.type === INFO.PRIVATE_LIST_DATA
        ? action.newValue
        : state;
}

export function PageInfoListPublic(state = [], action) {
    return action.type === INFO.PUBLIC_LIST_DATA
        ? action.newValue
        : state;
}
export function PageInfoPrivateExpandedSet(state = [], action) {
    return action.type === INFO.PRIVATE_EXPANDED_SET
        ? action.newValue
        : state;
}
export function PageInfoTreeMode(state = INFO.TREE_MODE.NORMAL, action) {
    return action.type === INFO.SET_TREE_MODE
        ? action.newValue
        : state;
}