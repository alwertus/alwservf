// BadTargetsToMove
import {INFO} from "../../../../store/ActionsStructure";

export function PageInfoBadTargetsToMove(state = [], action) {
    return action.type === INFO.MOVE_BAD_TARGETS
        ? action.newValue
        : state;
}