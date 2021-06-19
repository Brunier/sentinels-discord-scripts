const Discord = require('discord.js');
const client = new Discord.Client();
const sendToSheet = require("./sendToSheet")

const getUsers = async (users, weapon) => {
  const userData = await users.fetch();

  return userData.map(({id, username}) => ({
    id,
    username,
    weapon
  }))
};

const EMOJIS_WEAPONS_DICT = {
  "⚔️": "Espada e Escudo",
  "✨": "Cetro de Cura",
  "🔥": "Cajado de Fogo",
  "🥍": "Martelo de Guerra",
  "🏹": "Arco",
  "🏸": "Machado de 2 Mãos",
  "🪓": "Machadinha",
  "🦯": "Lança",
  "🔫": "Mosquete",
  "🤺": "Rapieira",
  "❄️": "Manopla de Gelo"
}

client.on('ready', async () => {
  console.log(`Logged in  ${client.user.tag}!`);

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  const message = await channel.messages.fetch(process.env.MESSAGE_ID);

  const reactions = await message.reactions.cache;
  const reactionsArray = Array.from(reactions.entries());
  
  const usersWithWeaponPromisses = reactionsArray.map(reaction => {
    const [ emojiWeapon, {users}] = reaction;

    const weapon = EMOJIS_WEAPONS_DICT[emojiWeapon];
    
    const usersOk = getUsers(users, weapon);
    return usersOk;
  });

  const usersWithWeapon = await Promise.all(usersWithWeaponPromisses);
  const usersWithWeaponFlat = usersWithWeapon.flat();

  const users = {};

  usersWithWeaponFlat.forEach(({id, username, weapon}) => {
    users[id] = {
      id,
      username,
      weapons: users[id] !== undefined ? [...users[id].weapons, weapon] : [weapon]
    }
  });  

  sendToSheet(Object.values(users))
});


client.login(process.env.BOT_DISCORD);