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
    PASSWORD : "",
    AUTHORITIES : "",
})

export let GLOBAL = fillStruct("APP", {
    ACTIVE_PAGE : "",
    ACTIVE_PAGE_LIST : {
        MAIN : "",
        INFO: "",
        DOINGS: "",
        APP: "",
        ADMIN: "",
        LOGIN: "",
        OPTIONS: "",
    }
})