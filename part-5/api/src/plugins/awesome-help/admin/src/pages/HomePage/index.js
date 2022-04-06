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
  useNotification
} from '@strapi/helper-plugin';
//Layout
import { ContentLayout, HeaderLayout, Layout } from '@strapi/design-system/Layout';
//Strapi Design-System components
import { Main } from '@strapi/design-system/Main';
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import Play from "@strapi/icons/Play";
import Cog from "@strapi/icons/Cog";
//Proxy
import ParserProxy from '../../api/parser-proxy';
import HelpProxy from '../../api/help-proxy';
//Components
import { HelpTable } from "../../components/HelpTable";

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [structureHasChanged, setStructureHasChanged] = useState(false);
  const [results, setResults] = useState([]);
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const toggleNotification = useNotification();

  useEffect(() => {
    HelpProxy.findMany().then((helpEntities) => {
      setIsLoading(false);
      if (helpEntities && helpEntities.length > 0)
        setResults(helpEntities);
      if (helpEntities.length > 0) {
        ParserProxy.check().then(result => {
          if (result && result.structureHasChanged)
            setStructureHasChanged(result.structureHasChanged);
        }, (exp) => {
          toggleNotification({
            type: 'error',
            message: `Error checking Strapi structure:${exp.message}`,
          });
        });
      }
    }, (exp) => {
      toggleNotification({
        type: 'error',
        message: `Error getting help entities:${exp.message}`,
      });
    })
  }, []);

  const handleSubmit = async () => {
    setIsAnalysisRunning(true);
    setIsLoading(true);
    try {
      const result = await ParserProxy.parse();
      if (result.done) {
        await findManyHelps();
        setStructureHasChanged(false);
        toggleNotification({
          type: 'success',
          message: "Scanning complete",
        });
      }
    }
    catch (exp) {
      toggleNotification({
        type: 'error',
        message: `Error during scanning process:${exp.message}`,
      });
    }
    setIsAnalysisRunning(false);
    setIsLoading(false);
  };

  const findManyHelps = async () => {
    try {
      const helpEntities = await HelpProxy.findMany();
      if (helpEntities && helpEntities.length > 0)
        setResults(helpEntities);
    }
    catch (exp) {
      throw exp;
    }
  }

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
          {
            structureHasChanged ?
              <Box paddingBottom={4}>
                <Box
                  hasRadius
                  background="danger100"
                  shadow="tableShadow"
                  paddingLeft={6}
                  paddingRight={6}
                  paddingTop={6}
                  paddingBottom={6}
                  marginBottom={6}
                  borderColor="danger600">
                  <Typography textColor="danger700" marginLeft={10} variant="delta">
                    {
                      formatMessage({ id: getTrad("plugin.homepage.structure.changed") })
                    }
                  </Typography>
                </Box>
              </Box>
              : <></>
          }
          <HelpTable data={results}></HelpTable>
        </Layout>
      )}
    </ContentLayout>
  </Main>
};

export default memo(HomePage);
