# sentinels-discord-scripts


## Como rodar o script de deposito de armas?
Para rodar precisamos setar as variáveis no comando do script:
`BOT_DISCORD="" CHANNEL_ID="" MESSAGE_ID="" SHEET_ID="" node index.js`

- *BOT_DISCORD:* É o TOKEN do BOT criado. Lembrando que ele precisa estar no servidor para conseguir ler a mensagem
- *CHANNEL_ID:* É o ID do canal onde está o deposito de armas.
- *MESSAGE_ID:* É o ID da mensagem que vai conter as reações
- *SHEET_ID:* É o ID do sheet onde vai ser carregado os dados dos usuários com as armas

### Como que cria um BOT?
https://discordjs.guide/preparations/setting-up-a-bot-application.html

Lembrando que para adicionar ele no servidor, precisa pegar o `CLIENT_ID` e colocar nessa URL:
https://discord.com/oauth2/authorize?client_id={CLIENT_ID}&scope=bot+applications.commands

### Como que pega o CHANNEL_ID e MESSAGE_ID?
É apenas ir na mensagem e pegar o link.

Link de uma mensagem do discord: `https://discord.com/channels/855874491167014922/855875404794560553/855875416786599936`
- No caso desse link, o `855875404794560553` é o  *CHANNEL_ID* e o ultimo `855875416786599936` seria o *MESSAGE_ID*

https://pasteboard.co/K7o26CB.png

### Como que pega o ID do google sheet
https://docs.google.com/spreadsheets/d/1kmI3-aHrBLesqoYaCHHSGgXWV-pdHs35nYxvob1o_sM/edit#gid=0
- Dado esse link, o ID é `1kmI3-aHrBLesqoYaCHHSGgXWV-pdHs35nYxvob1o_sM`
