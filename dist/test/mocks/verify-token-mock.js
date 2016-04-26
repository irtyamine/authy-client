'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.succeed = succeed;
exports.succeedWithForce = succeedWithForce;

var _lodash = require('lodash');

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mock a GET request to verify a token.
 */

/**
 * Module dependencies.
 */

function mock(_ref) {
  var _ref$request = _ref.request;
  let request = _ref$request === undefined ? {} : _ref$request;
  var _ref$response = _ref.response;
  let response = _ref$response === undefined ? {} : _ref$response;

  return (0, _nock2.default)(/\.authy\.com/).filteringPath(path => path.replace(/key=.*?(&|$)/, 'key={key}$1').replace(/verify\/.*?\//, 'verify/{token}/').replace(/\/[0-9].*\?/, '/{authyId}?')).get('/protected/json/verify/{token}/{authyId}').query(request.query ? (0, _lodash.defaults)({ api_key: '{key}' }, request.query) : true).reply(response.code, response.body);
}

/**
 * Export a request that will `succeed`.
 */

function succeed() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  let request = _ref2.request;

  return mock({
    request: request,
    response: {
      body: {
        message: 'Token is valid.',
        success: true,
        token: 'is valid'
      },
      code: 200
    }
  });
}

/**
 * Export a request that will `succeed` with `force=true`.
 */

function succeedWithForce() {
  return succeed({ request: { query: { force: true } } });
}