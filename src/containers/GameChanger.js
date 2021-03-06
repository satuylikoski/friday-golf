import React from 'react';
import { Observer } from 'mobx-react-lite';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import useStore from '../hooks/store';

export default function GameChanger({ changers }) {
  const classes = useStyles();
  const changer = useStore('gameChanger');

  if (isEmpty(changers)) {
    return null;
  }

  return (
    <>
      <Observer>
        {() => (
          <AnimatedBox color="white" position="relative" opened={changer.isOpen ? 1 : 0}>
            <Box px={[2, 4, 2]} pt={[2, 4, 4]} pb={[2, 4, 2]}>
              <Box position="absolute" top="6px" right="6px">
                <IconButton onClick={changer.close}>
                  <CloseIcon fontSize="small" style={{ color: '#ffffff' }} />
                </IconButton>
              </Box>

              <Box>
                <Icon className={classes.icon}>
                  {changers[changer.selectedIndex].icon
                    ? changers[changer.selectedIndex].icon
                    : 'favorite'}
                </Icon>

                <RulesHeader>{changers[changer.selectedIndex].name}</RulesHeader>

                <RulesText>{changers[changer.selectedIndex].description}</RulesText>
              </Box>
            </Box>
          </AnimatedBox>
        )}
      </Observer>
    </>
  );
}

const AnimatedBox = styled(Box)`
  background-color: #202020;
  border-radius: 0 4px 4px 0;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  text-align: center;

  width: 100vw;
  height: ${props => (props.opened ? '400px' : 0)};

  @media only screen and (min-width: 1024px) {
    height: 65vh;
    width: ${props => (props.opened ? '500px' : 0)};
  }

  transition: all 0.5s;
`;

const RulesText = styled.h5`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;

  overflow-y: scroll;

  max-width: 800px;
`;

const RulesHeader = styled.h2`
  text-transform: lowercase;
  margin-top: 16px;
  margin-bottom: 32px;
  letter-spacing: 2px;
`;

const useStyles = makeStyles({
  icon: {
    fontSize: '4rem',
    color: '#fcd13f'
  }
});
