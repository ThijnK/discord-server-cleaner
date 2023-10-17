import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import { command, reply } from '../../utils';
import { confirmationMsg } from '../../constants';

const all = new SlashCommandSubcommandBuilder()
  .setName('all')
  .setDescription(
    'Delete ALL channels, roles and emojis in the entire server.'
  );

const channels = new SlashCommandSubcommandBuilder()
  .setName('channels')
  .setDescription('Delete ALL channels in the entire server.');

const roles = new SlashCommandSubcommandBuilder()
  .setName('roles')
  .setDescription('Delete ALL roles in the entire server.');

const category = new SlashCommandSubcommandBuilder()
  .setName('category')
  .setDescription(
    'Delete the given channel category and the channels it contains.'
  )
  .addChannelOption((option) =>
    option
      .setName('category')
      .setDescription('The category to delete.')
      .setRequired(true)
  );

const meta = new SlashCommandBuilder()
  .setName('delete')
  .setDescription('Delete various channels, roles or categories in the server.')
  .addSubcommand(all)
  .addSubcommand(channels)
  .addSubcommand(roles)
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
  }
});
