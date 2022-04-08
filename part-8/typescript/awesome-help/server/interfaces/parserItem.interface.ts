export interface IParserItemAttribute {
  fieldName: string;
  value: string;
  containerType: string;
  zoneName?: string;
  componentName?: string;
}

export default interface IParserItem {
  uid: string,
  kind: string
  attributes: IParserItemAttribute[],
}


