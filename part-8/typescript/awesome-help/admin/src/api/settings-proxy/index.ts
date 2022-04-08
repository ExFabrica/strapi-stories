import { request } from '@strapi/helper-plugin';
import ISettingsEntity from '../../../../server/interfaces/settings.interface';

const settingsProxy = {
  get: async (): Promise<ISettingsEntity> => {
    return request(`/awesome-help/settings`, {
      method: 'GET'
    });
  },
  set: async (data): Promise<ISettingsEntity> => {
    return request(`/awesome-help/settings`, {
      method: 'POST',
      body: data
    });
  }
}
export default settingsProxy;
