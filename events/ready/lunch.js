const schedule = require('node-schedule')
const db = require('../../util/db')
const { randomItem } = require('../../util/msg-utils')

module.exports = (bot) => {
  const channelId = process.env.FOOD_CHANNEL
  if (!channelId) return

  schedule.scheduleJob('0 30 12 * * 1-5', async () => {
    const places = await db.smembers('dio:food')
    if (!places.length) return

    const isMutate = (Math.floor(Math.random() * 100) + 1) === 6
    const item = isMutate ? 'McDonalds' : randomItem(places)

    bot.createMessage(process.env.FOOD_CHANNEL, [
      `hi all it's time to eat :-)`,
      `today's food place is **${item}**`
    ].join('\n'))
  })
}
