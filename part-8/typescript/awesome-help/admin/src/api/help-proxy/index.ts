import { request } from '@strapi/helper-plugin';
import IHelpEntity from '../../../../server/interfaces/help.interface';

const HelpProxy = {
  get: async (): Promise<IHelpEntity[]> => {
    return await request(`/awesome-help/helps`, {
      method: 'GET'
    });
  },
  getByContentType: async (slug): Promise<IHelpEntity[]> => {
    return request(`/awesome-help/helps/contentTypes/${slug}`, {
      method: 'GET'
    });
  },
  update: async (data) => {
    return request(`/awesome-help/helps`, {
      method: 'POST',
      body: data
    });
  }
}
export default HelpProxy;
