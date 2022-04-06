'use strict';

module.exports = ({ strapi }) => {
  const getContentTypes = async () => {
    let contentTypes = [];
    Object.values(strapi.contentTypes).map(contentType => {
      if ((contentType.kind === "collectionType" || contentType.kind === "singleType") && !contentType.plugin) {
        contentTypes.push(contentType);
      }
    });
    return contentTypes;
  };
  const getStructure = (item, contentType, type, componentName, zoneName, parentComponentName) => {
    for (const [attributeKey, attributeValue] of Object.entries(contentType.attributes)) {
      switch (attributeValue.type) {
        case "text":
        case "string":
        case "biginteger":
        case "float":
        case "decimal":
        case "integer":
          switch (type) {
            case "component":
              item.attributes.push({ key: attributeKey, value: attributeValue, container: "component", componentName: componentName });
              break;
            case "componentInZone":
              item.attributes.push({ key: attributeKey, value: attributeValue, container: "componentInZone", zone: zoneName, componentName: componentName });
              break;
            case "nestedComponentInComponentInZone":
              item.attributes.push({ key: attributeKey, value: attributeValue, container: "nestedComponentInComponentInZone", zone: `${zoneName}/${parentComponentName}`, componentName: componentName });
              break;
            case "default":
              item.attributes.push({ key: attributeKey, value: attributeValue, container: "default" });
              break;
          }
        case "component":
          switch (type) {
            case "default":
              const component = strapi.components[attributeValue.component];
              if (component)
                getStructure(item, component, "component", attributeKey);
              break;
            case "componentInZone":
              const zoneComponentInZone = strapi.components[attributeValue.component];
              if (zoneComponentInZone)
                getStructure(item, zoneComponentInZone, "nestedComponentInComponentInZone", attributeKey, zoneName, componentName);
              break;
          }
          break;
        case "dynamiczone":
          if (type === "default") {
            for (const componentName of attributeValue.components) {
              const component = strapi.components[componentName];
              getStructure(item, component, "componentInZone", componentName, attributeKey);
            }
          }
          break;
        default:
          break;
      }
    }
  }
  const parse = async () => {
    let potentialFields = [];
    let contentTypes = await getContentTypes();

    for (const contentType of contentTypes) {
      let item = {
        uid: contentType.uid,
        kind: contentType.kind,
        attributes: [],
      }
      getStructure(item, contentType, "default");
      potentialFields.push(item);
    }
    const fields = potentialFields.filter(content => content.attributes.length > 0);
    return fields;
  };
  return {
    parse,
  };
}
