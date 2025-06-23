# SignalR Listener Web

Este projeto é um front-end web que se conecta a um hub SignalR, escuta mensagens em um grupo identificado por um ID de processamento e exibe essas mensagens em cards na interface.

## Como usar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor web (usando Vite):
   ```sh
   npm start
   ```
   O navegador abrirá automaticamente em `http://localhost:5500`.
3. Insira o `processamentoId` desejado e clique em "Conectar e Escutar". As mensagens recebidas aparecerão em cards na tela.

> **Importante:**
> Antes de rodar o projeto, edite o arquivo `main.js` e preencha corretamente as constantes `SIGNALR_HUB_URL`, `USUARIO` e `CHAVE` com os dados do seu ambiente. Esses dados são obrigatórios para autenticação e conexão ao hub SignalR.

## Dependências
- @microsoft/signalr
- axios
- vite (para servir o front-end)

---

O front-end utiliza Material Design para exibir as mensagens de forma visual e organizada.
