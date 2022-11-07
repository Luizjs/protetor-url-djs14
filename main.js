import { GatewayIntentBits, Partials, Collection, Client } from 'discord.js';
import dotenv from 'dotenv';
import logs from 'discord-logs';
import protectUrl from './urlProtect.js';

dotenv.config()

const protect = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel, Partials.Message]
  });
logs(protect)

protect.on('ready', async() => {
    console.log(`[🚀] Logado com sucesso em ${protect.user.tag} | ${protect.user.id}`)
});

protect.on('guildVanityURLUpdate', async(guild, oldVanityURL, newVanityURL) => {
    if(newVanityURL !== process.env.urlProtect) protectUrl(guild)
});

protect.on('guildVanityURLRemove', async(guild, VanityURL) => {
    protectUrl(guild)
});

protect.login(process.env.botToken)
