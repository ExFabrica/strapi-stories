'use strict';

module.exports = {
  type: 'admin',
  routes: [
      {
          method: 'GET',
          path: '/helps',
          handler: 'helpController.findMany',
          config: { policies: [] }
      },
      {
        method: 'POST',
        path: '/helps',
        handler: 'helpController.update',
        config: { policies: [] }
      }
  ]
}
