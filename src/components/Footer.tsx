import React, { FunctionComponent } from 'react';
import { Content } from './Content';
import { Dimmed } from './Dimmed';
import { PageSection } from './PageSection';

import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    footer: {
      textAlign: 'center',
      fontSize: theme.spacing(3.5),
      marginBottom: theme.spacing(7.5),
    },
  };
});

export const Footer: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <PageSection>
      <Content>
        <p className={classes.footer}>
          <Dimmed>dreamt up &amp; built by </Dimmed> 🦖{' '}
          <a href="https://playgrounds.wtf" target="_blank">
            Playgrounds
          </a>
        </p>
      </Content>
    </PageSection>
  );
};
