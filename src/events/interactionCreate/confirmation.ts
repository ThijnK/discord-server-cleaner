import { event, parseId, update } from '../../utils';
import { NAMESPACES } from '../../constants';
import { ButtonInteraction, ChannelType } from 'discord.js';

export default event('interactionCreate', async (_, interaction) => {
  if (!interaction.isButton() || interaction.isAnySelectMenu()) return;
  const [namespace, type, category, action, ...args] = parseId(
    interaction.customId
  );
  if (namespace !== NAMESPACES.confirmation) return;

  if (type === 'cancel')
    return await update(interaction, {
      content: 'Cancelled!',
    });

  switch (category) {
    case 'delete':
      switch (action) {
        case 'all': {
          const [channelsResult, rolesResult, emojisResult] = await Promise.all(
            [
              deleteChannels(interaction),
              deleteRoles(interaction),
              deleteEmojis(interaction),
            ]
          );

          return await update.success(
            interaction,
            `Deleted ${channelsResult.length} channel(s), ${rolesResult.length} role(s) and ${emojisResult.length} emoji(s)!`
          );
        }
        case 'channels': {
          const result = await deleteChannels(interaction);

          return await update.success(
            interaction,
            `Deleted ${result.length} channel(s)!`
          );
        }
        case 'roles': {
          const result = await deleteRoles(interaction);

          return await update.success(
            interaction,
            `Deleted ${result.length} role(s)!`
          );
        }
        case 'emojis': {
          const result = await deleteEmojis(interaction);

          return await update.success(
            interaction,
            `Deleted ${result.length} emoji(s)!`
          );
        }
        case 'category': {
          const category = interaction.guild?.channels.cache.get(args[0]);
          if (!category)
            return await update.error(interaction, 'Category not found!');
          if (category.type !== ChannelType.GuildCategory)
            return await update.error(
              interaction,
              'Channel is not a category!'
            );

          const channels = category.children.cache;
          const result = await Promise.all(
            channels.map((channel) => channel.delete().catch(() => false))
          );
          const deleted = await category.delete().catch(() => false);
          if (!deleted)
            return await update.error(
              interaction,
              'Failed to delete category!'
            );

          return await update.success(
            interaction,
            `Deleted ${result.length} channel(s)!`
          );
        }
      }
      break;
    case 'clean':
      switch (action) {
        case 'channel': {
          const messages = await interaction.channel?.messages.fetch();
          if (!messages)
            return await update.error(interaction, 'Failed to fetch messages!');
          const msgs: {
            delete(reason?: string | undefined): Promise<any>;
          }[] = [];
          messages.forEach((msg) => msgs.push(msg));

          const result = await Promise.all(
            messages ? msgs.map((msg) => msg.delete().catch(() => false)) : []
          );

          return await update.success(
            interaction,
            `Deleted ${result.length} message(s)!`
          );
        }
        case 'recent': {
          const timespan = parseInt(args[0]);
          const refTimestamp = Date.now() - timespan * 60 * 60 * 1000;

          const messages = await interaction.channel?.messages.fetch();
          if (!messages)
            return await update.error(interaction, 'Failed to fetch messages!');
          const msgs: {
            delete(reason?: string | undefined): Promise<any>;
          }[] = [];
          messages.forEach((msg) => {
            if (msg.createdTimestamp >= refTimestamp) msgs.push(msg);
          });

          const result = await Promise.all(
            messages ? msgs.map((msg) => msg.delete().catch(() => false)) : []
          );

          return await update.success(
            interaction,
            `Deleted ${result.length} message(s)!`
          );
        }
      }
      break;
    default: {
      await update.error(interaction);
    }
  }
});

const deleteChannels = async (interaction: ButtonInteraction) => {
  const _channels = await interaction.guild?.channels.fetch();
  const channels = _channels?.filter(
    (channel) => channel && channel.id !== interaction.channel?.id
  );

  return Promise.all(
    channels
      ? channels.map((channel) => channel?.delete().catch(() => false))
      : []
  );
};

const deleteRoles = async (interaction: ButtonInteraction) => {
  const _roles = await interaction.guild?.roles.fetch();
  const roles = _roles?.filter(
    (role) => !role.managed && role.name !== '@everyone'
  );

  return Promise.all(
    roles ? roles.map((role) => role.delete().catch(() => false)) : []
  );
};

const deleteEmojis = async (interaction: ButtonInteraction) => {
  const emojis = await interaction.guild?.emojis.fetch();

  return Promise.all(
    emojis ? emojis.map((emoji) => emoji.delete().catch(() => false)) : []
  );
};
