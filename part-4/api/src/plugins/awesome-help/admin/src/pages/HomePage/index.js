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
//Proxy
import ParserProxy from '../../api/parser-proxy';
//Components
import { HelpTable } from "../../components/HelpTable";

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [results, setResults] = useState([]);
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const handleSubmit = async () => {
    setIsAnalysisRunning(true);
    setIsLoading(true);
    const results = await ParserProxy.parse();
    console.log("results", results);
    setIsAnalysisRunning(false);
    setIsLoading(false);
  };
  const configure = () => {
    push(`/settings/${pluginId}/`);
  };

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
