const db = require('../../util/db')

module.exports = {
  exec: async msg => {
    const places = await db.smembers('dio:food')
    if (!places.length) {
      return msg.channel.createMessage([
        'There are currently no saved food places.',
        `Use the command **\`${process.env.BOT_PREFIX}newfood <place>\`** to save a food location.`
      ].join('\n'))
    } else {
      return msg.channel.createMessage([
        '**List of saved food places**:',
        ...places.map((place, idx) => `\`#${idx}\`. ${place}`)
      ].join('\n'))
    }
  }
}