import { request } from '@strapi/helper-plugin';
import IParserItem from '../../../../server/interfaces/parserItem.interface';

const ParserProxy = {
  parse: async (): Promise<void> => {
    return request(`/awesome-help/parse`, {
      method: 'GET'
    });
  }
}
export default ParserProxy;
