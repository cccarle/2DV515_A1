const restify = require('restify')
const server = restify.createServer()
const PORT = 8080

server.listen(PORT, () => {
  console.log('Successfully stared at localhost:' + PORT)
  require('./routes/root')(server)
})
