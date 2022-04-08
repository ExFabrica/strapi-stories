/**
 *  parser router.
 */

 export default {
  type: 'admin',
  routes: [
      {
          method: 'GET',
          path: '/parse',
          handler: 'parserController.parse',
          config: { policies: [] }
      }
  ]
}
