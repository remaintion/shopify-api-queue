class queue {
  constructor({ title = '' }) {
    this.stack = []
    this.title = title
    this.running = false
    this.success = false
  }
  push(value) {
    this.stack.push(value)
  }
  pop() {
    return this.stack.pop()
  }
  size() {
    return this.stack.length
  }

  async run() {
    this.running = true
    this.success = false
    while (this.stack.length > 0) {
      const item = this.stack[0]
      try {
        const response = await item.request()
        item.callback && item.callback(response.data)
        const limit = response.headers['x-shopify-shop-api-call-limit']
        const [current, maximum] = limit.split('/')
        this.stack.shift()
        if (current > 30) {
          await delay(6000)
        }
      } catch (error) {
        await delay(3000)
        this.stack.shift()
        item.fail && item.fail(error.message)
      }
    }
    this.running = false
    this.success = true
    console.log(`${this.title} =====> END: +++ >${Date.now()}`)
  }
}

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}
exports.default = queue