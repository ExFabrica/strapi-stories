'use strict';

module.exports = {
  type: 'admin',
  routes: [
      {
          method: 'GET',
          path: '/parse',
          handler: 'parserController.parse',
          config: { policies: [] }
      },
      {
        method: 'GET',
        path: '/check',
        handler: 'parserController.check',
        config: { policies: [] }
    }
  ]
}
