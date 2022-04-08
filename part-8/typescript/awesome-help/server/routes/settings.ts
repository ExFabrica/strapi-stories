/**
 *  settings router.
 */

 export default {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/settings',
        handler: 'settingsController.getSettings',
        config: { policies: [] }
      },
      {
        method: 'POST',
        path: '/settings',
        handler: 'settingsController.setSettings',
        config: { policies: [] }
      }
    ]
}
