function fillStruct(prefix, obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "string")
                obj[key] = prefix + "__" + key;
            else fillStruct(prefix + "__" + key, obj[key])
        }
    }
    return obj;
}

export let OPTIONS = fillStruct("OPTIONS", {
    SERVER_ADDRESS: "",
})

export let AUTH = fillStruct("AUTH", {
    IS_AUTHORIZED : "",
    FIRST_NAME : "",
    LAST_NAME : "",
    EMAIL : "",
    AUTHORITIES : "",
    TOKEN: "",
})

export let GLOBAL = fillStruct("APP", {
    ACTIVE_PAGE : "",
    ACTIVE_PAGE_LIST : {
        MAIN : "",
        INFO: "",
        CASH: "",
        DOINGS: "",
        APP: "",
        ADMIN: "",
        LOGIN: "",
        OPTIONS: "",
    }
})

export let INFO = fillStruct("INFO", {
    MOVE_BAD_TARGETS: "",
    PRIVATE_LIST_DATA: "",
    PRIVATE_EXPANDED_SET: "",
    PUBLIC_LIST_DATA: "",

    SET_TREE_MODE: "",
    TREE_MODE : {
        NORMAL : "",
        ADD: "",
        EDIT: "",
        MOVE: "",
    },

    SELECTED_PAGE: "",

    PAGE_MODE: "",
    PAGE_MODE_VALUES : {
        ACTUAL : "",
        OUTDATED : "",
        LOADING : "",
        ERROR: "",
        EDITING: "",
        NOT_SELECTED: "",
    }
})

export let CASH = fillStruct("CASH", {
    CASH_STATUS: "",
    OPTIONS_STATUS: "",

    CASH_STATUS_VALUES: {
        OUTDATED: "",
        LOADING: "",
        ACTUAL: "",
        ERROR: "",
    },
    CASH_TAB: "",
    CASH_TAB_VALUES: {
        OPTIONS: "",
        OPERATIONS: "",
    },
    SELECTED_USER_ID: "",
    OPERATION_LIST: "",
    SHEET_LIST: "",
    USER_LIST: "",
    SELECTED_SHEET: "",
})

export let STATUS = fillStruct("STATUS", {
    OUTDATED: "",
    LOADING: "",
    ACTUAL: "",
    ERROR: "",
})