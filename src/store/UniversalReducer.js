export function createReducer(defaultValue, actionName) {
    return (state = defaultValue, action) => {
        return action.type === actionName
            ? action.newValue
            : state;
    }
}