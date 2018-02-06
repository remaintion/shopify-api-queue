'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = require('./queue');

var q1 = new Queue.default({ title: 1 });
var q2 = new Queue.default({ title: 2 });
var q3 = new Queue.default({ title: 3 });
var q4 = new Queue.default({ title: 4 });
var q5 = new Queue.default({ title: 5 });

var queues = [q1, q2, q3, q4, q5];

var Manager = function () {
  function Manager() {
    _classCallCheck(this, Manager);

    this.stack = [];
    this.running = false;
  }

  _createClass(Manager, [{
    key: 'push',
    value: function push(item) {
      this.stack.push(item);
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var index, q, item, sizes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.running) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                this.running = true;

                if (!(this.stack.length === 0)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                if (!queues.some(function (q) {
                  return !q.success;
                })) {
                  _context.next = 25;
                  break;
                }

              case 6:
                if (!(this.stack.length > 0)) {
                  _context.next = 19;
                  break;
                }

                _context.t0 = regeneratorRuntime.keys(queues);

              case 8:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 17;
                  break;
                }

                index = _context.t1.value;
                q = queues[index];

                if (!(this.stack.length <= 0)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt('return');

              case 13:
                item = this.stack.shift();

                if (item) {
                  q.push(item);
                  if (!q.running) q.run();
                }
                _context.next = 8;
                break;

              case 17:
                _context.next = 6;
                break;

              case 19:
                _context.next = 21;
                return delay(3000);

              case 21:
                sizes = queues.map(function (q) {
                  return q.size();
                });

                console.log(sizes);
                _context.next = 5;
                break;

              case 25:
                this.running = false;

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Manager;
}();

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

exports.default = Manager;