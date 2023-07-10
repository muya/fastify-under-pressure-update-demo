// Import the framework and instantiate it
import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import underPressure from '@fastify/under-pressure'

const fastify = Fastify({
  logger: true
})


await fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'health', description: 'Health Check related end-points' }
    ]
  }
})

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

fastify.register(underPressure, {
  maxEventLoopDelay: 1000,
  maxHeapUsedBytes: 100000000,
  maxRssBytes: 100000000,
  maxEventLoopUtilization:0.98,
  exposeStatusRoute: {
    url: '/status',
    routeSchemaOpts: {
      operationId: 'Health Check',
      summary: 'Health Check',
      description: 'Perform Health Check. Utilizes the under-pressure plugin.',
      tags: ['health']
    }
  }
})



// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
