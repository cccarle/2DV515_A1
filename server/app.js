const restify = require('restify')
const server = restify.createServer()
const PORT = 8080
const corsMiddleware = require('restify-cors-middleware')

// Middleware
server.use(restify.plugins.bodyParser())

let cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['X-App-Version', 'Authorization'],
  exposeHeaders: []
})

server.pre(cors.preflight)
server.use(cors.actual)

server.listen(PORT, () => {
  console.log('Successfully stared at localhost:' + PORT)
  require('./routes/root')(server)
  require('./routes/user')(server)
  require('./routes/recommendations')(server)
})
