import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, Collapse, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon';

import FieldValueDisplay from './FieldValueDisplay';
import InstalledBadge from './InstalledBadge';
import UpdateAvailableBadge from './UpdateAvailableBadge';

import Constants from '../../../data/Constants.json';

export default function ListRow(props) {
  const { livery, AddSelectedLivery, RemoveSelectedLivery, disabled, isInstalled, isSelected, updateAvailable } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  async function ToggleCheckbox(e) {
    // Don't edit the list if it's disabled! (Duh!!)
    if (disabled) return;

    e.stopPropagation();
    e.preventDefault();

    if (!isSelected) {
      console.log('Adding livery ', livery.fileName);
      AddSelectedLivery(livery);
    } else {
      console.log('Removing livery ', livery.fileName);
      RemoveSelectedLivery(livery);
    }
  }

  return (
    <>
      <ListItem button disableRipple onClick={isInstalled ? null : ToggleCheckbox}>
        <ListItemIcon>
          <Checkbox
            disabled={disabled || isInstalled}
            color="primary"
            edge="start"
            checked={isSelected || isInstalled}
            onChange={isInstalled ? null : ToggleCheckbox}
          />
        </ListItemIcon>
        <ListItemText primary={livery.fileName.substr(livery.fileName.indexOf('/') + 1).split('.zip')[0]} />
        {isInstalled && (updateAvailable ? <UpdateAvailableBadge /> : <InstalledBadge />)}
        <Tooltip title={!isExpanded ? 'Show livery info' : 'Hide livery info'}>
          <IconButton
            centerRipple
            onClick={e => {
              e.stopPropagation();
              setIsExpanded(e => !e);
            }}
          >
            <ExpandMoreIcon style={{ transform: isExpanded ? 'rotate(180deg)' : null, transition: 'transform 200ms ease-out' }} />
          </IconButton>
        </Tooltip>
      </ListItem>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box p={2}>
          <FieldValueDisplay
            fieldName="Version"
            value={
              <Tooltip title="The version is a unique string that represents the entire livery">
                <span style={{ borderBottom: '#aaaa dotted 2px', cursor: 'help' }}>{livery.checkSum.substr(0, 8)}</span>
              </Tooltip>
            }
          />
          <FieldValueDisplay
            fieldName="Thumbnail"
            value={
              <Box component="figure" p={1}>
                <img
                  style={{ display: 'block', maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }}
                  src={`${Constants.urls.cdnEndpoint}/${livery.image || livery.smallImage}`}
                  alt="No image available"
                />
              </Box>
            }
          />
        </Box>
        <Divider />
      </Collapse>
    </>
  );
}

ListRow.propTypes = {
  livery: PropTypes.shape({
    airplane: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    generation: PropTypes.string.isRequired,
    metaGeneration: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    ETag: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    checkSum: PropTypes.string.isRequired,
    image: PropTypes.string,
    smallImage: PropTypes.string,
  }).isRequired,
  AddSelectedLivery: PropTypes.func.isRequired,
  RemoveSelectedLivery: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isInstalled: PropTypes.bool,
  updateAvailable: PropTypes.bool,
  isSelected: PropTypes.bool,
};
