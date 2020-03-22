import React from 'react';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function GameChanger({ changers, index, isOpen, onClose }) {
  const classes = useStyles();

  if (isEmpty(changers)) {
    return null;
  }

  return (
    <>
      <AnimatedBox color="white" position="relative" opened={isOpen ? 1 : 0}>
        <Box px={[2, 4, 2]} pt={[2, 4, 4]} pb={[2, 4, 2]}>
          <Box position="absolute" top="6px" right="6px">
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="small" style={{ color: '#ffffff' }} />
            </IconButton>
          </Box>

          <Box>
            <Icon className={classes.icon}>
              {changers[index].icon ? changers[index].icon : 'favorite'}
            </Icon>

            <RulesHeader>{changers[index].name}</RulesHeader>

            <RulesText>{changers[index].description}</RulesText>
          </Box>
        </Box>
      </AnimatedBox>
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
  height: ${props => (props.opened ? '300px' : 0)};

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
