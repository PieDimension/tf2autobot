import SKU from 'tf2-sku-2';
import pluralize from 'pluralize';
import Bot from '../../../../Bot';

import { Meta, DupedItems } from '../../../MyHandler';

export default function duped(meta: Meta, bot: Bot): { note: string; name: string[] } {
    const opt = bot.options;

    const wrong = meta.reasons;
    const dupedItemsName: string[] = [];
    const duped = wrong.filter(el => el.reason.includes('🟫_DUPED_ITEMS')) as DupedItems[];

    duped.forEach(el => {
        const name = bot.schema.getName(SKU.fromString(el.sku), false);
        if (opt.discordWebhook.offerReview.enable && opt.discordWebhook.offerReview.url !== '') {
            // if Discord Webhook for review offer enabled, then make it link the item name to the backpack.tf item history page.
            dupedItemsName.push(`${name} - [history page](https://backpack.tf/item/${el.assetid})`);
        } else {
            // else Discord Webhook for review offer disabled, make the link to backpack.tf item history page separate with name.
            dupedItemsName.push(`${name}, history page: https://backpack.tf/item/${el.assetid}`);
        }
    });

    const note = opt.manualReview.duped.note
        ? `🟫_DUPED_ITEMS - ${opt.manualReview.duped.note}`
              .replace(/%name%/g, dupedItemsName.join(', '))
              .replace(/%isName%/, pluralize('is', dupedItemsName.length))
        : `🟫_DUPED_ITEMS - ${dupedItemsName.join(', ')} ${pluralize(
              'is',
              dupedItemsName.length
          )} appeared to be duped.`;
    // Default note: %name% is|are appeared to be duped.

    const name = dupedItemsName;

    return { note, name };
}
