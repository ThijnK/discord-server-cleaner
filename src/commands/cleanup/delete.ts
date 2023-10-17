import {
  ChannelType,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  channelMention,
} from 'discord.js';
import { command, reply } from '../../utils';
import { confirmationMsg } from '../../constants';

const all = new SlashCommandSubcommandBuilder()
  .setName('all')
  .setDescription(
    'Delete ALL channels, roles and emojis in the entire server.'
  );

const channels = new SlashCommandSubcommandBuilder()
  .setName('channels')
  .setDescription('Delete ALL channels across the entire server.');

const roles = new SlashCommandSubcommandBuilder()
  .setName('roles')
  .setDescription('Delete ALL roles in the server.');

const emojis = new SlashCommandSubcommandBuilder()
  .setName('emojis')
  .setDescription('Delete ALL emojis in the server.');

const category = new SlashCommandSubcommandBuilder()
  .setName('category')
  .setDescription(
    'Delete the given channel category and the channels within it.'
  )
  .addChannelOption((option) =>
    option
      .setName('category')
      .setDescription('The category to delete.')
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildCategory)
  );

const meta = new SlashCommandBuilder()
  .setName('delete')
  .setDescription('Delete various channels, roles or categories in the server.')
  .addSubcommand(all)
  .addSubcommand(channels)
  .addSubcommand(roles)
  .addSubcommand(emojis)
  .addSubcommand(category);

export default command({ meta, adminOnly: true }, async ({ interaction }) => {
  switch (interaction.options.getSubcommand()) {
    case 'all':
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ALL channels, roles and emojis in the entire server?`,
          ['delete', 'all']
        )
      );
    case 'channels':
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ALL channels across the entire server?`,
          ['delete', 'channels']
        )
      );
    case 'roles':
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ALL roles in the server?`,
          ['delete', 'roles']
        )
      );
    case 'emojis':
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ALL emojis in the server?`,
          ['delete', 'emojis']
        )
      );
    case 'category': {
      const cat = interaction.options.getChannel('category');
      if (!cat) return reply.error(interaction, 'Category not found!');
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete the category ${channelMention(
            cat.id
          )} and all the channels within it?`,
          ['delete', 'category', cat.id]
        )
      );
    }
  }
});
