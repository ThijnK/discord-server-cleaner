# Discord server cleaner

[![discord.js](https://img.shields.io/github/package-json/dependency-version/ThijnK/discord-server-cleaner/discord.js)](https://discord.js.org/)
[![GitHub release](https://img.shields.io/github/v/release/ThijnK/discord-server-cleaner?label=version)](https://github.com/ThijnK/discord-server-cleaner/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/ThijnK/discord-server-cleaner/build.yml)](https://github.com/ThijnK/discord-server-cleaner/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

A Discord bot to clean up your server. Built using [TypeScript bot template](https://github.com/ThijnK/discord-bot-template-ts).

## Features

- Remove (recent) messages in a channel
- Delete channels, categories, roles, emojis, or everything all at once!

### Commands

At present, all commands ask you for confirmation before executing to prevent accidental deletions.

- `/clean channel` - Remove all messages in the current channel
- `/clean recent <timespan>` - Remove all recent messages in the current channel
- `/delete all` - Delete all channels, categories, roles, and emojis in the entire server (be careful!)
- `/delete channels` - Delete all channels and categories in the entire server
- `/delete roles` - Delete all roles in the entire server
- `/delete emojis` - Delete all emojis in the entire server
- `/delete category <category>` - Delete a specific category and all channels inside of it

## How to use

This bot is not hosted anywhere, and not available as a public bot. If you want to use it, you are free to host it yourself and change it anyway you like.

Instructions and a guide on how the code is structured can be found in the [Discord bot template](https://github.com/ThijnK/discord-bot-template-ts) repository.

## Contributing

If have an idea of something to add to the bot, your are very welcome to contribute! Just clone the repo, make your changes, and open a pull request.

Try to make sure the code is formatted correctly, as specified in the [Code style](#code-style) section. A GitHub Action will automatically check this for you when you open a pull request. You can make sure that everything is formatted correctly by running the `npm run format` command.

Please make sure to use [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) to keep the commit history clean and readable.

## License

This project is licensed under the [MIT license](./LICENSE).
