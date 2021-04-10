'use strict'

const fastify = require('fastify')({ logger: false })

for (let i = 1; i <= 2000; i += 1) {
  fastify.route({
    path: `/${i}`,
    method: 'GET',
    schema: {
      response: {
        '2xx': {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    config: {
      routeId: i
    },
    handler (req, res) {
      res.send({ hello: `from ${req.context.config.routeId}` })
    }
  })
}

fastify.route({
  path: '/stats',
  method: 'GET',
  handler (req, res) {
    res.send(process.memoryUsage())
  }
})

fastify.listen(8000)
