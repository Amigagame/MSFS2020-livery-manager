import React from 'react';

import { Box, CircularProgress, Typography, makeStyles } from '@material-ui/core';

import Config from 'electron-json-config';

import Navigate from '../helpers/Navigate';

const useStyles = makeStyles(theme => ({ loadingHeading: { marginTop: 48 } }));

export default function SplashScreen() {
  const styles = useStyles();

  if (Config.get('setup-completed', false)) {
    console.log('Setup complete');
    setTimeout(() => {
      Navigate('/manager');
    }, 2000);
  } else {
    console.log('Setup not complete');
    setTimeout(() => {
      Navigate('/setup');
    }, 2000);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100%">
      <CircularProgress size={64} />
      <Typography className={styles.loadingHeading} component="h1" variant="h4">
        Loading
      </Typography>
    </Box>
  );
}