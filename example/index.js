const axios = require('axios')
const Queue = require('../distribution')
const limit = 1000
console.log(`START: +++ >${Date.now()}`)

const manager = new Queue.default()
for (var i = 0; i < limit; i++) {
  const url = 'https://test-8100.myshopify.com/admin/webhooks.json'
  const action = {
    index: i,
    request: () => axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': '48e9fd0142f086c179023d22a3573296x'
      }
    }),
    callback: d => console.log(d),
    fail: error => console.log(error),
  }
  manager.push(action)
}

manager.run()