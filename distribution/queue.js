'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queue = function () {
  function queue(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title;

    _classCallCheck(this, queue);

    this.stack = [];
    this.title = title;
    this.running = false;
    this.success = false;
  }

  _createClass(queue, [{
    key: 'push',
    value: function push(value) {
      this.stack.push(value);
    }
  }, {
    key: 'pop',
    value: function pop() {
      return this.stack.pop();
    }
  }, {
    key: 'size',
    value: function size() {
      return this.stack.length;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var item, response, limit, _limit$split, _limit$split2, current, maximum;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.running = true;
                this.success = false;

              case 2:
                if (!(this.stack.length > 0)) {
                  _context.next = 25;
                  break;
                }

                item = this.stack[0];
                _context.prev = 4;
                _context.next = 7;
                return item.request();

              case 7:
                response = _context.sent;

                item.callback && item.callback(response.data);
                limit = response.headers['x-shopify-shop-api-call-limit'];
                _limit$split = limit.split('/'), _limit$split2 = _slicedToArray(_limit$split, 2), current = _limit$split2[0], maximum = _limit$split2[1];

                this.stack.shift();

                if (!(current > 30)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return delay(6000);

              case 15:
                _context.next = 23;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](4);
                _context.next = 21;
                return delay(3000);

              case 21:
                this.stack.shift();
                item.fail && item.fail(_context.t0.message);

              case 23:
                _context.next = 2;
                break;

              case 25:
                this.running = false;
                this.success = true;
                console.log(this.title + ' =====> END: +++ >' + Date.now());

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 17]]);
      }));

      function run() {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return queue;
}();

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}
exports.default = queue;