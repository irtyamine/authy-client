
/**
 * Module dependencies.
 */

import nock from 'nock';

/**
 * Mock a POST request to register a user's activity.
 */

function mock({ request = {}, response = {} }) {
  return nock(/\.authy\.com/)
    .filteringPath(path => path.replace(/\/[0-9].*\//, '/{authyId}/'))
    .post('/protected/json/users/{authyId}/register_activity', request.body)
    .query(request.query ? request.query : true)
    .reply(response.code, response.body);
}

/**
 * Export a request that will `succeed`.
 */

export function succeed({ request } = {}) {
  return mock({
    request,
    response: {
      body: {
        message: 'Activity was created.',
        success: true
      },
      code: 200
    }
  });
}
