const { createReplyWrapper } = require('../../util/msg-utils')
const db = require('../../util/db')

module.exports = {
  admin: true,
  exec: async (msg) => {
    // TODO: ALlow changing of prefix, channel and member IDs
    const args = msg.content.trim().split(' ').slice(1)

    if (args.length === 0) {
      const prefix = process.env.BOT_PREFIX
      return msg.channel.createMessage({
        content: [
          `To change a setting, send a message with the format \`${prefix}settings <option> <value>\`.`,
          'You can find the options name in the brackets below (e.g. `prefix`).',
          `Don't include the \`<>\` brackets!`,
          `Example command: \`${prefix}settings prefix d!\``
        ].join('\n'),
        embed: {
          'color': 3003711,
          'title': '**Bot Settings**',
          'fields': [
            {
              'name': 'Bot Prefix (prefix)',
              'value': `\`${prefix}\``,
              'inline': true
            }
          ]
        }
      })
    }

    const reply = createReplyWrapper(msg, false)
    if (args.length === 1) {
      switch (args[0]) {
        case 'prefix':
        case 'botprefix': {
          return reply(`the bot's prefix is \`${process.env.BOT_PREFIX}\``)
        }
      }
    }

    if (args.length === 2) {
      // TODO: Add support for names of roles and channels instead of only IDs
      switch (args[0]) {
        case 'prefix':
        case 'botprefix': {
          const prefix = args[1]
          await db.set('settings:prefix', prefix)
          process.env.BOT_PREFIX = prefix
          return reply(`the bot prefix is now \`${prefix}\``)
        }
      }
    }
  }
}