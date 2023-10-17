import { event, parseId, update } from '../../utils';
import { NAMESPACES } from '../../constants';

export default event('interactionCreate', async (_, interaction) => {
  if (!interaction.isButton() || interaction.isAnySelectMenu()) return;
  const [namespace, type, category, action] = parseId(interaction.customId);
  if (namespace !== NAMESPACES.confirmation) return;

  if (type === 'cancel')
    return await update(interaction, {
      content: 'Cancelled!',
    });

  switch (category) {
    case 'delete':
      switch (action) {
        case 'all': {
          const _channels = await interaction.guild?.channels.fetch();
          const channels = _channels?.filter(
            (channel) => channel && channel.id !== interaction.channel?.id
          );
          const _roles = await interaction.guild?.roles.fetch();
          const roles = _roles?.filter(
            (role) => !role.managed && role.name !== '@everyone'
          );
          const emojis = await interaction.guild?.emojis.fetch();

          const result = await Promise.all([
            Promise.all(
              channels
                ? channels.map((channel) =>
                    channel?.delete().catch(() => false)
                  )
                : []
            ),
            Promise.all(
              roles ? roles.map((role) => role.delete().catch(() => false)) : []
            ),
            Promise.all(
              emojis
                ? emojis.map((emoji) => emoji.delete().catch(() => false))
                : []
            ),
          ]);

          const [channelsResult, rolesResult, emojisResult] = result;

          await update.success(
            interaction,
            `Deleted ${channelsResult.length} channel(s), ${rolesResult.length} role(s) and ${emojisResult.length} emoji(s)!`
          );
        }
      }
      break;
    default: {
      await update.error(interaction);
    }
  }
});
