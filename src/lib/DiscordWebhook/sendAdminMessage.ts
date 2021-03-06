import { quickLinks, sendWebhook } from './utils';
import { Webhook } from './interfaces';

import log from '../logger';

import Bot from '../../classes/Bot';
import MyHandler from '../../classes/MyHandler/MyHandler';

export default function sendAdminMessage(
    steamID: string,
    msg: string,
    their: Their,
    links: Links,
    time: string,
    bot: Bot
): void {
    const opt = bot.options.discordWebhook;
    const botInfo = (bot.handler as MyHandler).getBotInfo();

    const discordAdminMsg: Webhook = {
        username: opt.displayName ? opt.displayName : botInfo.name,
        avatar_url: opt.avatarURL ? opt.avatarURL : botInfo.avatarURL,
        content: `Message sent!`,
        embeds: [
            {
                author: {
                    name: their.player_name,
                    url: links.steam,
                    icon_url: their.avatar_url_full
                },
                footer: {
                    text: `v${process.env.BOT_VERSION} • ${steamID} • ${time}`
                },
                title: '',
                description: `💬 ${msg}\n\n${quickLinks(their.player_name, links)}`,
                color: opt.embedColor
            }
        ]
    };

    sendWebhook(opt.messages.url, discordAdminMsg, 'partner-message')
        .then(() => {
            log.debug(`✅ Sent admin-message webhook (to ${their.player_name}) on Discord.`);
        })
        .catch(err => {
            log.debug(`❌ Failed to send admin-message webhook (to ${their.player_name}) on Discord: `, err);
        });
}

interface Links {
    steam: string;
    bptf: string;
    steamrep: string;
}

interface Their {
    player_name: string;
    avatar_url_full: string;
}
