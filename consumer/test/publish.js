const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  tags: ['prod', 'test'],
  consumerVersion: '1.0.0'
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log(`Head over to ${process.env.PACT_BROKER_BASE_URL} and login with the credentials from your email`)
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })
