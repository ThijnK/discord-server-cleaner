import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import { command, reply } from '../../utils';
import { confirmationMsg } from '../../constants';

const channel = new SlashCommandSubcommandBuilder()
  .setName('channel')
  .setDescription('Delete all messages in this channel.');

const recent = new SlashCommandSubcommandBuilder()
  .setName('recent')
  .setDescription('Delete recent messages in this channel.')
  .addIntegerOption((option) =>
    option
      .setName('timespan')
      .addChoices(
        { name: '1 hour', value: 1 },
        { name: '1 day', value: 24 },
        { name: '1 week', value: 168 },
        { name: '1 month', value: 720 },
        { name: '1 year', value: 8760 },
        { name: 'all time', value: -1 }
      )
      .setDescription('How far back to delete messages.')
      .setRequired(true)
  );

const meta = new SlashCommandBuilder()
  .setName('clean')
  .setDescription('Clean up channels by deleting messages.')
  .addSubcommand(channel)
  .addSubcommand(recent);

export default command({ meta, adminOnly: true }, async ({ interaction }) => {
  switch (interaction.options.getSubcommand()) {
    case 'channel': {
      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ALL messages in this channel?`,
          ['clean', 'channel']
        )
      );
    }
    case 'recent': {
      const timespan = interaction.options.getInteger(
        'timespan',
        true
      ) as keyof typeof label;
      const label = {
        1: 'all messages in the last hour',
        24: 'all messages in the last day',
        168: 'all messages in the last week',
        720: 'all messages in the last month',
        8760: 'all messages in the last year',
        '-1': 'all messages',
      };

      return reply(
        interaction,
        confirmationMsg(
          `Are you certain you want to delete ${label[timespan]} in this channel?`,
          ['clean', 'recent', timespan]
        )
      );
    }
  }
});
