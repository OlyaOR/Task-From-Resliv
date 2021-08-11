// 4, 5 task
window.onmessage = function ({ data }) {
    if (data) {
        const {method, key, value} = JSON.parse(data);
        switch (method) {
        case "get":
            if (checkKey(key)) {
            console.log(`${data}`);
            window.parent.postMessage(`callback ${method}`, '*');
            }
            break;
        case "set":
            localStorage.setItem(key, value);
            if (checkKey(key)) {
            console.log("written");
            window.parent.postMessage(`callback ${method}`, '*');
            }
            break;
        case "delete":
            if (checkKey(key)) {
            localStorage.removeItem(key);
            console.log("removed");
            window.parent.postMessage(`callback ${method}`, '*');
            }
            break;

        default:
            alert(`Error! Unknown method: ${method}`);
        }
    }
};

function checkKey(key) {
    const localKey = localStorage.getItem(key);
    if (!localKey) {alert(`Key: '${key}' is absent`)}
    return localKey;
}