import React, { useState, useEffect } from 'react';
// Strapi portal
import { Portal } from '@strapi/design-system/Portal';
// Context from Strapi Helper.
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
//API proxy
import HelpProxy from "../../api/help-proxy";
// Strapi UI Decorator component
import { StrapiUIDecorator } from './strapi-ui-decorator'

export const StrapiListZoneItem = () => {
  const { slug } = useCMEditViewDataManager();
  const [results, setResults] = useState(false);

  useEffect(() => {
    HelpProxy.getByContentType(slug).then(helpItems => {
      setResults(helpItems);
    });
  }, []);

  return (
    results && results.length > 0 ?
      <>
        {
          <Portal>
            <StrapiUIDecorator helpItems={results} />
          </Portal>
        }
      </>
      : <></>
  );
};
