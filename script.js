function getBaseUrl(idInstance, apiToken) {
    return `https://api.green-api.com/waInstance${idInstance}`;
}

function showResponse(data) {
    const area = document.getElementById("responseArea");
    area.value = JSON.stringify(data, null, 2);
}

function getInput(id) {
    return document.getElementById(id).value.trim();
}

document.getElementById("btnGetSettings").addEventListener("click", () => {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");
    fetch(`${getBaseUrl(id, token)}/getSettings/${token}`)
        .then(res => res.json())
        .then(showResponse)
        .catch(err => showResponse({ error: err.message }));
});

document.getElementById("btnGetState").addEventListener("click", () => {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");
    fetch(`${getBaseUrl(id, token)}/getStateInstance/${token}`)
        .then(res => res.json())
        .then(showResponse)
        .catch(err => showResponse({ error: err.message }));
});

document.getElementById("btnSendMessage").addEventListener("click", () => {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");
    const phone = getInput("phoneNumber");
    const message = getInput("messageText");

    fetch(`${getBaseUrl(id, token)}/sendMessage/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chatId: `${phone}@c.us`,
            message: message
        })
    })
    .then(res => res.json())
    .then(showResponse)
    .catch(err => showResponse({ error: err.message }));
});

document.getElementById("btnSendFile").addEventListener("click", () => {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");
    const phone = getInput("filePhoneNumber");
    const fileUrl = getInput("fileUrl");

    fetch(`${getBaseUrl(id, token)}/sendFileByUrl/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chatId: `${phone}@c.us`,
            urlFile: fileUrl,
            fileName: fileUrl.split("/").pop()
        })
    })
    .then(res => res.json())
    .then(showResponse)
    .catch(err => showResponse({ error: err.message }));
});
