const db = require('../../util/db')

module.exports = {
  exec: async (msg) => {
    const args = msg.content.trim().split(' ').slice(1)

    if (!args.length) {
      return msg.channel.createMessage([
        'Please specify a food place to delete.',
        `Use **\`${process.env.BOT_PREFIX}listfood\`** to retrieve the list.`,
        `Use **\`${process.env.BOT_PREFIX}delfood <number|name>\`** to delete.`
      ])
    }

    const places = await db.smembers('dio:food')
    const place = args.length === 1 && !isNaN(args[0]) ? places[+args[0]] : args.join(' ')
    if (place) {
      await db.srem('dio:food', place)
      return msg.channel.createMessage(`Food place '**${place}**' has been deleted.`)
    } else {
      return msg.channel.createMessage(`Could not find food place with name '**${place}**'.`)
    }
  }
}