import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import ExpandIcon from 'mdi-react/ExpandMoreIcon';
import CheckboxTickIcon from 'mdi-react/CheckboxMarkedOutlineIcon';
import CheckboxOffIcon from 'mdi-react/CheckboxBlankOffOutlineIcon';

import FieldValueDisplay from './FieldValueDisplay';
import LiveryList from './LiveryList';

import PlaneNameTable from '../../../data/PlaneNameTable.json';
import GetIndexOfLiveryInArray from '../../../helpers/GetIndexOfLiveryInArray';

import NoImagePng from '../../../images/no-image-available.png';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    lineHeight: '30px',
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(13),
    lineHeight: '30px',
    color: theme.palette.text.secondary,
  },
  accordion: {
    display: 'block',
    paddingLeft: 32,
    paddingRight: 32,
  },
  accordionContent: {
    marginBottom: theme.spacing(),
    display: 'flex',
  },
  aircraftThumbnail: {
    marginRight: theme.spacing(2),
    '& picture': {
      display: 'block',
      '& img': {
        objectFit: 'contain',
        display: 'block',
        maxWidth: 350,
      },
    },
  },
  aircraftDetails: {
    flex: '1',
  },
  aircraftControls: {
    display: 'flex',
    marginTop: theme.spacing(),
    justifyContent: 'center',
  },
  dividerContainer: {
    margin: theme.spacing(3, 0),
  },
}));
export default function AircraftAccordion(props) {
  const { aircraft, sortedLiveries, AddSelectedLivery, RemoveSelectedLivery, disabled, installedLiveries, selectedLiveries } = props;
  const classes = useStyles();

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography className={classes.heading}>{PlaneNameTable[aircraft.name] || aircraft.name}</Typography>
        <Typography className={classes.secondaryHeading}>{sortedLiveries.length} liveries available</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordion}>
        <Box className={classes.accordionContent}>
          <Box className={classes.aircraftThumbnail} component="figure">
            <picture alt="No image available">
              {aircraft.thumbnails && <source srcSet={aircraft.thumbnails[0]} />}
              {aircraft.thumbnails && <source srcSet={aircraft.thumbnails[0].substr(-3) + 'JPG'} />}
              <img src={aircraft.thumbnails ? aircraft.thumbnails[1] : NoImagePng} alt="No image available"></img>
            </picture>
          </Box>
          <Box className={classes.aircraftDetails}>
            <FieldValueDisplay fieldName="Aircraft" value={PlaneNameTable[aircraft.name] || aircraft.name} />
            <FieldValueDisplay fieldName="Total liveries" value={`${sortedLiveries.length} available`} />
            <FieldValueDisplay
              fieldName="Total liveries installed"
              value={`${installedLiveries.length} of ${sortedLiveries.length} installed`}
            />
            <Box className={classes.aircraftControls}>
              <Button
                disabled={disabled}
                variant="outlined"
                color="primary"
                onClick={() => {
                  AddSelectedLivery(sortedLiveries.filter(l => GetIndexOfLiveryInArray(l, installedLiveries)[0] === -1));
                }}
                startIcon={<CheckboxTickIcon />}
              >
                Select all
              </Button>
              <Box p={1} />
              <Button
                disabled={disabled}
                variant="outlined"
                color="primary"
                onClick={() => RemoveSelectedLivery(sortedLiveries)}
                startIcon={<CheckboxOffIcon />}
              >
                Deselect all
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.dividerContainer}>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Liveries
          </Typography>
          <LiveryList
            disabled={disabled}
            liveries={sortedLiveries}
            AddSelectedLivery={AddSelectedLivery}
            RemoveSelectedLivery={RemoveSelectedLivery}
            installedLiveries={installedLiveries}
            selectedLiveries={selectedLiveries}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

AircraftAccordion.propTypes = {
  aircraft: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  sortedLiveries: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  installedLiveries: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  AddSelectedLivery: PropTypes.func.isRequired,
  RemoveSelectedLivery: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  selectedLiveries: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired,
};
