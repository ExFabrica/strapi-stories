import React, { useEffect, useState } from 'react';
// Context from Strapi Helper.
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
// Css for tooltip component
import './strapi-tooltip.css';
import IHelpEntity from '../../../../server/interfaces/help.interface';

export const StrapiUIDecorator = ({ helpItems }) => {
  const { modifiedData } = useCMEditViewDataManager();
  const [nodeElementsCollectionCount, setNodeElementsCollectionCount] = useState<number>(0);
  const [structureFields, setStructureFields] = useState<IHelpEntity[]>([]);

  useEffect(() => {
    htmlLookup();
  }, [nodeElementsCollectionCount, modifiedData]);

  useEffect(() => {
    if (helpItems) {
      setStructureFields(helpItems);
      countAllTags();
    }

    const interval = window.setInterval(() => {
      countAllTags();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const countAllTags = (): void => {
    const labelNodes: any = document.querySelectorAll("label");
    const labelNodeList = [...labelNodes];
    const labelsInnerText = labelNodeList.map(item => item.innerText);
    if (labelsInnerText && labelsInnerText.length > 0) {
      const innerTextString = labelsInnerText.join("\n");
      setNodeElementsCollectionCount(innerTextString.length);
    }
  };
  const htmlLookup = (): void => {
    if (structureFields) {
      for (const structureField of structureFields) {
        //field is a component ?
        if (structureField.componentName) {
          // component is in zoneName ?
          if (structureField.zoneName)
            createTooltipInZone(structureField);
          else
            createTooltip(`${structureField.componentName}.${structureField.fieldName}`, structureField);
        }
        else
          // field is a single field
          createTooltip(structureField.fieldName, structureField);
      }
    }
  };
  const createTooltipInZone = (structureField): void => {
    //field directly accesible in zoneName
    if (!structureField.zoneName.includes("/")) {
      if (modifiedData && modifiedData[structureField.zoneName]) {
        const dynamicZoneComponents = modifiedData[structureField.zoneName].map(item => item.__component);
        const index = dynamicZoneComponents.indexOf(structureField.componentName);
        if (index > -1) {
          createTooltip(`${structureField.zoneName}.${index}.${structureField.fieldName}`, structureField);
        }
      }
    }
    else {
      // field is a nested component inside a zoneName.
      const splittedNames = structureField.zoneName.split("/");
      const zoneName = splittedNames[0];
      const componentName = splittedNames[1];
      if (modifiedData && modifiedData[zoneName]) {
        const dynamicZoneComponents = modifiedData[zoneName].map(item => item.__component);
        const componentIndex = dynamicZoneComponents.indexOf(componentName);
        if (componentIndex > -1) {
          const documentParentComponent = modifiedData[zoneName].filter(item => item.__component === componentName);
          if (documentParentComponent && documentParentComponent.length > 0) {
            const innerComponent = documentParentComponent[0][structureField.componentName];
            // repeatable component
            if (Array.isArray(innerComponent)) {
              innerComponent.forEach((element, index) => {
                createTooltip(`${zoneName}.${componentIndex}.${structureField.componentName}.${index}.${structureField.fieldName}`, structureField);
              });
            }
            // simple component
            else
              createTooltip(`${zoneName}.${componentIndex}.${structureField.componentName}.${structureField.fieldName}`, structureField);
          }
        }
      }
    }
  };
  const createTooltip = (fieldToSearch, structureField): void => {
    const query = `label[for='${fieldToSearch}']`;
    const label = document.querySelector(query);
    if (label) {
      const div = label.querySelector("div");
      const spans = label.querySelectorAll('[id^="awesome_help_"]');
      // create tooltip only if don't exist
      if (spans.length === 0) {
        let span = document.createElement("span");
        span.id = `awesome_help_${structureField.id}`;
        span.className = "awesome-help-tooltip";
        span.innerHTML = `&#x1F916;<span class="awesome-help-tooltipText">${structureField.helpContent.replace(/(?:\n)/g, '<br>')}</span>`;
        div ? div.appendChild(span) : label.appendChild(span);
      }
    }
  };
  return <></>;
}

StrapiUIDecorator.defaultProps = {
  helpItems: [],
};
