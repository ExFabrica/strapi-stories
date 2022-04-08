export default interface IHelpEntity {
  id: string;
  helpContent: string;
  path: string;
  contentType: string;
  fieldName: string;
  containerType: string;
  zoneName: string;
  componentName?: string;
}

export interface IHelpEntityCreateDto {
  helpContent?: string;
  path?: string;
  contentType: string;
  fieldName: string;
  containerType: string;
  zoneName?: string;
  componentName?: string;
}
