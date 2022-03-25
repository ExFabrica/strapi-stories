/*
 *
 * Plugin Awesome Help -> HomePage
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
//Some components
import {
  LoadingIndicatorPage,
} from '@strapi/helper-plugin';
//Layout
import { ContentLayout, HeaderLayout, Layout } from '@strapi/design-system/Layout';
//Strapi Design-System components
import { Main } from '@strapi/design-system/Main';
import { Button } from "@strapi/design-system/Button";
import Play from "@strapi/icons/Play";
import Cog from "@strapi/icons/Cog";

import { HelpTable } from "../../components/HelpTable";

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [results, setResults] = useState([]);
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  // UseEffect (component mount)
  useEffect(() => {
    setResults([{
      id: 1,
      key: "",
      contentType: "Article",
      fieldName: "name",
      help: ""
    },
    {
      id: 2,
      key: "",
      contentType: "Article",
      fieldName: "description",
      help: ""
    }]);
  }, [])

  const handleSubmit = async () => {
    setIsAnalysisRunning(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsAnalysisRunning(false);
      setIsLoading(false);
      setResults([{
        id: 1,
        key: "",
        contentType: "Article",
        fieldName: "name",
        help: ""
      },
      {
        id: 2,
        key: "",
        contentType: "Article",
        fieldName: "description",
        help: ""
      },
      {
        id: 3,
        key: "",
        contentType: "Restaurant",
        fieldName: "name",
        help: ""
      },
      {
        id: 4,
        key: "",
        contentType: "Restaurant",
        fieldName: "description",
        help: ""
      }]);
    }, 1000);
  };
  const configure = () => {
    push(`/settings/${pluginId}/`);
  };
  const handleEdit = () => { }

  return <Main labelledBy="title" aria-busy={isLoading}>
    <HeaderLayout
      id="title"
      title={formatMessage({ id: getTrad("plugin.homepage.title") })}
      subtitle={formatMessage({ id: getTrad("plugin.homepage.subtitle") })}
      primaryAction={
        <Button
          onClick={handleSubmit}
          startIcon={<Play />}
          size="L"
          disabled={isLoading || isAnalysisRunning}
          loading={isAnalysisRunning}
        >
          {formatMessage({
            id: getTrad(
              isAnalysisRunning
                ? "plugin.help.analysisPending"
                : "plugin.help.runAnalysis"
            ),
          })}
        </Button>
      }
      secondaryAction={
        <Button variant="tertiary" onClick={configure} startIcon={<Cog />}>
          {formatMessage({ id: getTrad("plugin.help.settings") })}
        </Button>
      }
    >
    </HeaderLayout>
    <ContentLayout>
      {isLoading ? (
        <LoadingIndicatorPage />
      ) : (
        <Layout>
          <HelpTable data={results}></HelpTable>
        </Layout>
      )}
    </ContentLayout>
  </Main>
};

export default memo(HomePage);
