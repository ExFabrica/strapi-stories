'use strict';

module.exports = {
  type: 'content-api',
  routes: [
      {
          method: 'GET',
          path: '/helps',
          handler: 'helpController.findMany',
          config: { policies: [] }
      }
  ]
}
