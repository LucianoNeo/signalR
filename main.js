const SIGNALR_HUB_URL =
  "";
const EVENT_NAME = "";
const USUARIO = "";
const CHAVE = "";
const API_AUTH_URL = "";

let connection = null;

function isGuid(str) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    str
  );
}

async function getJwtToken() {
  const response = await axios.post(API_AUTH_URL, {
    usuario: USUARIO,
    chaveAcesso: CHAVE,
  });
  return response.data.dadosAutenticacao.tokenAcesso;
}

document.getElementById("startBtn").onclick = async () => {
  const procId = document.getElementById("procId").value.trim();
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = "";
  if (!procId) {
    logDiv.innerHTML =
      '<div class="mdc-card error">Informe o processamentoId!</div>';
    return;
  }
  if (!isGuid(procId)) {
    logDiv.innerHTML =
      '<div class="mdc-card error">O processamentoId deve estar no formato GUID!</div>';
    return;
  }
  logDiv.innerHTML = "<em>Conectando...</em>";
  try {
    const token = await getJwtToken();
    connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_HUB_URL, { accessTokenFactory: () => token })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on(EVENT_NAME, (message) => {
      let msg = message;
      try {
        msg = JSON.stringify(JSON.parse(message), null, 2);
      } catch {}
      const log = document.getElementById("log");
      log.innerHTML += `<div class="mdc-card"><div class="msg-title">Mensagem recebida:</div><div class="msg-body">${msg}</div></div>`;
    });

    await connection.start();
    document.getElementById("log").innerHTML +=
      '<div class="mdc-card"><em>Conectado! Se inscrevendo no grupo...</em></div>';
    await connection.invoke("InscreverNoLogProcessamento", procId);
    document.getElementById("log").innerHTML +=
      `<div class="mdc-card"><em>Inscrito no grupo ${procId}! Ouvindo mensagens...</em></div>`;
  } catch (err) {
    document.getElementById(
      "log"
    ).innerHTML += `<div class="mdc-card error">Erro: ${err.message}</div>`;
  }
};
