const db = require('../../util/db')

module.exports = {
  exec: async (msg) => {
    const args = msg.content.trim().split(' ').slice(1)

    if (!args.length) {
      return msg.channel.createMessage('You need to specify the food place!')
    } else {
      try {
        const place = args.join(' ')
        await db.sadd('dio:food', place)
        return msg.channel.createMessage(`The place **'${place}'** has been added.`)
      } catch (err) {
        console.error('Could not add entry', err)
        return msg.channel.createMessage('An error occurred. Please contact the administrators.')
      }
    }
  }
}
