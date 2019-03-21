const db = require('../../util/db')
const { randomItem } = require('../../util/msg-utils')

module.exports = {
  exec: async (msg) => {
    const places = await db.smembers('dio:food')
    if (!places.length) {
      return msg.channel.createMessage('No places selected.')
    }

    const isMutate = (Math.floor(Math.random() * 100) + 1) === 6
    const item = isMutate ? 'McDonalds' : randomItem(places)

    msg.channel.createMessage(`The randomly selected food place is **${item}**.`)
  }
}
