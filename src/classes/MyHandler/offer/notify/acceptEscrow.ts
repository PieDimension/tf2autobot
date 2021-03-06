import { TradeOffer } from 'steam-tradeoffer-manager';
import Bot from '../../../Bot';

export default function acceptEscrow(offer: TradeOffer, bot: Bot): void {
    bot.sendMessage(
        offer.partner,
        '✅ Success! The offer has gone through successfully, but you will receive your items after several days. ' +
            'To prevent this from happening in the future, please enable Steam Guard Mobile Authenticator.' +
            '\nRead:\n' +
            '• Steam Guard Mobile Authenticator - https://support.steampowered.com/kb_article.php?ref=8625-WRAH-9030' +
            '\n• How to set up the Steam Guard Mobile Authenticator - https://support.steampowered.com/kb_article.php?ref=4440-RTUI-9218'
    );
}
