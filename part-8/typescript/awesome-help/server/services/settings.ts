import ISettingsEntity from "../interfaces/settings.interface";

/**
 *  Settings service.
 */
export default ({ strapi }) => {
  const getPluginStore = () => {
    return strapi.store({
      environment: '',
      type: 'plugin',
      name: 'awesome-help',
    });
  };
  const createDefaultConfig = async ():Promise<ISettingsEntity> => {
    const pluginStore = getPluginStore();
    const value: ISettingsEntity = {
      enabled: false,
    };
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  };
  const getSettings = async ():Promise<ISettingsEntity> => {
    const pluginStore = getPluginStore();
    let config: ISettingsEntity = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  };
  const setSettings = async (settings: ISettingsEntity):Promise<ISettingsEntity> => {
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: 'settings', settings });
    return pluginStore.get({ key: 'settings' });
  };
  return {
    getSettings,
    setSettings
  }
}
