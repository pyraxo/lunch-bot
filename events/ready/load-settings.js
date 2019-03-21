const db = require('../../util/db')

// TODO: Tidy up
module.exports = async () => {
  const botPrefix = await db.get('settings:prefix')

  if (botPrefix) {
    console.log(`Using stored bot prefix ${botPrefix} instead of ${process.env.BOT_PREFIX}`)
    process.env.BOT_PREFIX = botPrefix
  } else if (process.env.BOT_PREFIX) {
    console.log(`Using stored bot prefix ${process.env.BOT_PREFIX} from .env`)
  }
}
