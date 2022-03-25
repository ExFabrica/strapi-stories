
import React from 'react';
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
// Strapi UI system
import { IconButton } from "@strapi/design-system/IconButton";
import Pencil from "@strapi/icons/Pencil";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";

export const HelpTable = ({data}) => {
  const { formatMessage } = useIntl();
  const COL_COUNT = 3;

  return (
    <Table colCount={COL_COUNT} rowCount={data.length}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">
              {formatMessage({ id: getTrad("plugin.help.table.contentType") })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({ id: getTrad("plugin.help.table.fieldName") })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({ id: getTrad("plugin.help.table.help") })}
            </Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((result, index) => {
          return (
            <Tr key={`contentpage-${index}`}>
              <Td>
                <Typography
                  textColor="neutral800"
                  fontWeight="inherited"
                >
                  {result.contentType}
                </Typography>
              </Td>
              <Td style={{ whiteSpace: "break-spaces" }}>
                <Typography
                  textColor="neutral800"
                  fontWeight="inherited"
                >
                  {result.fieldName}
                </Typography>
              </Td>
              <Td>
                <Typography
                  textColor="neutral800"
                  fontWeight="inherited"
                >
                  {result.help}
                </Typography>
              </Td>
              <Td>
                <IconButton
                  label="Edit"
                  icon={<Pencil />}
                  onClick={() =>
                    handleEdit(
                      result.id
                    )
                  }
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

HelpTable.defaultProps = {
  data: [],
};
