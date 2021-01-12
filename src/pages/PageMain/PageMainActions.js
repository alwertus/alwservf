export function button1Reaction() {

    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=utf-8");
    headers.append("Authorization", 'Basic ' + Buffer.from("admin:admin123").toString('base64'));

    fetch("https://192.168.1.8:5188/infopages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            operation: "get"
        })
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("response", response);
            switch (response.Result) {
                case "OK":
                    let result = JSON.parse(response.List);
                    console.log(result);
                    // dispatch(setTreeData(result));
                    // dispatch(setTreeDataStatus(TREE.STATUS.SUCCESS));
                    break;
                case "Error":
                    console.log("Error", response.Error);
                    // dispatch(setErrorText(response.Error));
                    // dispatch(setTreeDataStatus(TREE.STATUS.ERROR));
                    break;
                default:
                    console.log("Unknown error");
                    // dispatch(setErrorText("Unknown error"));
                    // dispatch(setTreeDataStatus(TREE.STATUS.ERROR));
            }
            return response;
        })
        .catch((e) => {
            console.log("ERROR: " + e);
            // dispatch(setTreeDataStatus(TREE.STATUS.ERROR));
            // dispatch(setErrorText("Проблемы соединения"));
        });
}