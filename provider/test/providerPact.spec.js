const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

let { server, dataStore } = require('../provider.js')

// Set the current state
server.post('/setup', (req, res) => {
  switch (req.body.state) {
    case 'there are no orders':
      dataStore = []
      break
    default:
      dataStore = require('../data/orders')
  }

  res.end()
})

server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Our Little Consumer', () => {
    let opts = {
      provider: 'Order API',
      providerBaseUrl: 'http://localhost:8081',
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: true,
      tags: ['prod'],
      providerVersion: '1.0.0'
    }

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
    })
  })
})
