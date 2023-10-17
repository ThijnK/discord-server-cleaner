import { InteractionUpdateOptions, BaseInteraction } from 'discord.js';
import { EMOJIS } from '../constants';
import { log } from './logger';

interface DeferableInteraction extends BaseInteraction {
  deferred: boolean;
  replied: boolean;
  update: (options: InteractionUpdateOptions) => Promise<unknown>;
}

export enum UpdateType {
  Default = 'default',
  Success = 'success',
  Error = 'error',
  Warn = 'warn',
  Deny = 'deny',
}

/**
 * Alter the options to match the update type
 * @param options The options to alter
 * @param type The type of update
 * @returns The altered options
 */
const getOptions = (
  options: InteractionUpdateOptions | string,
  type: UpdateType
): InteractionUpdateOptions => {
  if (typeof options === 'string')
    return getOptions({ content: options }, type);

  const { content } = options;
  const emoji = type === UpdateType.Default ? '' : EMOJIS[type];

  return {
    embeds: [],
    components: [],
    ...options,
    content: content ? `${emoji} ${content}` : undefined,
  };
};

/**
 * Reply to an interaction
 * @param interaction The interaction to update
 * @param options The options to update with
 * @param type The type of update
 */
export const update = <T extends DeferableInteraction>(
  interaction: T,
  options: InteractionUpdateOptions | string,
  type: UpdateType = UpdateType.Default
) => {
  if (
    !options ||
    (typeof options === 'object' &&
      !options.content &&
      !options.embeds &&
      !options.files)
  )
    return log.error('update', 'Cannot send an empty message');

  if (interaction.replied)
    return log.error('update', 'Interaction already replied');

  const alteredOptions = getOptions(options, type);
  return interaction.update(alteredOptions);
};

update.success = <T extends DeferableInteraction>(
  interaction: T,
  options: InteractionUpdateOptions | string
) => update(interaction, options, UpdateType.Success);

update.error = <T extends DeferableInteraction>(
  interaction: T,
  options: InteractionUpdateOptions | string = 'Oops. Something went wrong!'
) => update(interaction, options, UpdateType.Error);

update.warn = <T extends DeferableInteraction>(
  interaction: T,
  options: InteractionUpdateOptions | string
) => update(interaction, options, UpdateType.Warn);

update.deny = <T extends DeferableInteraction>(
  interaction: T,
  options:
    | InteractionUpdateOptions
    | string = 'You do not have permission to do that!'
) => update(interaction, options, UpdateType.Deny);
