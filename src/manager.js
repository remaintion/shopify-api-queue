const Queue = require('./queue')

const q1 = new Queue.default({ title: 1 })
const q2 = new Queue.default({ title: 2 })
const q3 = new Queue.default({ title: 3 })
const q4 = new Queue.default({ title: 4 })
const q5 = new Queue.default({ title: 5 })

const queues = [q1, q2, q3, q4, q5]
class Manager {
  constructor() {
    this.stack = []
    this.running = false
  }
  push(item) {
    this.stack.push(item)
  }

  async run(callback = () => { }) {
    if (this.running) return
    this.running = true

    if (this.stack.length === 0) return
    while (queues.some(q => !q.success)) {
      while (this.stack.length > 0) {
        for (var index in queues) {
          const q = queues[index]
          if (this.stack.length <= 0) return
          const item = this.stack.shift()
          if (item) {
            q.push(item)
            if (!q.running) q.run()
          }
        }
      }
      await delay(3000)
      const sizes = queues.map(q => q.size())
      console.log(sizes)
    }
    this.running = false
    callback()
  }
}

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

export default Manager
