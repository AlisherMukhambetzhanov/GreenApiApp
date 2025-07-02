// 🔧 Получаем параметры подключения
function getCredentials() {
  const idInstance = document.getElementById("idInstance").value.trim();
  const apiTokenInstance = document.getElementById("apiTokenInstance").value.trim();
  if (!idInstance || !apiTokenInstance) {
    alert("Пожалуйста, заполните ID Instance и API Token.");
    throw new Error("Missing credentials");
  }
  return { idInstance, apiTokenInstance };
}

// 📌 Функция обновления поля ответа
function displayResponse(response) {
  const textarea = document.getElementById("response");
  textarea.value = JSON.stringify(response, null, 2);
}

// 🔍 Метод getSettings
async function getSettings() {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
    const data = await res.json();
    displayResponse(data);
  } catch (error) {
    displayResponse({ error: error.message });
  }
}

// 🔄 Метод getStateInstance
async function getStateInstance() {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
    const data = await res.json();
    displayResponse(data);
  } catch (error) {
    displayResponse({ error: error.message });
  }
}

// 💬 Метод sendMessage
async function sendMessage() {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const chatId = document.getElementById("chatId").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!chatId || !message) {
      alert("Введите Chat ID и сообщение.");
      return;
    }

    const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId.endsWith("@c.us") ? chatId : `${chatId}@c.us`,
        message: message,
      }),
    });

    const data = await res.json();
    displayResponse(data);
  } catch (error) {
    displayResponse({ error: error.message });
  }
}

// 📎 Метод sendFileByUrl
async function sendFileByUrl() {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const chatId = document.getElementById("chatIdFile").value.trim();
    const fileUrl = document.getElementById("fileUrl").value.trim();

    if (!chatId || !fileUrl) {
      alert("Введите Chat ID и ссылку на файл.");
      return;
    }

    const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId.endsWith("@c.us") ? chatId : `${chatId}@c.us`,
        urlFile: fileUrl,
        fileName: fileUrl.split("/").pop(),
        caption: "Файл отправлен через GREEN-API",
      }),
    });

    const data = await res.json();
    displayResponse(data);
  } catch (error) {
    displayResponse({ error: error.message });
  }
}
