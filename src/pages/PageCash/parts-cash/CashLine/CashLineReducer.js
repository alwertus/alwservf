export function CashLineStateParamBool(state = false, action) {
    return action.type === 'CHANGE_ME'
        ? action.newValue
        : state;
}