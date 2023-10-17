import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionReplyOptions,
} from 'discord.js';
import { createId } from '../utils';
import { NAMESPACES } from './namespaces';

export const confirmationMsg = (
  msg: string,
  args: unknown[]
): InteractionReplyOptions => ({
  content: msg,
  ephemeral: true,
  components: [
    new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId(createId(NAMESPACES.confirmation, 'cancel', ...args))
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(createId(NAMESPACES.confirmation, 'confirm', ...args))
        .setLabel('Confirm')
        .setStyle(ButtonStyle.Danger),
    ]),
  ],
});
